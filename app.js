var express = require('express');
var app = express();
var port = 3001;
var http = require('http');
var fs = require('fs');
var count = require('console').count;
app.get('/tp1', function (req, res) {
    var fs = require('fs');
    var csv = require('csv-parser');
    var download = require('download');
    var unzip = require('unzip-stream');
    console.log("xxxxxxxxxx");
    download('https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip', 'data').then(function () {
        console.log("*******");
        fs.createReadStream('data/StockEtablissementLiensSuccession_utf8.zip')
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
            // console.log(entry)
            console.log("///////");
            var fileName = entry.path;
            // console.log(entry.path);
            var i = 0;
            var countTrue = 0;
            console.log("----x-----");
            if (fileName === "StockEtablissementLiensSuccession_utf8.csv") {
                console.log("----y----");
                // console.log(fileName);
                entry.pipe(csv())
                    .on('data', function (data) {
                    console.log(i);
                    if (data.transfertSiege == 'true') {
                        countTrue++;
                        console.log(countTrue + "True");
                    }
                    i++;
                })
                    .on('end', function () {
                    var percent = countTrue / i * 100;
                    res.send("Avant le 1er Novembre 2022, ".concat(percent.toFixed(2), "% des compagnies fran\u00E7aise\n                        ont d\u00E9plac\u00E9 leurs si\u00E8ge social !"));
                });
            }
            else {
                entry.autodrain();
            }
        });
    });
});
app.listen(port, function () { return console.log("Listening port ".concat(port, " !")); });
