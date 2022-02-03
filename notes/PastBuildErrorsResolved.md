Command: `npm run integration-tests:test-ci:ng9`

Output:
```
ERROR in node_modules/@types/node/url.d.ts:137:13 - error TS2403: Subsequent variable declarations must have the same type.  Variable 'URLSearchParams' must be of type '{ new (init?: string | Record<string, string> | URLSearchParams | string[][]): URLSearchParams; prototype: URLSearchParams; }', but here has type '{ new (init?: string | Record<string, string> | URLSearchParams | 
string[][]): URLSearchParams; prototype: URLSearchParams; toString(): string; }'.

137         var URLSearchParams: {
                ~~~~~~~~~~~~~~~

  node_modules/typescript/lib/lib.dom.d.ts:16107:13
    16107 declare var URLSearchParams: {
                      ~~~~~~~~~~~~~~~
    'URLSearchParams' was also declared here.
```

Fix: Update `tsconfig.json` with `"skipLibCheck": true`.

See [commit](https://github.com/rpbeukes/angular-typesafe-reactive-forms-helper/commit/faac42284a48cd69c64a403ec7a5cf2c1e76f8d5).

Thanx again to [StackOverflow](https://stackoverflow.com/questions/57331779/typescript-duplicate-identifier-iteratorresult#answer-60090933) suggestion.



