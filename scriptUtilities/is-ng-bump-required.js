const shelljs = require('shelljs');
const { uniqueStr } = require('./uniqueStr')

const main = () => {
    let ngCurrentVersion;
    let newVersion;

    console.log('process.env.BUMP_NG', process.env.BUMP_NG);
    console.log('process.env.EXISTING_PR_FOR_BUMP_NG', process.env.EXISTING_PR_FOR_BUMP_NG);

    const existingPRDetected = shellCommand(`hub pr list --format="%t,%au,%l%n" | grep "${uniqueStr}"`);
    if (existingPRDetected) {
        console.log(`Bump already detected: \n${existingPRDetected}\nNo action required.`);
        process.env.BUMP_NG = false;
        process.env.EXISTING_PR_FOR_BUMP_NG = true;
        return;
    }

    const prTitles = shellCommand('hub pr list --format="%t,%au,%l%n"').split('\n');

    for (let index = 0; index < prTitles.length; index++) {
        if (isDependabotPRWhichBumpsAngular(prTitles[index])) {
            const [ title ] = prTitles[index].split(',');
            const [ _ , bumpVersions ] = title.split(' from ');
            
            if (bumpVersions) {
                [ngCurrentVersion , newVersion] = bumpVersions.split(' to ');
                process.env.CURRENT_NG_VER = ngCurrentVersion;
                if (ngCurrentVersion && newVersion) {
                    newVersion = `~${newVersion}`
                    process.env.NEW_NG_VER = newVersion;
                    process.env.BUMP_NG = true;
                    break;
                }
            }
        }
    }

    console.log('process.env.BUMP_NG', process.env.BUMP_NG);
    console.log('process.env.EXISTING_PR_FOR_BUMP_NG', process.env.EXISTING_PR_FOR_BUMP_NG);
    console.log('process.env.CURRENT_NG_VER', process.env.CURRENT_NG_VER);
    console.log('process.env.NEW_NG_VER', process.env.NEW_NG_VER);
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