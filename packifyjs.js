"use strict";

var fs = require("fs");
var program = require("commander");

var listOfFiles = [
    "node_modules/fast-levenshtein/levenshtein.js",
    "src/datachecker.mjs",
    "src/PrivacyConfigFactory.mjs",
    "src/PrivacyReportViewBuilder.mjs",
    "src/utils.mjs"
];

var fout = "jsprivacychecker.js";

//Remove the previous one at all file.
let bFoutExists = fs.existsSync(fout);
if (bFoutExists) {
    fs.unlinkSync(fout, (err) => { if (err) throw err; });
}

//Reading files.
for (let iFile=0; iFile<listOfFiles.length; iFile++) {
    let sfile = listOfFiles[iFile];
    fs.readFile(sfile, 'utf8', function (err, data) {
        if (err)
            return console.log(err);

        var result = data.replace(/export/g, '') + "\r\n";

        fs.appendFileSync(fout, result);

    });
}//EndFor.

