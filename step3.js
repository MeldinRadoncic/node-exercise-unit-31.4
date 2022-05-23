const fs = require('fs');
const process = require('process');
const axios = require('axios');


function handleOutput(text, print) {
    if (out) {
        fs.writeFile(print, text, 'utf8', function(err) {
        if (err) {
            console.log(`COULDN"T WRITE ${out}: ${err}`);
            process.exit(1);
        }
        });
    } else {
        console.log(text);
  }
}


function cat(path, print) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`ERROR READING ${path}: ${err}`);
            process.exit(1);
        }else {
            handleOutput(data, print);
        }
    });
}


async function webCat(url, print) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, print);
    }catch (err) {
        console.log(`ERROR ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let print;

if (process.argv[2] === '--out') {
    print = process.argv[3];
    path = process.argv[4];
}else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, print);
}else {
    cat(path, print);
}