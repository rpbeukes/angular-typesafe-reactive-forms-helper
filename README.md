# angular-typesafe-reactive-forms-helper [![Build Status](https://travis-ci.org/rpbeukes/angular-typesafe-reactive-forms-helper.svg?branch=master)](https://travis-ci.org/rpbeukes/angular-typesafe-reactive-forms-helper)

## Why
Instead of:
```javascript
this.form.get('heroName').patchValue('He-Man');
```

angular-typesafe-reactive-forms-helper allows:
```javascript
this.form.get(x => x.heroName).patchValue('He-Man');
```

## Example on how to use:

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

## Blog

For a more in detail description of the benefits of this package, read my blog - [Angular typesafe reactive forms](https://ruanbeukes.net/angular-typesafe-reactive-forms/).

## Developer notes

`npm pack` will create `angular-typesafe-reactive-forms-helper-1.0.0.tgz`

### Consume in another app for testing

`~/workspace/some-application$` `npm install ~/angular-typesafe-reactive-forms-helper-0.0.0.tgz`

This is only if you don't want to go to public npm registry or for testing before you publish.

## Resources

Kudos to [Carl-Johan Kihl](https://itnext.io/@carljohan.kihl) as I followed these suggestions - [step-by-step-building-and-publishing-an-npm-typescript-package](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c).


