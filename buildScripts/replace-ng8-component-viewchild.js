const fs = require('fs');
const filePath = process.argv && process.argv[2] || '';

const main = () => {
    search = "ViewChild('testFormTextArea')";
    replace = "ViewChild('testFormTextArea', null)";
    
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        
        content = data.replace(search, replace);
        if (content.indexOf(replace) !== -1) {
            fs.writeFile (filePath, content, (err) => {
                if (err) throw err;
                console.log(`Success - '${search}' replaced with '${replace}' (${filePath})`);
            });
        } else {
            console.log(`Failed - '${search}' replaced with '${replace}' (${filePath})`);
        }
    });
};

main();