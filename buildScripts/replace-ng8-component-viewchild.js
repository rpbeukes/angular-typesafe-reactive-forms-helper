const fs = require('fs');
const filePath = process.argv && process.argv[2] || '';

const main = () => {
    search = "ViewChild('testFormTextArea')";
    replace = "ViewChild('testFormTextArea', null)";
    
    console.log(filePath);
    
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        
        content = data.replace(search, replace);
        if (content.indexOf(replace) > 0) {
            fs.writeFile (filePath, content, (err) => {
                if (err) throw err;
                console.log(`Success - ${search} replace with ${replace}`);
            });
        } else {
            console.log(`Failed - ${search} replace with ${replace}`);
        }
    });
};

main();