'use strict';

const controller = require('lib/wiring/controller');
// Used to make the calls to google / darksky
const http = require('https');
const googleAPIKey = process.env.GOOGLE_API_KEY;
const weatherAPIKey = process.env.WEATHER_API_KEY;

// console.log(googleAPIKey);
// console.log(weatherAPIKey);

const processWeather = (lat, long, addressData, res) => {
  // Need to make a request to dark sky with the info we get from google
  let weatherOptions = {
    host: 'api.darksky.net',
    path: '/forecast/' + weatherAPIKey + '/' + lat + "," + long,
    method: 'GET'
  };
  // compose a request to dark sky api
  let weatherReq = http.request(weatherOptions, function(weatherRes) {
    // Similar to how we dealt with the google body data. Add it
    // up each time we get more data in.
    let weatherBody = "";
    weatherRes.on("data", function(chunk) {
      weatherBody += chunk;
    });
    // When our response is fully returned, act on the saved
    // weather body data
    weatherRes.on("end", function() {
      // Convert the weather body to a object
      let weatherObject = JSON.parse(weatherBody);
      // If we have a valid weather object with `currently` data continue
      if (weatherObject !== null && weatherObject.currently !== null) {
        // Setup the response back, that we are sending back json
        res.setHeader('Content-Type', 'application/json');
        // Get each of the pieces of info we want out of the dark sky weather
        // response object.
        let feelsLikeData = Math.round(weatherObject.currently.apparentTemperature);
        let actualTempData = Math.round(weatherObject.currently.temperature);
        let weatherConditionData = weatherObject.currently.summary;
        // Using the original response object from our users front end call
        // send back the data we want to give them as json.
        res.send(JSON.stringify({
          feelsLike: feelsLikeData,
          actualTemp: actualTempData,
          weatherCondition: weatherConditionData,
          address: addressData
        }));
      } else {
        // If not send back a bad request because something went wrong with the dark sky api data
        res.sendStatus(400);
      }
    });
  });
  // Send the dark sky request
  weatherReq.end();
};


// CALLED WHEN THE USER DOES A POST /weather.
// Excepts a body of:
// {
//   "zip": "02116"
// }
// Where 02116 is the zipcode to get the weather for
const getweather = (req, res, next) => {
  // Get the zip code from the body, required to do any more work
  let zip = req.body.zip;
  if (zip !== undefined) { // If we have a valid zipcode, continue
    // Information to make the google call to geocode zip to a lat/long
    let options = {
      host: 'maps.googleapis.com',
      path: '/maps/api/geocode/json?address=' + zip + '&key=' + googleAPIKey,
      method: 'GET'
    };
    // Make the request to call
    let req = http.request(options, function(newRes) {
      // Used to build the body response from the request
      let body = "";
      // When the response from google comes back with data
      // add it to the body. The data might come back in multiple
      // pieces so this will get call multiple times adding to
      // body each time.
      newRes.on("data", function(chunk) {
        body += chunk;
      });
      // When the response is done, we can take the body we updated
      // during data calls and act on it
      newRes.on("end", function() {
        // Turn the body into a json object.
        // NOTE: This is slow, look into a better way to handle this
        let jsonObject = JSON.parse(body);
        // If we have a valid object with results, continue
        if (jsonObject !== null && jsonObject.results !== null && jsonObject.results.length > 0) {
          // Call the process weather function with our lat, long, address and response object
          // from the original call.
          processWeather(jsonObject.results[0].geometry.location.lat,
            jsonObject.results[0].geometry.location.lng,
            jsonObject.results[0].formatted_address,
            res);
        } else {
          // if not, send back a bad request because we didnt get good info from google
          res.sendStatus(400);
        }
      });
    });
    // Sends the request
    req.end();
  } else {
    // If no valid zipcode, send back a bad request message
    res.sendStatus(400);
  }
};

module.exports = controller({
  getweather,
});
