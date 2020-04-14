
import { FormControl, Validators, FormArray } from '@angular/forms';
import { HeroFormModel, WeaponModel } from './models';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '../src/angularTypesafeReactiveFormsHelper';

export const createGroup = () => {
    const formBuilderTypeSafe = new FormBuilderTypeSafe();
   
    return formBuilderTypeSafe.group<HeroFormModel>({
      heroName: new FormControl('He-Man', Validators.required),
      weapons: new FormArray([formBuilderTypeSafe.group<WeaponModel>({
            name: new FormControl('Sword', Validators.required),
            damagePoints: new FormControl(50, Validators.required)
        }),
        formBuilderTypeSafe.group<WeaponModel>({
            name: new FormControl('Shield', Validators.required),
            damagePoints: new FormControl(0, Validators.required)
        }),
      ])
    });
}
    