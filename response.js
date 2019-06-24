var request = require('request');
var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCXSV0-VoZuCtSxMav0C7xyll9DKP2OHRY&address=1301%20lombard%20street%20philadelphia';
var response = request({
    method: 'GET',
    uri: apiUrl
}, function(error, response, body) {
   
   var parsedJson = JSON.parse(body);
   console.log('character ', parsedJson.results[0]);
});

