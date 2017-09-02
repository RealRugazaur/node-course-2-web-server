// request - модуль для отправки HTTP(HTTPS) запросов

const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true // Аргумент всегда трактуется как строка
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(argv);
console.log();

// ПРИ ПОМОЩИ CALLBACK :
/*
geocode.geocodeAddress(argv.a, (errorMessage, location) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else if (results) {
    console.log(JSON.stringify(location, undefined, 2));

    weather.getWeather(location.latitude, location.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else if (weatherResults) {
        console.log(`Temperature : ${weatherResults.temperature}`);
        console.log(`Apparent temperature : ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
*/

// ПРИ ПОМОЩИ PROMISES и REQUEST:

/*
geocode.geocodeAddress(argv.a)
.then((location)=> {
  console.log(JSON.stringify(location, undefined, 2));
  return weather.getWeather(location.latitude, location.longitude);
}).then((weatherResults) => {
  console.log(`Temperature : ${weatherResults.temperature}`);
  console.log(`Apparent temperature : ${weatherResults.apparentTemperature}`);
}).catch((errorMsg) => {
  console.log(errorMsg)
});
*/

console.log('PROMISES и AXIOS');
// ПРИ ПОМОЩИ PROMISES и AXIOS:
const axios = require('axios');
// ЗАМЕТЬ, что не все функции могут работать с PROMISES напрямую через than catch конструкции
// , например request, вызов который пришлось 'обернуть' в Promise
// Используем сторонний модуль, который поддерживает PROMISE

let encodedAddress = encodeURIComponent(argv.a);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    // Сообщаем node.js об ошибке, будет немедленно
    // вызван catch
    throw new Error('Unable to find that address.');
  }
  console.log(response.data);
  let [lat, lon] = [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng];
  let weatherUrl = `https://api.darksky.net/forecast/04147e16b3343bddb4d0de6c572d3b4d/${lat},${lon}`;
  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature =  response.data.currently.apparentTemperature;
  console.log(`Temperature : ${temperature}`);
  console.log(`Apparent temperature : ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  } else {
    console.log(e.message); // e.massage, то что будет передано в конструктор Error
  }
});
