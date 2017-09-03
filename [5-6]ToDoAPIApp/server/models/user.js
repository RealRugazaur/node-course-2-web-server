let {mongoose}  = require('../db/mongoose');
let validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      }, // или validator: validator.isEmail
      message: '{VALUE} is not a valid email.'
    }
  },
  password:{
    type: String,
    require: true,
    minlength: 6
  },
  // Особая шняга для авторизации, применима только к noSQL базам.
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
// Переписываем встроенные в mongoose метод toJSON
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Функция экземпляра
UserSchema.methods.generateAuthToken = function () {
  // Используем обычную функцию, чтобы захватить this
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({
    access, token
  });

  return user.save().then(() => {
    // Здесь я возвращаю не Promise, а значение
    // похоже это нормально
    return token;
  });
};

let User = mongoose.model('User', UserSchema);
//
// let newUser = new User({email: 'andrew@example.com  '});
//
// newUser.save().then((doc)=>{
//   console.log('Saved todo2 :', doc);
// }, (e) => {
//   console.log(e);
// });

module.exports = {User};