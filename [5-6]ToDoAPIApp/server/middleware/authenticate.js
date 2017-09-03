var {User} = require('./../models/user');

// Добавяем middleware
let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  // Найти пользователя по токену.
  User.findByToken(token).then((user) => {
    if (!user) {
      // Автоматически перейти к блоку catch
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};