import { FormControl } from '@angular/forms';
import { FormGroupTypeSafe } from '../../src/angularTypesafeReactiveFormsHelper';
import { HeroFormModel } from '../models';
import { createGroup } from '../createGroup';

describe(`When the FormBuilderTypeSafe initialises a group with FormBuilderTypeSafe.group<T>`, () => {
  let sut: FormGroupTypeSafe<HeroFormModel>; // system under test

  beforeEach(() => {
    sut = createGroup();
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
    sut.patchValue({ heroName: 'BabyHulk' });
    expect(sut?.value?.heroName).toBe('BabyHulk');
    expect(sut?.value?.weapons[0].name).toBe('Sword');
    expect(sut?.value?.weapons[0].damagePoints).toBe(50);
    expect(sut?.value?.weapons[1].name).toBe('Shield');
    expect(sut?.value?.weapons[1].damagePoints).toBe(0);

    sut.patchValue({ weapons: [{ name: "Head" }]});
    expect(sut?.value?.weapons[0].name).toBe('Head');
    expect(sut?.value?.weapons[0].damagePoints).toBe(50);
    
    sut.patchValue({ weapons: [{}, { damagePoints: 1 }]});
    expect(sut?.value?.weapons[1].damagePoints).toBe(1);

    sut.patchValue({ weapons: []}); 
    expect(sut?.value?.weapons.length).toBe(2); // no change expected on the array 
  });

  
  describe(`after FormBuilderTypeSafe<T> initialisation`, () => {
    test('sut.removeControlSafe should remove control', () => {
      expect(sut.getSafe(x => x.heroName)).toBeDefined();
      sut.removeControlSafe(x => x.heroName);  
      expect(sut.getSafe(x => x.heroName)).toBe(null);

      expect(sut.getSafe(x => x.weapons)).toBeDefined();
      sut.removeControlSafe(x => x.weapons);  
      expect(sut.getSafe(x => x.weapons)).toBe(null);
    });
  });

});
