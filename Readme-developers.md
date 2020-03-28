# Developer notes

## Never commit integration test package.json with angular-typesafe-reactive-forms-helper

There is a unit test to prevent it `packageLockFile.spec.ts`.

package.json
```javascript

"angular-typesafe-reactive-forms-helper": "file:../../angular-typesafe-reactive-forms-helper.tgz",
```

package-lock.json
```jacvascript
"angular-typesafe-reactive-forms-helper": {
    "version": "file:../../angular-typesafe-reactive-forms-helper.tgz",
    "integrity": "sha512-BL+vRHNhc7YiUcDPHW65DJ36V3U5PPuQebXpOoGMUA5D2hdVIn3x6vHf8d7hDpie3aSfqfYtPu9NstaopI+22g=="
},
```

don't commit as it will break the build with some error like this:

```javascript
npm ERR! code EINTEGRITY
npm ERR! Verification failed while extracting angular-typesafe-reactive-forms-helper@file:../../angular-typesafe-reactive-forms-helper.tgz:
npm ERR! Verification failed while extracting angular-typesafe-reactive-forms-helper@file:../../angular-typesafe-reactive-forms-helper.tgz:
npm ERR! Integrity check failed:
npm ERR!   Wanted: sha512-+jruSuM5kEF63lD9UtYdrrPCEX5ttiRFUPj0I5gYdi9wrRuF7JG5XQXRlMo5z8ByqQiOneiV1YU1ofCrwX0SrA==
npm ERR!    Found: sha512-shgMI/Kvw/GhOX01mZegMfZEnQKA/xPekZ1CBCk7h/HQwifsbC2a4jJPiaWXI2K70NsooY3SWLRWnKSSITWaCw==
```



`npm pack` will create `angular-typesafe-reactive-forms-helper-1.0.0.tgz`

## Consume in another app for testing

`~/workspace/some-application$` `npm install ~/angular-typesafe-reactive-forms-helper-0.0.0.tgz`

This is only if you don't want to go to public npm registry or for testing before you publish.

## Resources

Kudos to [Carl-Johan Kihl](https://itnext.io/@carljohan.kihl) as I followed these suggestions - [step-by-step-building-and-publishing-an-npm-typescript-package](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c).
