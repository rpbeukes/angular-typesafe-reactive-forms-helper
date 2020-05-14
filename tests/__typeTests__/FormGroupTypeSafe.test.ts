import { createGroup } from '../createGroup';

const sut = createGroup();

const statusChangesTests_FormGroupTypeSafe = () => {
  // $ExpectType ControlStatus
  sut.status;

  sut.statusChanges.subscribe((val) => {
    // $ExpectType ControlStatus
    val;
  });
};

const controls_FormGroupTypeSafe = () => {
  // $ExpectType { heroName: AbstractControlTypeSafe<string>; weapons: AbstractControlTypeSafe<WeaponModel[]>; }
  sut.controls;

  // $ExpectType AbstractControlTypeSafe<string>
  sut.controls.heroName;
  // $ExpectType AbstractControlTypeSafe<WeaponModel[]>
  sut.controls.weapons;

  // $ExpectType string
  sut.controls.heroName.value;
  // $ExpectType WeaponModel[]
  sut.controls.weapons.value;
};
