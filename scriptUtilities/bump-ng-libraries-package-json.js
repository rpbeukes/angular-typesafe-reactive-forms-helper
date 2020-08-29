const fs = require('fs');
let packageJson = require('../package.json');
const shelljs = require('shelljs');

const main = () => {
    const ngCurrentVersion = packageJson.devDependencies["@angular/common"];
    const newVersion = process.argv && process.argv[2] || '';
    if (newVersion) {
        console.log(`current version: ${ngCurrentVersion}`);
        console.log(`new version: ${newVersion}`);

        shellCommand('hub pr list --format="%t,%au,%l%n"');
        
        return;

        const branchName = 'bump-ng';
        
        shellCommand('git checkout master');
        shellCommand('git pull');
        shellCommand(`git branch -d ${branchName}`);
        shellCommand(`git branch ${branchName}`);
        shellCommand(`git checkout ${branchName}`);

        packageJson.devDependencies["@angular/common"] = newVersion;
        packageJson.devDependencies["@angular/compiler"] = newVersion;
        packageJson.devDependencies["@angular/core"] = newVersion;
        packageJson.devDependencies["@angular/forms"] = newVersion;
        packageJson.devDependencies["@angular/platform-browser"] = newVersion;

        fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
            if (err) throw err;
            console.log(`Success - check package.json`);

            shellCommand('npm install');
            
            shellCommand('git status');
            shellCommand('git add package.json package-lock.json');
            shellCommand(`git commit -m "bump ng version ${newVersion}"`);
            shellCommand(`git push --set-upstream origin ${branchName}`);
            // https://github.com/github/hub
            // auto create the new PR
            shellCommand(`hub pull-request -m "bump ng v${newVersion}"`);
        });
    } else {
        console.log(`missing newVersion argument... 
        eg: node ./scriptUtilities/bump-ng-libraries-package-json.js ~10.0.8`);
    }
};

const shellCommand = (command) => {
    console.log(`> ${command}`);
    shelljs.exec(command).stdout;
}

main();