import { FormControl, FormGroup } from '@angular/forms';

export type FormGroupControlsOf<T> = {
    [P in keyof T]: FormControl | FormGroup;
};
