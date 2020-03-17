import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getPropertyName} from './src/getPropertyName';

export type FormGroupControlsOf<T> = {
    [P in keyof T]: FormControl | FormGroup;
};

export abstract class FormGroupTypeSafe<T> extends FormGroup {
    // give the value a custom type s
    public value: T;

    // create helper methods to achieve this syntax eg: this.form.getSafe(x => x.heroName).patchValue('Himan')
    public abstract getSafe(propertyFunction: (typeVal: T) => any): AbstractControl;
    public abstract setControlSafe(propertyFunction: (typeVal: T) => any, control: AbstractControl): void;
    // If you need more function implement declare them here but implement them on FormBuilderTypeSafe.group instantiation.
}

// tslint:disable-next-line:max-classes-per-file
export class FormControlTypeSafe<T> extends FormControl {
    public value: T;
}

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
            gr.getSafe = (propertyFunction: (typeVal: T) => any): AbstractControl => {
                const getStr = getPropertyName(propertyFunction);
                const p = gr.get(getStr) as FormGroupTypeSafe<T>;
                return p;
            };

            // implement setControlSafe
            gr.setControlSafe = (propertyFunction: (typeVal: T) => any, control: AbstractControl): void => {
                const getStr = getPropertyName(propertyFunction);
                gr.setControl(getStr, control);
            };

            // implement more functions as needed

        }

        return gr;
    }
}
