var request = require('request');

console.log("Weather today is ...");
request('https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22', function(error, response, body) {
  if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      console.log(parsedData.weather[0].description);
      //console.log(parsedData["weather"][0]["description"]); // body is a json but type string, not a javascript object
  } 
});