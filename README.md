# tp1-Node-Parser

Create an API that returns the percentage of french companies that transferred their sieges after a succession before November 1st 2022

In the code of the application:

Download the data we need: https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip and extract the zip to recover the raw file in csv format (don't do it if the file already exists)
Using a csv parser, calculate the percentage of companies that have transfertSiege==true
Expose the percentage on an API route named /tp1 (ex: http://localhost:3000/tp2)
For obvious reasons, you're not allowed to cache the percentage. It must be calculated at any API call
