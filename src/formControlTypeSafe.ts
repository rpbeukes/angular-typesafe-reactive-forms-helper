import { FormControl } from '@angular/forms';

export class FormControlTypeSafe<T> extends FormControl {
    public value: T | undefined;
}
