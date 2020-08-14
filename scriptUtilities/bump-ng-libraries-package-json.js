const fs = require('fs');
let packageJson = require('../package.json');

const main = () => {
    const ngCurrentVersion = packageJson.devDependencies["@angular/common"];
    const newVersion = process.argv && process.argv[2] || '';
    if (newVersion) {
        console.log(`current version: ${ngCurrentVersion}`);
        console.log(`new version: ${newVersion}`);
        
        packageJson.devDependencies["@angular/common"] = newVersion;
        packageJson.devDependencies["@angular/compiler"] = newVersion;
        packageJson.devDependencies["@angular/core"] = newVersion;
        packageJson.devDependencies["@angular/forms"] = newVersion;
        packageJson.devDependencies["@angular/platform-browser"] = newVersion;

        fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
            if (err) throw err;
            console.log(`Success - check package.json`);
        });
    } else {
        console.log(`missing newVersion argument... 
        eg: node ./scriptUtilities/bump-ng-libraries-package-json.js ~10.0.8`);
    }
};

main();