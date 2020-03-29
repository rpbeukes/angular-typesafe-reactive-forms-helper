import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getPropertyName } from './getPropertyName';

export type FormGroupControlsOf<T> = {
  [P in keyof T]: FormControl | FormGroup;
};

export abstract class FormGroupTypeSafe<T> extends FormGroup {
  // give the value a custom type
  public value: T | undefined;
  // create helper methods to achieve this syntax 
  //  eg: this.form.getSafe(x => x.heroName).patchValue('He-Man')
  public abstract getSafe(propertyFunction: (typeVal: T) => any): AbstractControl;
  public abstract setControlSafe(propertyFunction: (typeVal: T) => any, control: AbstractControl): void;

}

// tslint:disable-next-line:max-classes-per-file
export class FormControlTypeSafe<T> extends FormControl {
  public value: T | undefined;
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

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class FormBuilderTypeSafe extends FormBuilder {
  // override group to be type safe
  public group<T>(
    controlsConfig: FormGroupControlsOf<T>,
    extra?: {
      [key: string]: any;
    } | null,
  ): FormGroupTypeSafe<T> {
    /* NOTE the return FormGroupTypeSafe<T> */

    // instantiate group from angular type
    const gr = super.group(controlsConfig, extra) as FormGroupTypeSafe<T>;

    if (gr) {
      // implement getSafe method
      gr.getSafe = generateGetSafeFunction(gr);
      // implement setControlSafe
      gr.setControlSafe = generateSetControlSafeFunction(gr);
    }

    return gr;
  }
}
