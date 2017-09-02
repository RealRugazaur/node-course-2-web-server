const request = require('request');

// ПРИ ПОМОЩИ CALLBACK :
/*
let getWeather = (lat, lon, callback) => {
  request({
    url: `https://api.darksky.net/forecast/04147e16b3343bddb4d0de6c572d3b4d/${lat},${lon}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (body.code === 400) {
      callback(body.error);
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature:  body.currently.apparentTemperature
      });
    }

// Так можно отловить все ошибки :

if (!error && response.statusCode === 200) {
  // OK
}
else {
  // error
}

  });
};

*/

// ПРИ ПОМОЩИ PROMISES и REQUEST:

let getWeather = (lat, lon) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/04147e16b3343bddb4d0de6c572d3b4d/${lat},${lon}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Forecast.io server.');
      } else if (body.code === 400) {
        reject(body.error);
      } else {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    });
  });
};



module.exports = {
  getWeather
};