import { FormBuilderTypeSafe } from '../../src/angularTypesafeReactiveFormsHelper';
import { HeroFormModel, WeaponModel } from '../models';
import { Validators, FormControl, FormArray } from '@angular/forms';

const formBuilderTypeSafe = new FormBuilderTypeSafe();

const sut = formBuilderTypeSafe.group<HeroFormModel>({
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

const testGetSafe = () => {
    // $ExpectType AbstractControlTypeSafe<string> | null
    sut.getSafe(x => x.heroName);
    // $ExpectType AbstractControlTypeSafe<WeaponModel[]> | null
    sut.getSafe(x => x.weapons);
    // $ExpectType AbstractControlTypeSafe<string> | null
    sut.getSafe(x => x.weapons[0].name);
    // $ExpectType AbstractControlTypeSafe<number> | null
    sut.getSafe(x => x.weapons[0].damagePoints);
};
