const request = require('request-promise');
const express = require('express')
const app = express()

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}
app.listen( port );

var path = require('path');
var public = path.join(__dirname, 'public');

app.get('/api', async (req, res) => res.send(await requestVin(req.query.vin)))
app.use('/', express.static(public));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let options = {
    json: true
};

async function requestVin(vin) {
    let vinData = [];
    let url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/" + vin + "?format=json";
    await request(url, options, (error, res, body) => {
        if (error) {
            return console.log(error)
        };

        if (!error && res.statusCode == 200) {
            let errors = body.Results[0]['ErrorText'][0];

            Object.entries(body.Results[0]).forEach(([name, value]) => {
                if (value) {
                    vinData.push({name,value});
                }
            });
        };
    });

    return vinData;
}