## Package.json scripts
---
### build:remove-test-from-lib

I've added this script because I had issues with JEST typings.

At first I excluded the test folder in my tsconfig: 
```javascript
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./lib",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
```

That was when the JEST typings were not pick-up.
When I included the tests, the typings worked but then JEST ran the test twice, one for `./src` and the other for `./lib/__test__`. 

I've found suggestion online on how to use multiple tsconfig files but failed to fix it.
Instead, my solution was to include the test folder in tsconfig: `"exclude": ["node_modules"]` and just to delete the test files from `./lib/__test__` after `tsc` did it's thing.

A dirty HACK...but it works :)

More info on the issue - https://github.com/Microsoft/TypeScript-Sublime-Plugin/issues/605

---