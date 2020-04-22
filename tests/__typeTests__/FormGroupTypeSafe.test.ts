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

const getSafeTests_AbstractControlTypeSafe_valueChange = () => {
    // ----- form.value changes --------
    sut?.valueChanges.subscribe(val => {
        // $ExpectType HeroFormModel
        val;
    });

    // ----- specific property changes ------
    sut.getSafe(x => x.heroName)?.valueChanges.subscribe(val => {
        // $ExpectType string
        val;
    });

    sut.getSafe(x => x.weapons)?.valueChanges.subscribe(val => {
        // $ExpectType WeaponModel[]
        val;
    });

    sut.getSafe(x => x.weapons)?.get([0])?.valueChanges.subscribe(val => {
        // $ExpectType WeaponModel
        val;
    });

    // the angular way - .get('person.name')
    sut.getSafe(x => x.weapons)?.get('person.name')?.valueChanges.subscribe(val => {
        // $ExpectType any
        val;
    });

    // the angular way - .get(['person', 'name'])
    sut.getSafe(x => x.weapons)?.get(['person', 'name'])?.valueChanges.subscribe(val => {
        // $ExpectType any
        val;
    });
};

const statusChangesTests_FormGroupTypeSafe = () => {
    // $ExpectType ControlStatus
    sut.status;

    sut.statusChanges.subscribe(val => {
        // $ExpectType ControlStatus
        val;
    });
};

const statusChangesTests_AbstractControlTypeSafe = () => {
    // $ExpectType string | undefined
    sut.getSafe(x => x.heroName)?.status;

    sut.getSafe(x => x.heroName)?.statusChanges.subscribe(val => {
        // $ExpectType ControlStatus
        val;
    });
};
