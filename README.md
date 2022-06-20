# angular-typesafe-reactive-forms-helper

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/rpbeukes/angular-typesafe-reactive-forms-helper/CI/master)](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/actions?query=branch%3Amaster+) [![GitHub package.json version](https://img.shields.io/github/package-json/v/rpbeukes/angular-typesafe-reactive-forms-helper)](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/releases) [![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rpbeukes/angular-typesafe-reactive-forms-helper)](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/pulse/monthly) ![GitHub](https://img.shields.io/github/license/rpbeukes/angular-typesafe-reactive-forms-helper) [![npm](https://img.shields.io/npm/dt/angular-typesafe-reactive-forms-helper)](https://www.npmjs.com/package/angular-typesafe-reactive-forms-helper) ![GitHub forks](https://img.shields.io/github/forks/rpbeukes/angular-typesafe-reactive-forms-helper?style=social) 

<img  src="./assets/coffee.png" alt="drawing" width="25"/> 
<a href="https://buy.stripe.com/eVa7w16MSehn9QA3ccc" target="_blank">Buy me a coffee 
<img  src="./assets/coffee.png" alt="drawing" width="25"/></a>

## Install
```
npm i angular-typesafe-reactive-forms-helper
```
## Quick Syntax

Instead of:
```typescript
this.form.get('heroName').patchValue('He-Man');
```

angular-typesafe-reactive-forms-helper allows:
```typescript
this.form.getSafe(x => x.heroName).patchValue('He-Man');
```

## Why
- Get intellisense
- No more misspelled property names
- Refactoring Reactive Forms is back to a trivial IDE rename task

## Demo

In order to make this work as closely as possible to the Angular way, an abstract class `FormGroupTypeSafe<T>` was derived from Angular’s `FormGroup` with the intent not to break existing code.


Intellisense on FormGroupTypeSafe<T>.value:

![FormGroupTypeSafe.value Intellisense](./assets/FormatAddressToOneLineDemo.gif)

Intellisense on FormGroupTypeSafe<T>.getSafe and then patching the value:

![FormGroupTypeSafe.getSafe Intellisense](./assets/PatchValueSample.gif)

## How to use:

###  1. Define an interface of your form model.
```typescript
//interface used with FormGroupTypeSafe<T>
interface IHeroFormModel {
  name: string;
  secretLairs: Array<Address>;
  power: string;
  sidekick: string
}
```

### 2. Declare your new FormGroupTypeSafe form with the help of TypeScript’s generics.
```typescript
/* TypeSafe Reactive Forms Changes */
//old code
//heroForm: FormGroup;
heroForm: FormGroupTypeSafe<IHeroFormModel>;

```
### 3. Inject FormBuilderTypeSafe
```typescript
constructor(
   /* TypeSafe Reactive Forms Changes */
   //old code - private fb: FormBuilder,
   private fb: FormBuilderTypeSafe,
   private heroService: HeroService) {

   this.createForm();
   this.logNameChange();
 }
```
### 4. Create your form group with Interfaces (contracts).
```typescript
// old code
//    this.heroForm = this.fb.group({
//      name: '',
//      secretLairs: this.fb.array([]),
//      power: '',
//      sidekick: ''
//    });


 this.heroForm = this.fb.group<IHeroFormModel>({
      name: new FormControl(''),
      secretLairs: new FormControl([]),
      power: new FormControl(''),
      sidekick: new FormControl('')
    });

//***** Nested type sample *****
interface IAddressModel {
   suburb: string;
   postcode: string;
}

interface ICustomerModel {
  name: string;
  address: IAddressModel;
}

 this.form = this.fb.group<ICustomerModel>({
        name: new FormControl(null, [Validators.required]),
        address: this.formBuilder.group<IAddressModel>({
            suburb: new FormControl(''),
            postcode: new FormControl('', [Validators.required]),
      })
  });
```
## Peer Dependencies 

`@angular/forms` and all its peer dependencies.

This package has been tested with Angular 9, 10, 11.

(Should work with Angular 4, 5, 6, 7, 8 too)

I would encourage you to use versions Angular still support, see [Angular's Support policy and schedule](https://angular.io/guide/releases#support-policy-and-schedule).

## Blog

For a more in detail description of the benefits of this package, read my blog - [Angular typesafe reactive forms](https://ruanbeukes.net/angular-typesafe-reactive-forms/).

When reading the blog, be mindful that it was written Oct-2017, before the `angular-typesafe-reactive-forms-helper` package existed. Back then, the idea was to copy the code and adjust as needed. Since then, there were a few requests, thus `angular-typesafe-reactive-forms-helper` was born.

## Contributions

I only added features required by my projects, but I know more could be added with your help.

Create a PR to get the conversation started :smile:

## Lastly

Use it…don’t use it :smile:

---

## Release notes
The model used for all code samples:
```typescript
interface HeroFormModel {
    heroName: string;
    weapons: WeaponModel[];
}
  
interface WeaponModel {
    name: string;
    damagePoints: number;
}
```
### FormGroupTypeSafe\<T> extends Angular's FormGroup class 

#### [V2.0.2](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V2.0.1...V2.0.2) (2021-05-18)
- Bump to [Angular 11](https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7).
- Stop integration tests for Angular 8.

#### [V2.0.1](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V2.0.0...V2.0.1) (2020-12-09)
Package the correct library files, instead of the repository - rookie mistake :)

#### [V2.0.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.8.2...V2.0.0) (2020-11-06)
- use [ng-packagr](https://github.com/ng-packagr/ng-packagr) to fix [bug](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/issues/146) - main.ts:15 Error: Angular JIT compilation failed
- add end-to-end-tests Angular 8, 9, 10
- removed Angular 7 integration tests from build pipeline as it is no longer supported by Angular team 

New `dist` file structure:

```
./dist:
LICENSE
README.md
angular-typesafe-reactive-forms-helper.d.ts
angular-typesafe-reactive-forms-helper.metadata.json
bundles
esm2015
fesm2015
package.json
public_api.d.ts
src

./dist/bundles:
angular-typesafe-reactive-forms-helper.umd.js
angular-typesafe-reactive-forms-helper.umd.js.map
angular-typesafe-reactive-forms-helper.umd.min.js
angular-typesafe-reactive-forms-helper.umd.min.js.map

./dist/esm2015:
angular-typesafe-reactive-forms-helper.js
public_api.js
src

./dist/esm2015/src:
angularTypesafeReactiveFormsHelper.js
getPropertyName.js

./dist/fesm2015:
angular-typesafe-reactive-forms-helper.js
angular-typesafe-reactive-forms-helper.js.map

./dist/src:
angularTypesafeReactiveFormsHelper.d.ts
getPropertyName.d.ts
```

Old `dist` file structure:

```
./dist:
LICENSE
README.md
lib
package.json

./lib:
angularTypesafeReactiveFormsHelper.d.ts
angularTypesafeReactiveFormsHelper.js
getPropertyName.d.ts
getPropertyName.js
```

---
#### [V1.8.2](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.8.1...V1.8.2) (2020-09-04)
- Fix [bug](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/issues/113) - getSafe() call fails and returns null when compiled to ES5.

---
#### [V1.8.1](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.8.0...V1.8.1) (2020-06-26)
- Bump to [Angular 10](https://blog.angular.io/version-10-of-angular-now-available-78960babd41).
- Stop integration tests for Angular 6.

---
#### [V1.8.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.7.0...V1.8.0) (2020-06-16)
- added `removeControlSafe`

Sample:
```typescript
 let sut: FormGroupTypeSafe<HeroFormModel> = createGroup();
 sut.removeControlSafe(x => x.heroName);
```

The bottom code was avoided simply because in a variable rename scenario, the IDE should rename all the references instead of just informing one where the errors are.

```typescript 
removeControl(name: keyof T): void;
removeControl(name: string): void;
```

---
#### [V1.7.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.6.0...V1.7.0) (2020-05-14)
- added `controls`

Angular's `forms.d.ts`:
```typescript
controls: { [key: string]: AbstractControl; };
```

angular-typesafe-reactive-forms-helper:
```typescript 
controls: { [P in keyof T]: AbstractControlTypeSafe<T[P]> };
```

 Code samples:
 ```typescript
 let sut: FormGroupTypeSafe<HeroFormModel> = createGroup();
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
 ```

---
#### [V1.6.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.5.1...V1.6.0) (2020-04-22)
- added `statusChanges` and `status`
  
Angular's `forms.d.ts`:
```typescript
/**
 * The validation status of the control. There are four possible
 * validation status values:
 *
 * * **VALID**: This control has passed all validation checks.
 * * **INVALID**: This control has failed at least one validation check.
 * * **PENDING**: This control is in the midst of conducting a validation check.
 * * **DISABLED**: This control is exempt from validation checks.
 *
 * These status values are mutually exclusive, so a control cannot be
 * both valid AND invalid or invalid AND disabled.
 */
readonly status: string;
```

angular-typesafe-reactive-forms-helper:
```typescript 
 export type ControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

 export interface FormGroupTypeSafe<T> extends FormGroup {
  readonly status: ControlStatus;
  readonly statusChanges: Observable<ControlStatus>;
}
 ```

 Code samples:
 ```typescript
  let sut: FormGroupTypeSafe<HeroFormModel> = createGroup();

  // $ExpectType ControlStatus
  sut.status;

  sut.statusChanges.subscribe(val => {
      // $ExpectType ControlStatus
      val;
  });

  // $ExpectType string | undefined
  sut.getSafe(x => x.heroName)?.status; // unfortunately this is still string ¯\_(ツ)_/¯

  sut.getSafe(x => x.heroName)?.statusChanges.subscribe(val => {
      // $ExpectType ControlStatus
      val;
  });
  
 ```

---
#### [V1.5.1](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.5.0...V1.5.1) (2020-04-17)

Had this error in `Angular 9.1.2` when executing `ng serve`.
The app would show a blank page with an error in browser's `devtools` console:
```
main.ts:15 Error: Angular JIT compilation failed: '@angular/compiler' not loaded!
  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.
  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?
  - Alternatively provide the compiler with 'import "@angular/compiler";' before bootstrapping.
    at getCompilerFacade (core.js:643)
    at Function.get (core.js:16349)
    at getFactoryDef (core.js:2200)
    at providerToFactory (core.js:17183)
    at providerToRecord (core.js:17165)
    at R3Injector.processProvider (core.js:16981)
    at core.js:16960
    at core.js:1400
    at Array.forEach (<anonymous>)
    at deepForEach (core.js:1400)
```

This is fixed.

More info on the error from [StackOverflow](https://stackoverflow.com/questions/60183056/ionic-5-with-angular-9-angular-jit-compilation-failed-angular-compiler-not#answer-60183174).

---
#### [V1.5.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.4.0...V1.5.0)  (2020-04-15)

Extend `AbstractControlTypeSafe<P>` with:
```typescript
  readonly valueChanges: Observable<T>;
  get(path: Array<string> | string): AbstractControl | null; 
  get(path: number[]): AbstractControlTypeSafe<T extends (infer R)[] ? R : T> | null;
```

- Samples `readonly valueChanges: Observable<T>;`:
```typescript
let sut: FormGroupTypeSafe<HeroFormModel> = createGroup();
sut.valueChanges.subscribe(val => {
    // $ExpectType HeroFormModel
    val;
});

sut.getSafe(x => x.heroName).valueChanges.subscribe(val => {
    // $ExpectType string
    val;
});
```  

- Split Angular's `get` into two functions based on the `path: Array<string | number> | string` parameter.

Angular's `forms.d.ts`:
```typescript
      get(path: Array<string | number> | string): AbstractControl | null;
```

angular-typesafe-reactive-forms-helper:
```typescript 
 get(path: Array<string> | string): AbstractControl | null;
 get(path: number[]): AbstractControlTypeSafe<T extends (infer R)[] ? R : T> | null;
 ```

This allows type safety when working with arrays.

```typescript
sut.getSafe(x => x.weapons).get([0]).valueChanges.subscribe(val => {
    // $ExpectType WeaponModel
    val;
});

// the angular way - .get('person.name')
sut.getSafe(x => x.weapons).get('person.name').valueChanges.subscribe(val => {
    // $ExpectType any
    val;
});

// the angular way - .get(['person', 'name'])
sut.getSafe(x => x.weapons).get(['person', 'name']).valueChanges.subscribe(val => {
    // $ExpectType any
    val;
});
```
---
#### [V1.4.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.3.0...V1.4.0) (2020-04-14)
- new interface `AbstractControlTypeSafe<P>` which extends from Angular's `AbstractControl` and will, over time, contain the common properties to Angular's `FormGroup`, `FormControl` and `FormArray`.
Currently it only returns `readonly value: T`.

- enhanced `getSafe` to return `AbstractControlTypeSafe<P>`
```typescript
  getSafe<P>(propertyFunction: (typeVal: T) => P): AbstractControlTypeSafe<P> | null;
```
Code example:
```typescript
 // heroName: string
 sut.getSafe(x => x.heroName)?.value; // value's ExpectType => string | undefined
```

- add new type `RecursivePartial<T>`
- enhanced `patchValue` to use `RecursivePartial<T>` so one is not forced by the compiler to complete mandatory properties on a nested types.
```typescript
patchValue(value: RecursivePartial<T>, options?: Object): void;
```
Code Example:
```typescript
let sut: FormGroupTypeSafe<HeroFormModel> = formBuilderTypeSafe.group<HeroFormModel>({...}) // let's pretend a valid FormGroupTypeSafe object was created here  
// Looking at the line below... 
// Before V1.4.0, Typescript would have complained about missing property damagePoints.
// This is not the case anymore as now all nested types will be Partial properties. 
sut.patchValue({ weapons: [{ name: "Head" }]});
```
---
#### [V1.3.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/compare/V1.2.0...V1.3.0) (2020-04-06)
- patchValue

Angular's `forms.d.ts`:
```typescript
patchValue(value: any, options?: Object): void;
```
angular-typesafe-reactive-forms-helper:
```typescript
patchValue(value: Partial<T>, options?: Object): void;
```

- formBuilderTypeSafe.group\<T> supports `FormArray`

```typescript
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
```
---
#### [V1.2.0](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/releases/tag/V1.2.0)  (2020-04-02)
- valueChanges, function returns Observable\<T>

Angular's `forms.d.ts`:
```typescript
valueChanges: Observable<any>;
```
angular-typesafe-reactive-forms-helper:
```typescript
valueChanges: Observable<T>;
```
---
#### V1.1.0 (2020-03-31)
- setValue, just a function signature update. 

Angular's `forms.d.ts` function signature:
```typescript
    setValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
```

angular-typesafe-reactive-forms-helper signature:

```typescript
    setValue(value: T, 
            options?: { 
              onlySelf?: boolean; 
              emitEvent?: boolean 
    }): void;
```
---
#### V1.0.0 (2020-03-29)
angular-typesafe-reactive-forms-helper has these extra functions:
- getSafe
- setControlSafe

---

- <a href="https://www.flaticon.com/free-icons/coffee" title="coffee icons">Coffee icons created by Freepik - Flaticon</a>