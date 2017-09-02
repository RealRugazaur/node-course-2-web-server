// Вот как примерно работают все функции с callback
// Всегда присутсвует какая-то задержка
let getUser = (id, callback) => {
  let userObj = {
    id,
    name: 'Vikram'
  };
  setTimeout(()=> {
    callback(userObj);
  }, 2000);
};

getUser(111, (user) => {
  console.log(user);
});