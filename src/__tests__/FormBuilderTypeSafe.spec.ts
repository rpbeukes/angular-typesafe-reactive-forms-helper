import { FormControl, Validators, FormArray } from '@angular/forms';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '../angularTypesafeReactiveFormsHelper';
import { HeroFormModel, WeaponModel } from './models';

describe(`When the FormBuilderTypeSafe initialises a group with FormBuilderTypeSafe.group<T>`, () => {
  let sut: FormGroupTypeSafe<HeroFormModel>; // system under test

  beforeEach(() => {
    const formBuilderTypeSafe = new FormBuilderTypeSafe();
   
    sut = formBuilderTypeSafe.group<HeroFormModel>({
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

  });

  test('the sut.getSafe(x => x.name) should return the correct value', () => {
    expect(sut?.getSafe(x => x.heroName)?.value).toBe('He-Man');
  });

  test('the type safe sut.value should return the correct value', () => {
    expect(sut?.value?.heroName).toBe('He-Man');
  });

  test('the sut.setControlSafe should set a new FormControl', () => {
    // set a new control with no validator
    sut.setControlSafe(x => x.heroName, new FormControl('Hulk'));
    expect(sut?.value?.heroName).toBe('Hulk');
    expect(sut?.getSafe(x => x.heroName)?.validator).toBeFalsy();
  });

  test('the sut.setValue should be typesafe and set the value', () => {
    sut.setValue({ heroName : 'Hulk', weapons: [
      {name: 'Fist', damagePoints: 80 }, /* strict so one has to add exactly 2 elements into the array  */
      {name: 'Head', damagePoints: 50 }
    ]}, { onlySelf: true, emitEvent: true });

    expect(sut.value.heroName).toEqual('Hulk');
    expect(sut.value.weapons[0].name).toEqual('Fist');
    expect(sut.value.weapons[0].damagePoints).toEqual(80);
  });

  test('the sut.patchValue should be typesafe and set partial value', () => {
    // sut.patchValue({ heroName: 1 }); //ERROR - Type 'number' is not assignable to type 'string | undefined'.
    // sut.patchValue({ name: 'BabyHulk', age: 2, other: "bogus"  }); // ERROR - Argument of type '{ name: string; other: string; }' is not assignable to parameter of type 'Partial<TestContract>'
                                                                      //         Object literal may only specify known properties, and 'other' does not exist in type 'Partial<TestContract>'. 
    sut.patchValue({ heroName: 'BabyHulk' });
    expect(sut?.value?.heroName).toBe('BabyHulk');
    expect(sut?.value?.weapons[0].name).toBe('Sword');
    expect(sut?.value?.weapons[1].name).toBe('Shield');
  });
});
