import { FormBuilder } from '@angular/forms';
import { FormGroupControlsOf } from './formGroupControlsOf';
import { FormGroupTypeSafe } from './formGroupTypeSafe';
import { generateGetSafeFunction } from './generateGetSafeFunction';
import { generateSetControlSafeFunction } from './generateSetControlSafeFunction';
import { getPropertyName } from './getPropertyName';

// tslint:disable-next-line: max-classes-per-file
export class FormBuilderTypeSafe extends FormBuilder {
    // override group to be type safe
    public group<T>(controlsConfig: FormGroupControlsOf<T>, extra?: {
        [key: string]: any;
    } | null): FormGroupTypeSafe<T> {/*NOTE the return FormGroupTypeSafe<T> */

        // instantiate group from angular type
        const gr = super.group(controlsConfig, extra) as FormGroupTypeSafe<T>;

        if (gr) {
            // implement getSafe method
            gr.getSafe = generateGetSafeFunction(gr);
            // implement setControlSafe
            gr.setControlSafe = generateSetControlSafeFunction(gr);
            // implement more functions as needed
        }

        return gr;
    }
}
