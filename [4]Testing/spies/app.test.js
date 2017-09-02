const expect = require('expect');
const rewire = require('rewire');

// rewire делает то же, что и require, но добавляет к app
// два метода app.__set__ и app.__get__
let app = rewire('./app');


// Spies - методы заглушки реальных методов,
// исполльзуются в тестировании. Например вместо
// правильности работы метода, мы проверяем само наличие вызова с корректным аргуметами.
// (для понадобиться установить еще один модуль - rewire
describe('App', () => {
  let db = {
    saveUser: expect.createSpy()
  };
  // Подменяем объект db 'пустышкой'
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    let spy = expect.createSpy();
    spy('Andrey', 25);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Andrey', 25);
  });

  it('should call saveUser with user object', () => {
    let email = 'andrew@example.com';
    let password = '123abs';

    app.handleSignUp(email, password);
    // Эта строка не работает, почему?
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});


