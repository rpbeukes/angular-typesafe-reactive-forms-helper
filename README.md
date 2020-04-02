# angular-typesafe-reactive-forms-helper
 [![Build Status](https://travis-ci.org/rpbeukes/angular-typesafe-reactive-forms-helper.svg?branch=master)](https://travis-ci.org/rpbeukes/angular-typesafe-reactive-forms-helper) ![GitHub package.json version](https://img.shields.io/github/package-json/v/rpbeukes/angular-typesafe-reactive-forms-helper) ![GitHub](https://img.shields.io/github/license/rpbeukes/angular-typesafe-reactive-forms-helper) ![npm](https://img.shields.io/npm/dt/angular-typesafe-reactive-forms-helper) ![GitHub forks](https://img.shields.io/github/forks/rpbeukes/angular-typesafe-reactive-forms-helper?style=social)
## Quick Syntax

Instead of:
```javascript
this.form.get('heroName').patchValue('He-Man');
```

angular-typesafe-reactive-forms-helper allows:
```javascript
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
```javascript
//interface used with FormGroupTypeSafe<T>
interface IHeroFormModel {
  name: string,
  secretLairs: Array<Address>,
  power: string,
  sidekick: string
}
```

### 2. Declare your new FormGroupTypeSafe form with the help of TypeScript’s generics.
```javascript
/* TypeSafe Reactive Forms Changes */
//old code
//heroForm: FormGroup;
heroForm: FormGroupTypeSafe<IHeroFormModel>;

```
### 3. Inject FormBuilderTypeSafe
```javascript
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
```javascript
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
  address: IAddressModel
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

This package has been tested with Angular 6, 7, 8, 9.

(Should work with Angular 4 & 5 too)

## Release notes
### FormGroupTypeSafe\<T> extends Angular's FormGroup class 

#### V1.2.0
- valueChanges, function returns Observable\<T>;

Angular's `forms.d.ts`:
```javascript
valueChanges: Observable<any>;
```
angular-typesafe-reactive-forms-helper signature:
```javascript
valueChanges: Observable<T>;
```

#### V1.1.0
- setValue, just a function signature update. 

Angular's `forms.d.ts` function signature:
```javascript
    public setValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
```

angular-typesafe-reactive-forms-helper signature:

```javascript
setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
```

#### V1.0.0
angular-typesafe-reactive-forms-helper has these extra functions:
- getSafe
- setControlSafe

## Blog

For a more in detail description of the benefits of this package, read my blog - [Angular typesafe reactive forms](https://ruanbeukes.net/angular-typesafe-reactive-forms/).

When reading the blog, be mindful that it was written Oct-2017, before the `angular-typesafe-reactive-forms-helper` package existed. Back then, the idea was to copy the code and adjust as needed. Since then, there were a few requests, thus `angular-typesafe-reactive-forms-helper` was born.

## Contributions

I only added features required by my projects, but I know more could be added with your help.

Create a PR to get the conversation started :)

## Lastly

Use it…don’t use it :)
