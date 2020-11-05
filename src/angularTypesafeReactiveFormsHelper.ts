import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, AbstractControlOptions, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { getPropertyName } from './getPropertyName';

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
      // implement removeControlSafe
      gr.removeControlSafe = generateRemoveControlSafeFunction(gr);
    }

    return gr;
  }
}
