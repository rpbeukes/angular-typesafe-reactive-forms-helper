import { RecursivePartial } from '../../src/angularTypesafeReactiveFormsHelper';

interface HeroFormModel {
    heroName: string;
    weapons: WeaponModel[];
    anotherModel: AnotherModel;
}

interface AnotherModel {
    prop1: string;
    prop2: WeaponModel[];
}

interface WeaponModel {
    name: string;
    damagePoints: number;
    weaponAnotherModel: AnotherModel;
}

const RecursivePartialTests = () => {
    // $ExpectType { heroName: string; }
    let a: RecursivePartial<HeroFormModel> = {
        heroName: 'someName'
    };

    // $ExpectType { weapons: never[]; }
    a = {
        weapons: []
    };

    // $ExpectType { anotherModel: { prop1: string; }; }
    a = {
        anotherModel: { prop1: 'someStuff' }
    };

    // $ExpectType { anotherModel: { prop2: { name: string; }[]; }; }
    a = {
        anotherModel: { prop2: [{ name: 'yeti' } ]}
    };
};
