const fs = require('fs');
let packageJson = require('../package.json');
const shelljs = require('shelljs');
const { uniqueStr } = require('./uniqueStr')

const main = () => {
    if (!process.env.BUMP_NG) {
        console.log('No need to bump angular version.');  
        return;
    }

    if (!process.env.CURRENT_NG_VER){
        console.log('No CURRENT_NG_VER, please set env variable.');  
        return;
    }

    if (!process.env.NEW_NG_VER){
        console.log('No NEW_NG_VER, please set env variable.');  
        return;
    }

    console.log('process.env.CURRENT_NG_VER:', process.env.CURRENT_NG_VER);
    console.log('process.env.NEW_NG_VER:', process.env.NEW_NG_VER);

    const newVersion = process.env.NEW_NG_VER;
    const branchName = 'bump-ng';

    shellCommand(`git branch`);
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
        shellCommand(`hub pull-request -m "bump ng v${newVersion}" ${uniqueStr}`);
    });
};

const shellCommand = (command) => {
    console.log(`> ${command}`);
    return shelljs.exec(command).stdout;
}

main();