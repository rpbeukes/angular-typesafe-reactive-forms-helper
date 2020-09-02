const shelljs = require('shelljs');

const shellCommand = (command) => {
    console.log(`> ${command}`);
    const r = shelljs.exec(command);
    
    if (r.code && r.stderr) throw Error(r.stderr);
    return r.stdout;
}

module.exports = { shellCommand }; 
