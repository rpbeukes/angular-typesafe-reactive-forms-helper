
# How these different Angular versions were created

## Install a new Angular 6 app

`npx @angular/cli@6.2.1 new test-package-with-ng6`


## Add the Reactive Test Forms to ng6 app

1. delete content `app.component.html` and replace with `<router-outlet></router-outlet>`
2. add `~/src/app/forms` directory to app
3. add the `testform.component`
4. add some karma test to verify functionality
5. change `karma.conf.js` to support `puppeteer` so that the test can run on build server.
   - `npm i puppeteer -D`
   


## Some issues I found in ng6

### Cannot find name 'unknown'

```javascript
ERROR in node_modules/angular-typesafe-reactive-forms-helper/lib/angularTypesafeReactiveFormsHelper.d.ts(13,58): error TS2304: Cannot find name 'unknown'.
node_modules/angular-typesafe-reactive-forms-helper/lib/angularTypesafeReactiveFormsHelper.d.ts(14,65): error TS2304: Cannot find name 'unknown'.
```

Fixed it by updating the ng6 project's `tsconfig.json` to skip the typescript lib checking.
```javascript
 "skipLibCheck": true
```

`angular-typesafe-reactive-forms-helper` is using the latest typescript and it is not recognized by ng6 version of typescript.  