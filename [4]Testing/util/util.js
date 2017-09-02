module.exports.add = (a, b) => {
  return a + b;
};

module.exports.square = (x) => x * x;

module.exports.setName = (user, fullName) => {
  let names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
  // К слову
  // если бы тест выполнялся дольше 2 секунд, mocha выдаст
  // предупреждение
};
module.exports.asyncSquare = (a, callback) => {
  setTimeout(() => {
    callback(a * a);
  }, 1000);
};