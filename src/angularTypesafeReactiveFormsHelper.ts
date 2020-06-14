import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, AbstractControlOptions, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { getPropertyName } from './getPropertyName';
import '@angular/compiler';
/* 
Why `import '@angular/compiler'`?

Had this Error when `ng serve` specifically Angular 9.1.2.
The app would show blank page with the below error in dev tools console:
```
main.ts:15 Error: Angular JIT compilation failed: '@angular/compiler' not loaded!
  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.
  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?
  - Alternatively provide the compiler with 'import "@angular/compiler";' before bootstrapping.
    at getCompilerFacade (core.js:643)
    at Function.get (core.js:16349)
    at getFactoryDef (core.js:2200)
    at providerToFactory (core.js:17183)
    at providerToRecord (core.js:17165)
    at R3Injector.processProvider (core.js:16981)
    at core.js:16960
    at core.js:1400
    at Array.forEach (<anonymous>)
    at deepForEach (core.js:1400)
```

StackOverflow solution - import '@angular/compiler';

[solution](https://stackoverflow.com/questions/60183056/ionic-5-with-angular-9-angular-jit-compilation-failed-angular-compiler-not#answer-60183174)
*/

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type FormGroupControlsOf<T> = {
  [P in keyof T]: FormControl | FormGroup | FormArray;
};

export type ControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

export interface AbstractControlTypeSafe<T> extends AbstractControl {
  // common properties to FormGroup, FormControl and FormArray
  readonly value: T;
  readonly valueChanges: Observable<T>;

  /*
    Angular `get` signature:
      get(path: Array<string | number> | string): AbstractControl | null;
    
      split into two get methods
  */
  // tslint:disable-next-line: array-type
  get(path: Array<string> | string): AbstractControl | null; 
  get(path: number[]): AbstractControlTypeSafe<T extends (infer R)[] ? R : T> | null;
  readonly statusChanges: Observable<ControlStatus>;
}

// the idea is to use Angular's FormGroup exactly as is but just sprinkle a bit of type-safety in-between
export interface FormGroupTypeSafe<T> extends FormGroup {
  readonly value: T;
  readonly valueChanges: Observable<T>;

  /* ----- new functions added not part of FormGroup  ----- */
  // create helper methods to achieve this syntax
  //  eg: this.form.getSafe(x => x.heroName).patchValue('He-Man')
  getSafe<P>(propertyFunction: (typeVal: T) => P): AbstractControlTypeSafe<P> | null;
  // eg: this.form.setControlSafe(x => x.name, new FormControl('Hulk'));
  setControlSafe(propertyFunction: (typeVal: T) => any, control: AbstractControl): void;
  removeControlSafe(propertyFunction: (typeVal: T) => any): void;
  /* -------------------------------- */

  setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  // tslint:disable-next-line:ban-types
  patchValue(value: RecursivePartial<T>, options?: Object): void;
  readonly status: ControlStatus;
  readonly statusChanges: Observable<ControlStatus>;
  controls: { [P in keyof T]: AbstractControlTypeSafe<T[P]> };
}

// tslint:disable-next-line:max-classes-per-file
export interface FormControlTypeSafe<T> extends FormControl {
  value: T | undefined;
}

export const generateGetSafeFunction = <T extends unknown>(gr: FormGroupTypeSafe<T>) => {
  return (propertyFunction: (typeVal: T) => any): AbstractControl => {
    const getStr = getPropertyName(propertyFunction.toString());
    const p = gr.get(getStr) as FormGroupTypeSafe<T>;
    return p;
  };
};

export const generateSetControlSafeFunction = <T extends unknown>(gr: FormGroupTypeSafe<T>) => {
  return (propertyFunction: (typeVal: T) => any, control: AbstractControl): void => {
    const getStr = getPropertyName(propertyFunction.toString());
    gr.setControl(getStr, control);
  };
};


export const generateRemoveControlSafeFunction = <T extends unknown>(gr: FormGroupTypeSafe<T>) => {
  return (propertyFunction: (typeVal: T) => any): void => {
    const getStr = getPropertyName(propertyFunction.toString());
    gr.removeControl(getStr);
  };
};

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class FormBuilderTypeSafe extends FormBuilder {
  // override group to be type safe
  public group<T>(
    controlsConfig: FormGroupControlsOf<T>,
    options?: AbstractControlOptions | {
      [key: string]: any;
  } | null): FormGroupTypeSafe<T> {
    /* NOTE the return FormGroupTypeSafe<T> */

    // instantiate group from angular type
    const gr = super.group(controlsConfig, options) as FormGroupTypeSafe<T>;

    if (gr) {
      // implement getSafe method
      gr.getSafe = generateGetSafeFunction(gr);
      // implement setControlSafe
      gr.setControlSafe = generateSetControlSafeFunction(gr);
      // implement setControlSafe
      gr.removeControlSafe = generateRemoveControlSafeFunction(gr);
    }

    return gr;
  }
}
