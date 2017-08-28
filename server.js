// experss, один из самых популярный фреймоворков node.js, позволяет создать web server
const express = require('express');
// hbs, модуль позволяющий использовать Handlebars в качестве view engine.
const hbs = require('hbs');
const fs = require('fs');

// heroku - позволяет развернуть git проект в облаке, подробнее в лекциях 4.7 - 4.10.
// Нет смысла это конспектировать, т.к. на примере будет понятнее.

// берем значенение порта из environment variable PORT, эту перменную назначит
// heroku при развертывании. Устанавлием порт 3000 если запускаем прогу на локальной машине
const port = process.env.PORT || 3000;

let app = express();
// partials - части разментки, которые используются на нескольких страницах
hbs.registerPartials(__dirname + '/views/partials');

// Настройка express
app.set('view engine', 'hbs');

// Запуск nodemon с отслеживанием как .js так и .hbs файлов.
// nodemon server.js -e js,hbs

// middleware - промежуточное ПО.
// Настраиваем middleware, что то вроде аддонов для express.
// Можно воспринимать просто как конфигурацию express

// app.use - региструет middleware и принимает функцию в качестве аргумента.
// Каждый раз, когда отправляется запрос к серверу, вызывается middleware функция.
// middleware функции выполняются в порядке объявления
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
  // если не вызвать next, сервер не вызовит остальные middleware
  // не продолжит обработку запроса
  // и не буедет отвечать на запросы.
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
// теперь можно запрашивать файл help.html из браузера.
// __dirname дирректория запуска сервера (выражения вроде ./ здесь не поддерживаются)


// Зарегестрированные функции можно вызывать прямо из .hbs файлов,
// избавляя от необходимости вызывать их здесь.
// (см ниже закоментированное свойство : ...currentYear:new Date().getFullYear()...)
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
// передача параметров
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



// Set up a handlers for different routs
app.get('/', (req, res) => {
  // req - http запрос
  // res - объект, позволяющий отправить ответ

  // res.send('<h1>Hello Express!</h1>');
  // res.send({name: 'Andrew', likes: ['Programming']});

  res.render('home.hbs', {
    pageTitle: 'Some web page',
    message: 'Some Message',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  // Используем static page rendering при помощи Handlebars
  res.render('about.hbs', {
    pageTitle: 'About page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({error: 'Error'});
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    pageTitle: 'Portfolio',
    message: 'Portfolio page here',
  })
});

// Связать приложение с портом.
// Оно запуститься и не завершит свою работу
// пока это не сделать вручную или пока не произойдет ошибка.
app.listen(port, () => {
  // Данная функция будет вызвана, как только сервер запуститься
  console.log(`Server is up in port ${port}`);
}); // localhost:3000

