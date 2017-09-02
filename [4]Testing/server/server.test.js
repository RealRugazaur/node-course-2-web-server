const request = require('supertest');
// Добаляем expect, чтобы можно было использовать вещи типа Include
const expect = require('expect');
// supertest - плагин для тестирования express

let app = require('./server').app;

// describe - часть mocha, позволяет создать группу тестов.
// describe блоки можно вкладывать друг в друга
// В JetBrains их можно запускать оддновременно, а в консоли
// они будут выделены отступами.
describe('Server',() =>{
  describe('Get /',() =>{
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        // Это expect из модуля supertest
        .expect(404) // ошидаемый status code
        .expect({
          error: 'Page not found.'
        })
        .expect((res) => {
          // проверяем http ответ
          // Это метод expect из модуля expect
          expect(res.body).toInclude({
            error: 'Page not found.'
          });
        })
        //.expect('Hello world!')
        .end(done);
    });
  });

  describe('Get /users',() =>{
    it('should return me in users', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude("Andrey");
        })
        .end(done);
    });
  });
});


