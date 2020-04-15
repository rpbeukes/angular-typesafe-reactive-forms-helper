## Testing TypeScript types
[testing-typescript-types](https://www.simonholywell.com/post/testing-typescript-types.html) - Thanx Simon Holywell.

```
npm install --save-dev dtslint conditional-type-checks
```

[Unit testing TypeScript types with dtslint](https://koerbitz.me/posts/unit-testing-typescript-types-with-dtslint.html) - Thanx Paul Koerbitz's.

Note `lib` is `"lib": ["es6", "dom" ],` and not `"lib": ["es6"],` which kept my busy for a bit  :/

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