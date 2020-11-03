
### npm
Create an access token after successful login:
```text
npm login
```

Publish to npm registry:
```text
npm publish
```

Remove published package from npm registry:
```text
npm unpublish angular-typesafe-reactive-forms-helpe-test@1.8.0
- angular-typesafe-reactive-forms-helpe-test@1.8.0
```

## Testing TypeScript types

[testing-typescript-types](https://www.simonholywell.com/post/testing-typescript-types.html) - Thanx Simon Holywell.

```
npm install --save-dev dtslint conditional-type-checks
```

[Unit testing TypeScript types with dtslint](https://koerbitz.me/posts/unit-testing-typescript-types-with-dtslint.html) - Thanx Paul Koerbitz's.

Note `lib` is `"lib": ["es6", "dom" ],` and not `"lib": ["es6"],` which kept me busy for a bit :/

tsconfig.json:

```javascript
{
    "compilerOptions": {
      "module": "commonjs",
      "lib": ["es6", "dom" ],
      "noImplicitAny": true,
      "noImplicitThis": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "noEmit": true,
      // ../angularTypesafeReactiveFormsHelper.ts error TS1219: Experimental support for decorators is a feature that is subject to change in a future release.
      // Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.
      "experimentalDecorators": true,

      // If the library is an external module (uses `export`), this allows your test file to import "mylib" instead of "./index".
      // If the library is global (cannot be imported via `import` or `require`), leave this out.
      "baseUrl": "."
    }
  }
```

### FormArray

[guide-to-formarray](https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a) - Thanx Netanel Basal

## Configure E2E tests in your CI pipeline with Puppeteer
[How to setup Angular e2e tests on VSTS CI Builds using Puppeteer](https://medium.com/@danharris_io/how-to-setup-angular-e2e-tests-on-vsts-ci-be0872f9dc31) (Thanks to Dan Harris)

[StackOverflow](https://stackoverflow.com/questions/51536244/how-to-use-puppeteer-in-an-angular-application)

Add packages:
```
npm i -D jasmine-reporters puppeteer @types/puppeteer protractor-console-plugin
```

Update `protractor.conf.js`:
```
...
const { SpecReporter } = require("jasmine-spec-reporter");
+ const jasmineReporters = require("jasmine-reporters");
+ process.env.CHROME_BIN = process.env.CHROME_BIN || require("puppeteer").executablePath();
...
```

Update `protractor.conf.js` within the `exports.config object`, add new property (chromeOptions) to the chrome capability that defines a binary path for chrome:
```
capabilities: {
  browserName: "chrome",
+ chromeOptions: {
+   args: ['--headless'],  
+   binary: process.env.CHROME_BIN
+ }
},
```

Update `protractor.conf.js` within `exports.config`, in the `onPrepare() function`, add the junit xml reporter from jasmine-reporters:
```
onPrepare() {
...
+ jasmine.getEnv().addReporter(
+   new jasmineReporters.JUnitXmlReporter({
+     consolidateAll: true,
+     savePath: "e2e/results",
+     filePrefix: "e2e-results-junit"
+    })
+ );
},
```

Update `protractor.conf.js` within `exports.config` add console plugin:
```
...
+ plugins: [
+   {
+     package: "protractor-console-plugin",
+     failOnWarning: false,
+     failOnError: true,
+     logWarnings: true
+   }
+ ]
...
```