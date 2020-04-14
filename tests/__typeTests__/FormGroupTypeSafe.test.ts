import { createGroup } from '../createGroup';

const sut = createGroup();

const getSafeTests_AbstractControlTypeSafe = () => {
    // $ExpectType AbstractControlTypeSafe<string> | null
    sut.getSafe(x => x.heroName);
    // $ExpectType AbstractControlTypeSafe<WeaponModel[]> | null
    sut.getSafe(x => x.weapons);
    // $ExpectType AbstractControlTypeSafe<string> | null
    sut.getSafe(x => x.weapons[0].name);
    // $ExpectType AbstractControlTypeSafe<number> | null
    sut.getSafe(x => x.weapons[0].damagePoints);
};

const getSafeTests_AbstractControlTypeSafe_value = () => {
    // $ExpectType string | undefined
    sut.getSafe(x => x.heroName)?.value;
    // $ExpectType WeaponModel[] | undefined
    sut.getSafe(x => x.weapons)?.value;
};
