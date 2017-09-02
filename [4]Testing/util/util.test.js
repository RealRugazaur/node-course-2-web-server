// expect библеотека для тестрирования,
// позаоляет использовать выражения вроде assert
const expect = require('expect');

const utils = require('./util');

// Mocha - плагин для модульного тестирования
// его стоит устанавливать с ключом --save-dev(в не --save), так
// он не понадобиться в версии для развертывания

//   Если будет выброшено исключение, тест провален

it('should add two numbers', () => {
  let res = utils.add(33, 11);

  //   throw new Error(`Expected 44, but got ${res}`);
  // }
  // То же самое, но проще, при помощи expect :

  expect(res).toBe(44).toBeA('number');

});

it('should square a number', () => {
  let res = utils.square(3);
  // if (res !== 9){
  //   throw new Error(`Expected 4, but got ${res}`);
  // }
  expect(res).toBe(9).toBeA('number');
});


it('should expect some value', () => {
  expect(12).toNotBe(11);
  // Для сравнения объектов нужно исопльзовать не toBe или toNoteBe, а toEqual или toNotEqual
  expect({name: 'Andrew'}).toEqual({name: 'Andrew'});

  // Проверить, что массив содержит или не содержит значение.
  expect([2,3,4]).toInclude(3);
  expect([2,3,4]).toExclude(1);
  expect({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }).toInclude({
    age: 25
  }).toExclude({
    age: 23
  });

});


it('should verify first and last names are set', () => {
  let obj = {age: 25};
  let user = utils.setName(obj, "Andrew Gurin");

  expect(user).toBeA('object').toInclude({
    firstName: "Andrew",
    lastName: "Gurin"
  });
});

// Тестирование асинхронных функций
it('shoud async add two number', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7).toBeA('number');
    // Указываем что это асинхронный тест и заставлям mocha ждать вызов done
    // Если этого не зделать, тест пройдет не зависмио от значения sum
    done();
  });
});

it('shoud async aquare a number', (done) => {
  utils.asyncSquare(4, (square) => {
    expect(square).toBe(16).toBeA('number');
    // Указываем что это асинхронный тест и заставлям mocha ждать вызов done
    // Если этого не зделать, тест пройдет не зависмио от значения sum
    done();
  });
});

// nodemon при помощи ключа --exec позволяет при автоматическом презапуске выполнять команду
// это полезно для тестирования, nodemon --exec "npm test"
// можно все это добавить в scripts файла package.json -> "test-watch": "nodemon --exec \"npm test\""