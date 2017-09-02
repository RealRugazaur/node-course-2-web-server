const request = require('request');
// ПРИ ПОМОЩИ CALLBACK :
/*
let geocodeAddress = (address, callback) => {
// Кодируем спец сиволы типа пробелов.
  let encodedAddress = encodeURIComponent(address);

// Отправить запрос, по возвращении ответа будет вызван callback
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true // Запросить json/ Автоматически преобразовать json ответ в javascript объект.
  }, (error, response, body) => {
// body - тело ответа, к примеру html страница
// response - body + статус и заголовки ответа, а также информация о запросе.
// error - ошибки, связанные с формированием запроса, т.е. ошибки на моей стороне
// (например опечатка в url или отсутсвие подключени к интернету).

    if (error) {
      callback('Unable to connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {

      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });

// Чтобы вывести всю инфу об объекте,2 ой аргумент не нужен, 3 - отсупы
// console.log(JSON.stringify(body, undefined, 2));
// console.log(JSON.stringify(response, undefined, 2));
// console.log(JSON.stringify(error, undefined, 2));

//console.log(`Address: ${body.results[0].formatted_address}`);
//console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
//console.log(`Longitude : ${body.results[0].geometry.location.lng}`);

    }

  });
};
*/
// ПРИ ПОМОЩИ PROMISES и REQUEST:

let geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {

    let encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true // Запросить json/ Автоматически преобразовать json ответ в javascript объект.
    }, (error, response, body) => {

      if (error) {
        reject('Unable to connect to Google servers');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};



module.exports = {
  geocodeAddress
};


