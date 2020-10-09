const fs = require('fs');
const { UNIQUE_STR } = require('./uniqueStr')
const { shellCommand } = require('./utils')

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

    let packageJson = require('../package.json');
    
    if (packageJson.devDependencies["@angular/common"] === newVersion){
        console.log(`No need to create PR, master's package.json matches v${newVersion}`);
        shellCommand(`cat package.json`);
        return;
    }

    // create branch, update package.json, commit changes, push to origin, create PR
    const branchName = 'bump-ng';

    shellCommand(`git branch`);
    shellCommand(`git branch ${branchName}`);
    shellCommand(`git checkout ${branchName}`);

    packageJson.devDependencies["@angular/common"] = newVersion;
    packageJson.devDependencies["@angular/compiler"] = newVersion;
    packageJson.devDependencies["@angular/core"] = newVersion;
    packageJson.devDependencies["@angular/forms"] = newVersion;
    packageJson.devDependencies["@angular/platform-browser"] = newVersion;

    fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
        if (err) throw err;
        console.log(`Success - check package.json\n`);
        shellCommand(`cat package.json`);

        shellCommand('npm install');
        
        shellCommand('git status');
        shellCommand('git add package.json package-lock.json');
        shellCommand('git config --local user.email "ruancoder+bot@gmail.com"');
        shellCommand('git config --local user.name "rpbeukes-bot"');
          
        shellCommand(`git commit -m "bump ng version ${newVersion}"`);
        shellCommand(`git push --set-upstream origin ${branchName}`);
        // https://github.com/github/hub
        // auto create the new PR
        shellCommand(`hub pull-request -m "bump ng v${newVersion} ${UNIQUE_STR}"`);
    });
};

main();