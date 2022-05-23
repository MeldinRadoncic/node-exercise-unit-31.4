const fs = require('fs');
const process = require('process');


// STEP 1
function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        console.error(`ERROR READING ${path}: ${err}`);
        process.exit(1);
    }else {
        console.log(data);
      }
    });
}

cat(process.argv[2]);
