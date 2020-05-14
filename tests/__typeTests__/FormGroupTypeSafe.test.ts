import { createGroup } from '../createGroup';

const sut = createGroup();

const controlsTests_FormGroupTypeSafe = () => {
  // $ExpectType string | undefined
  sut.getSafe((x) => x.heroName)?.status;

  sut
    .getSafe((x) => x.heroName)
    ?.statusChanges.subscribe((val) => {
      // $ExpectType ControlStatus
      val;
    });
};

const statusChangesTests_FormGroupTypeSafe = () => {
  // $ExpectType { heroName: AbstractControlTypeSafe<string>; weapons: AbstractControlTypeSafe<WeaponModel[]>; }
  sut.controls;

  // $ExpectType AbstractControlTypeSafe<string>
  sut.controls.heroName;
  // $ExpectType AbstractControlTypeSafe<WeaponModel[]>
  sut.controls.weapons;
};
