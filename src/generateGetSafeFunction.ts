import { AbstractControl } from '@angular/forms';
import { FormGroupTypeSafe } from './formGroupTypeSafe';
import { getPropertyName } from './getPropertyName';

export const generateGetSafeFunction = <T extends unknown>(gr: FormGroupTypeSafe<T>) => {
    return (propertyFunction: (typeVal: T) => any): AbstractControl => {
        const getStr = getPropertyName(propertyFunction.toString());
        const p = gr.get(getStr) as FormGroupTypeSafe<T>;
        return p;
    };
};
