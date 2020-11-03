
# How these different Angular versions were created

## Install a new Angular 6 app

`npx @angular/cli@6.2.1 new test-package-with-ng6`

### Add the Reactive Test Forms to ng6 app

1. delete content `~/src/app/app.component.html` and replace with `<router-outlet></router-outlet>`
2. delete `~/src/app/app.component.spec.ts`
3. add `~/src/app/forms` directory to app
4. add the `~/src/app/forms/testform.component`
5. update `~/src/app/app.modules.ts` with:
```
@NgModule({
  declarations: [
    AppComponent,
    TestFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilderTypeSafe],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
6. update `app-routing.module.ts` with:
```
const routes: Routes = [
  { path: '', component: TestFormComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
7. update `app.component.ts` with to specific angular version:
```
export class AppComponent {
  title = 'test-package-with-ngXX';
}

```
8. add some karma test to verify functionality
9.  change `karma.conf.js` to support `puppeteer` so that the test can run on build server.
   - `npm i puppeteer -D`
11. Update the tests

### Some issues I found in ng6

#### Cannot find name 'unknown'

```javascript
ERROR in node_modules/angular-typesafe-reactive-forms-helper/lib/angularTypesafeReactiveFormsHelper.d.ts(13,58): error TS2304: Cannot find name 'unknown'.
node_modules/angular-typesafe-reactive-forms-helper/lib/angularTypesafeReactiveFormsHelper.d.ts(14,65): error TS2304: Cannot find name 'unknown'.
```

Fixed it by updating the ng6 project's `tsconfig.json` to skip the typescript lib checking.
```javascript
 "skipLibCheck": true
```

`angular-typesafe-reactive-forms-helper` is using the latest typescript and it is not recognized by ng6 version of typescript.  

## Install a new Angular 7 app

`npx @angular/cli@7.3.9 new test-package-with-ng7`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```

## Install a new Angular 8 app

`npx @angular/cli@8.3.25 new test-package-with-ng8`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```

## Install a new Angular 9 app

`npx @angular/cli@9.0.7 new test-package-with-ng9`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```

## Install a new Angular 10 app

`npx @angular/cli@10.0.0 new test-package-with-ng10`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```
