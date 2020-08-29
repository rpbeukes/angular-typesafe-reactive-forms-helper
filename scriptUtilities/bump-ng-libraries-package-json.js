const fs = require('fs');
let packageJson = require('../package.json');
const shelljs = require('shelljs');

const main = () => {
    let ngCurrentVersion;
    let newVersion;

    const prTitles = shellCommand('hub pr list --format="%t,%au,%l%n"').split('\n');

    let createPR = false;
    for (let index = 0; index < prTitles.length; index++) {
        if (isDependabotPRWhichBumpsAngular(prTitles[index])) {
            const [ title ] = prTitles[index].split(',');
            const [ _ , bumpVersions ] = title.split(' from ');
            
            if (bumpVersions) {
                [ngCurrentVersion , newVersion] = bumpVersions.split(' to ');
                if (ngCurrentVersion && newVersion) {
                    newVersion = `~${newVersion}`
                    createPR = true;
                    break;
                }
            }
        }
    }

    if (!createPR) {
        console.log('No need to bump angular version');  
        return;
    }

    console.log(`current version: ${ngCurrentVersion}`);
    console.log(`new version: ${newVersion}`);

    const branchName = 'bump-ng';
    
    shellCommand('git --version');
    shellCommand('git branch');
    return;
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
};

const shellCommand = (command) => {
    console.log(`> ${command}`);
    return shelljs.exec(command).stdout;
}

const isDependabotPRWhichBumpsAngular = (prTitleWithCommas) => {
    const isDependabotPR = prTitleWithCommas.includes('dependencies') && prTitleWithCommas.includes('[bot]');
    if (isDependabotPR) {
        const isAngularBump = prTitleWithCommas.includes('@angular/common') ||
                                prTitleWithCommas.includes('@angular/compiler') ||
                                    prTitleWithCommas.includes('@angular/core') ||
                                        prTitleWithCommas.includes('@angular/forms') ||
                                            prTitleWithCommas.includes('@angular/platform-browser');
        return isAngularBump;
    }
    return false;
}

main();