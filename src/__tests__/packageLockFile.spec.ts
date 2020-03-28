import {exec} from 'shelljs';

/*
  This will break the CI build pipeline.

  In order to test the package with all the different versions of angular, 
  the pipeline will pack a local angular-typesafe-reactive-forms package.
  That new package is then installed locally on the build server to each Angular version.
  If there is an existing angular-typesafe-reactive-forms in the package.json, the integrity calculation will be different, which will break the build on 'npm install' command.

  This is my hack to get around it...at least for now :)
*/
describe('intergationTests Package-lock.json', () => {
      test('Should not have the angular-typesafe-reactive-forms package dependency installed', () => {
        const lockFiles = exec(`ls ***/**/*/package-lock.json`)
        .stdout
        .split('\n')
        .filter(file => file);
  
        const dependencyDetectedList = lockFiles.map(lockFile => {
          const hasDependencyOnLock = exec(`cat ${lockFile} | grep angular-typesafe-reactive-forms`).stdout && true || false;
          const hasDependency = exec(`cat ${lockFile.replace('-lock.json','.json')} | grep angular-typesafe-reactive-forms`).stdout && true || false;
          if (hasDependency || hasDependencyOnLock) {
            return `- Please remove 'angular-typesafe-reactive-forms' dependency from ${lockFile.replace('-lock.json','.json')} and ${lockFile}.`
          }
          return null;
        })
        .filter(found => found);

        expect(dependencyDetectedList.join('\n')).toBe('');
  });
});
