import { AbstractControl } from '@angular/forms';
import { getPropertyName } from './getPropertyName';
import { FormGroupTypeSafe } from './formGroupTypeSafe';

export const generateGetSafeFunction = <T extends unknown>(gr: FormGroupTypeSafe<T>) => {
    return (propertyFunction: (typeVal: T) => any): AbstractControl => {
        const getStr = getPropertyName(propertyFunction.toString());
        const p = gr.get(getStr) as FormGroupTypeSafe<T>;
        return p;
    };
};
