import { FormControl, Validators } from '@angular/forms';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '../angularTypesafeReactiveFormsHelper';

// tslint:disable-next-line: interface-name
interface TestContract {
  name: string;
}

describe(`When the FormBuilderTypeSafe initialises a group with FormBuilderTypeSafe.group<T>`, () => {
  let sut: FormGroupTypeSafe<TestContract>;
  
  beforeEach(() => {
    const formBuilderTypeSafe = new FormBuilderTypeSafe();
    sut = formBuilderTypeSafe.group<TestContract>({
      name: new FormControl('Hi-Man', Validators.required),
    });
  });

  test('the sut.getSafe(x => x.name) should return the correct value', () => {
    expect(sut.getSafe(x => x.name).value).toBe('Hi-Man');
  });

  test('the type safe sut.value should return the correct value', () => {
    expect(sut.value && sut.value.name).toBe('Hi-Man');
  });

  test('the sut.setControlSafe should set a new FormControl', () => {
    // set a new control with no validator
    sut.setControlSafe(x => x.name, new FormControl('Hulk'));
    expect(sut.value && sut.value.name).toBe('Hulk');
    expect(sut.getSafe(x => x.name).validator).toBeFalsy();
  });
});
