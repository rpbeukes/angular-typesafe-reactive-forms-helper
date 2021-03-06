
# How these different Angular versions were created

## Install a new Angular 11 app
`npx @angular/cli@11.0.0 new test-package-with-ng11`

```javascript
? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
  This setting helps improve maintainability and catch bugs ahead of time.
  For more information, see https://angular.io/strict Yes
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```
---

## Add the Reactive Test Forms to ngX app

1. delete content `~/src/app/app.component.html` and replace with `<router-outlet></router-outlet>`
2. delete `~/src/app/app.component.spec.ts`
3. add `~/src/app/forms` directory to app
4. add the `~/src/app/forms/testform.component`
5. update `~/src/app/app.modules.ts` with:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestFormComponent } from './form/testform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';


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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestFormComponent } from './form/testform.component';

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
12. Configure headless e2e tests 

```
npm run update-latest-integration-tests:ng9:e2e
```
This will copy the latest version integration tests eg: ng10, and copy it to all older versions.
- Update `protractor.conf.js`
- add end-to-end tests `app.e2e-spec.ts`
- make sure that the new integration test ng version's devDependencies has `"jasmine-spec-reporter": "~5.0.0"`.
```
npm i -D jasmine-reporters puppeteer @types/puppeteer protractor-console-plugin
```
Content of `app.e2e-spec.ts` should be something like this:
```
import * as puppeteer from 'puppeteer';

describe('End-to-End tests', () => {
  it('should render app-test-form', async () => {
    process.env.NG_VERSION = process.env.NG_VERSION || 'process-env-VERSION-not-set';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:4200');

    const headerEl = await page.$('app-test-form h1');

    if (!headerEl) {
      await browser.close();
      throw Error('Did not find \'app-test-form h1\'. More than likely the component did not render as expected :(');
    }

    const text = await page.evaluate(element => element && element.textContent, headerEl);
    expect(text).toEqual(`test-package-with-ng${process.env.NG_VERSION}`);

    await browser.close(); 
  });
});
```

Make sure you have a similar `npm script` to execute the e2e test in CI mode, change ng versions to match new version:
```
"integration-tests:e2e-ci:ng10:prod": "export NG_VERSION=10 && cd ./integrationTests/ng10/test-package-with-ng10 && export CI=true && npm run e2e -- --prod",
```
---

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


## Install a new Angular 10 app

`npx @angular/cli@10.0.0 new test-package-with-ng10`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```
---
## Install a new Angular 9 app

`npx @angular/cli@9.0.7 new test-package-with-ng9`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```

---
## Install a new Angular 8 app

`npx @angular/cli@8.3.25 new test-package-with-ng8`

```javascript
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
```
---
## Install a new Angular 6 app

`npx @angular/cli@6.2.1 new test-package-with-ng6`
