import { FormControl, Validators, FormArray } from '@angular/forms';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '../angularTypesafeReactiveFormsHelper';

interface TestContract {
  name: string;
  lastName: string;
  age: number;
}

describe(`When the FormBuilderTypeSafe initialises a group with FormBuilderTypeSafe.group<T>`, () => {
  let sut: FormGroupTypeSafe<TestContract>; // system under test

  beforeEach(() => {
    const formBuilderTypeSafe = new FormBuilderTypeSafe();
    sut = formBuilderTypeSafe.group<TestContract>({
      name: new FormControl('He-Man', Validators.required),
      lastName: new FormControl('Grayskull', Validators.required),
      age: new FormControl(88, Validators.required)
    });
  });

  test('the sut.getSafe(x => x.name) should return the correct value', () => {
    expect(sut?.getSafe(x => x.name)?.value).toBe('He-Man');
  });

  test('the type safe sut.value should return the correct value', () => {
    expect(sut?.value?.name).toBe('He-Man');
  });

  test('the sut.setControlSafe should set a new FormControl', () => {
    // set a new control with no validator
    sut.setControlSafe(x => x.name, new FormControl('Hulk'));
    expect(sut?.value?.name).toBe('Hulk');
    expect(sut?.getSafe(x => x.name)?.validator).toBeFalsy();
  });

  test('the sut.setValue should be typesafe and set the value', () => {
    // the test is basically...meh
    // if you want to test the typesafty, 
    // change the 'a new value' to 1, and the typescript compiler should shout at you.
    sut.setValue({name: 'a new value', age: 2, lastName : 'Grayskull'});
    expect(sut?.value?.name).toBe('a new value');
  });
});
