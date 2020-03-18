import { AbstractControl } from '@angular/forms';
import { getPropertyName } from './getPropertyName';
import { FormGroupTypeSafe } from './formGroupTypeSafe';

export const generateSetControlSafeFunction = <T extends unknown>(gr: FormGroupTypeSafe<T>) => {
    return (propertyFunction: (typeVal: T) => any, control: AbstractControl): void => {
        const getStr = getPropertyName(propertyFunction.toString());
        gr.setControl(getStr, control);
    };
};
