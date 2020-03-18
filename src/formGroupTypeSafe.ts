import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class FormGroupTypeSafe<T> extends FormGroup {
    // give the value a custom type s
    public value: T | undefined;

    // create helper methods to achieve this syntax eg: this.form.getSafe(x => x.heroName).patchValue('Himan')
    public abstract getSafe(propertyFunction: (typeVal: T) => any): AbstractControl;
    public abstract setControlSafe(propertyFunction: (typeVal: T) => any, control: AbstractControl): void;
    // If you need more function implement declare them here but implement them on FormBuilderTypeSafe.group instantiation.
}
