const express = require('express')
const app = express()

const port = 3000

app.get('/tp1', (rep, res)=>{

    const fs = require('fs')
    const csv = require('csv-parser')
    const download = require('download')
    const unzip = require('unzip-stream')

    const tableau = [];
    var i = 0;
    var countTrue = 0;

    download('https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip', 'data').then(() => {

        fs.createReadStream('data/StockEtablissementLiensSuccession_uft8.zip')
        .pipe(unzip.Parse())
        .on('entry', function(entry) {

            const fileName = entry.path;
            const type = entry.type;
            const size = entry.size;

            if (fileName === "StockEtablissementLiensSuccession_uft8.csv") {
                entry.pipe(csv())
                .on('data', (data) => tableau.push(data))
                .on('end', () => { tableau.forEach(element => {
                    if(element.transfertSiege =='true') {
                        countTrue++;
                    }
                    i++
                });
                let percent = countTrue/i*100;
                res.send(`Avant le 1er Novembre 2022, ${percent.toFixed(2)}% des compagnies française
                ont déplacé leurs siège social !`)
            })
            } 
                else { entry.autodrain(); }
        });
    })

})

app.listen(port, () =>console.log(`Listening port ${port} !`))