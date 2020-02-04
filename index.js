const request = require('request-promise');
const express = require('express')
const app = express()

var path = require('path');
var public = path.join(__dirname, 'public');

app.get('/api', async (req, res) => res.send(await requestVin(req.query.vin)))
app.use('/', express.static(public));

const listener = app.listen(process.env.PORT || 8000, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});

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