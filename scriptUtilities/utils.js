const shelljs = require('shelljs');

const shellCommand = (command) => {
    console.log(`> ${command}`);
    const r = shelljs.exec(command);
    
    if (r.code && r.stderr) throw Error(r.stderr);
    return r.stdout;
}

const shellCommandAddEnvironmentVariable = (variableName, value) => {
    if (process.env.GITHUB_ENV) {
        shellCommand(`echo "${variableName}=${value}" >> $GITHUB_ENV`);
    } else {
        console.log('No $GITHUB_ENV detected, most likely you are running locally.')
    }
}

module.exports = { shellCommand, shellCommandAddEnvironmentVariable }; 
