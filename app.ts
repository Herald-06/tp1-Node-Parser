const express = require('express')
const app = express()

const port = 3001
var http = require('http');
const fs = require('fs');
const { count } = require('console');


app.get('/tp1', (req, res) => {

    const fs = require('fs')
    const csv = require('csv-parser')
    const download = require('download')
    const unzip = require('unzip-stream')

    console.log("xxxxxxxxxx")

    download('https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip', 'data').then(() => {

    console.log("*******")
    
        fs.createReadStream('data/StockEtablissementLiensSuccession_utf8.zip')
            .pipe(unzip.Parse())
            .on('entry', function(entry:any) {
                // console.log(entry)
                console.log("///////")

                var fileName : string = entry.path;
                // console.log(entry.path);

                var i : number = 0;
                var countTrue : number = 0;

                console.log("----x-----")
                if (fileName === "StockEtablissementLiensSuccession_utf8.csv") {
                console.log("----y----")

                    // console.log(fileName);
                    entry.pipe(csv())
                    .on('data', function(data:any) {
                        console.log(i)
                            if(data.transfertSiege == 'true') {
                                countTrue++;
                                console.log(countTrue + "True")
                            }
                            i++
                    })
                    .on('end', function()  {

                        let percent : number = countTrue/i*100;
                        res.send(`Avant le 1er Novembre 2022, ${percent.toFixed(2)}% des compagnies française
                        ont déplacé leurs siège social !`)
                    });
                }
            else { entry.autodrain(); }
        });
    })
})

app.listen(port, () => console.log(`Listening port ${port} !`))
