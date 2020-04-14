import { createGroup } from '../createGroup';

const sut = createGroup();

const getSafeTests = () => {
    // $ExpectType AbstractControlTypeSafe<string> | null
    sut.getSafe(x => x.heroName);
    // $ExpectType AbstractControlTypeSafe<WeaponModel[]> | null
    sut.getSafe(x => x.weapons);
    // $ExpectType AbstractControlTypeSafe<string> | null
    sut.getSafe(x => x.weapons[0].name);
    // $ExpectType AbstractControlTypeSafe<number> | null
    sut.getSafe(x => x.weapons[0].damagePoints);
};
