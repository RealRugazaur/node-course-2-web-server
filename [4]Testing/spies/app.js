// Здесь важно не использовать const, а то тест не сработает
let db = require('./db.js');

module.exports.handleSignUp = (email, password) => {
  // check if email already exists
  db.saveUser({email,password});
  // Send the welcome email
};