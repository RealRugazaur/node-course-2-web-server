const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// НИЗКОУРОВНЕВЫЙ ПОДХОД
let message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log(`Message: ${message}, hash: ${hash}`);

let data = {
  id: 4
};

let token = {
  data,
  // хеш объекта data, для того, чтобы клиент не мог иземенить id
  // salt the hash - добавить к хешу какие нибудь уникальные данные,
// чтобы клиент изменив data, не смог изменить и hash.
  hash: SHA256(JSON.stringify(data) + 'some secret').toString()
};

// Имитируем взломщика
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log(`Data was not changed`);
} else {
  console.log('Data was changed. Do not trust!');
}

// ВЫСОКОУРОВНЕВЫЙ ПОДХОД - JSON WEB TOKEN - это стандарт на сегодняшний день. (сайт jwt.io)
// Там же можно разобрать хеш строку, кранящуюся в token.
// 123abс - уникальные данные, о которых говорилось выше
token = jwt.sign(data, '123abc');
console.log(token);
// при отрицательном резульате верификации выброситься исключение
let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded); // iat - время создания токена

// ОЧЕНЬ ВЫСОКОУРОВНЕВЫЙ ПОДХОД, нет нобходимости заботиться о salt, можно захешировать данные перед записью в базу.
let password = '123abc!';
// чем больше число, тем больше циклов,
// тем медленне будут выполняться метод (это помогаеты от атаки brute force).
// Мы добавляем соль к хешу пароля, чтобы нельзя было получить пароль методом перебора.
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});
// Проверяем верен ли пароль
let hashedPassword = '$2a$10$bs7RnRz6FqU3xjK1LtxdLegnVRi8EvEM9jbg/o85zhTsQW4wzuX5q';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});