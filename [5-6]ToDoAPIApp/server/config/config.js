let env = process.env.NODE_ENV || 'development'; // Переменная окружения, установленная в heroku как "production"
// Локально мы устанавливаем её в package.json (export - для UNIX и SET для Windows
console.log('env ****', env);

// Использовать разные баззы данных для тестов и собственно пиложения
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}