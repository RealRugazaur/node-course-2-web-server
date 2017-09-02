// Node.js USES AN EVENT-DRIVEN, NON-BLOCKING I/O MODEL THAT MAKES IT LIGHTWEIGHT AND EFFICIENT.
console.log('Starting app');
// Функция которая будет вызвана через столько-то милисикунд.
// Она не блокирует (NON-BLOCKING) поток выполнения - 'Finishing up' будет выведено
// раньше 'Inside of callback'.
setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('Zero delay');
}, 0); // 'Finishing up' будет выведено раньше 'Zero delay'.
// Почему?
// Основные составляющие 'выполнения программы на node.js' :
// 1) |CALL STACK| - структура данных, содержит иформацию о выполнении программы. (Выполняемые функции, выражения).
// Если программа асинхронная, в работу включаются следующие компонениты :
// 2) |NODE APIs| - здесь регистрируются события и соответсвующие функции обратного вызова. Здесь же, например,
// отсчитывается timeout. В это время параллельно работает Call Stack.
// 3) Когда событие возникло (истек timeout например) готовая к выполнению callback функция добавляется
// в |CALLBACK QUEUE|.
// 4) Функции CALLBACK QUEUE, ждут пока CALL STACK станет пустым, чтобы начать выполнение.
// |EVENT LOOP| как раз осуществляет этот мониторинг CALL STACK и запускает функции из CALLBACK QUEUE.

// Как все это работает вместе можно посмотреть в видео 3 части 4 курса Udemy (Call Stack & Event loop).

console.log('Finishing up');


