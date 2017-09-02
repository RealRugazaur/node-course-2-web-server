// Вместо Window в nodejs содержиться глобальный объект global.
// process - в каком-то смысле аналог document, это процесс
// в котором выполняется nodejs приложение.
//
// У nodejs есть одна важная особенность, не смотря на то, что все
// приложения в nodejs однопоточные они обладают неблокирующим вводом выводом.
// Это значит, что так же как и в многопоточных приложениях
// можно выполнять несколько задач одновременно, правда никие потоки
// создавать не нужно, мы простно назначаем обработчки событий, об остальном
// заботиться nodejs.

// require - позволяет загружать модули, по сути библиотеки в javascript.
const fs = require('fs'); // Модуль работы с файлами
const os = require('os'); // Модуль работы с ОС

const notes = require('./notes.js'); // Мой файл, он запуститься во время импортирования, как видно в консоли.

let intro = false; // Вводная иформация

if (intro) {
  console.log('****');
  console.log('Starting app.js');

// Данные о пользователе
  let user = os.userInfo();

  console.log("Используем методы из внешненго файла");
// let res2 = notes.add(-2, 9);
// console.log(res2);

//1. первый способ ассинхронного вызова

  fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}. `, function (err) {
    if (err) {
      console.log('Unable to write to file');
    }
  });
  
//2. второй способ ассинхроннго вызова
  fs.appendFileSync('greetings.txt',`Hello Again.\n`);

// В файле package.json указываются те third party модули, которые будут установлены. Этот файл можно создать
// вызвав команду npm init. Обновлятся он будет при вызове команды типа 'npm install <packagename> --save'
// --save - обновить package.json, чтобы набор библиотек можно было восстановить.

// папка node_modules - это сгенерированный код во время установки, его стоит удалить, когда выкладываешь на git т.к.
// содержимое папки зависит от версии npm и её лучше создавать на локальной машине, к тому же
// это уменьшает размер проекта на git.
// при необходимости эту папку можно восстановить набрав npm install
// (будут загружены все модули из свойства dependencies в файле package.json).

  const _ = require('lodash'); // Полезная сторонняя библиотека.
  console.log();
  console.log(' Является ли строкой : ');
  console.log(_.isString(true));
  console.log(_.isString('string'));

// Удалить дубликаты
  console.log();
  let filteredArray = _.uniq(['Andrew', 1, 'Andrew', 1, 2, 3, 4]);
  console.log(' Удалить дубликаты : ');
  console.log(filteredArray);

// * nodemon - модуль, который позволяет автоматически перезапускать
// приложение в командной строке при вненсении изменений в файл.
// установить его можно так npm install -g (-g - global, уснатовнить глобально для всей машины)
// после этого файлы можно запускать не через node, а через nodemon тем самым запускать маниторинг а ля sass.
}

console.log();
// Получение аргументов командной строки
// yargs - полезный пакет, упрощающий работы с аргументами командной строки типа
// --title="secret", --title=secret, --title "secret"
const yargs = require('yargs');

const title = {
  describe: 'Title of note', // Описание
  demand: true, // Обязательность атрибута
  alias: 't' // псевдоним для '--title' равный '-t'
};

const body = {
  describe: 'The body of the node',
  demand: true,
  alias: 'b'
};

// Указываем доступную для вызова команду при вызове из терминала.
// 1. Название 2. Описание 3. требуемые атрибуты
const argv = yargs
  .command('add','Add a new note',{
    title,
    body
  })
  .command('list','List all notes')
  .command('read','Read a note', {title})
  .command('remove','Remove a note', {title})
  .help() // Позволяет добавить --help к вызову и получить ифнормацию о командах
  .argv;

console.log('Стандартный Process.argv : ', process.argv);
console.log('Сторонний модуль Yargs.argv : ', argv);
console.log('****');
console.log();

let command = argv._[0]; // Название команды
console.log('====');
console.log('Command : ', command);

if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);
  if (note !== undefined) {
    console.log('Node created');
    notes.logNote(note);
  } else {
    console.log(`Title '${argv.title}' is already in use.`);
  }

} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  for (let note of allNotes){
    notes.logNote(note);
  }
} else if (command === 'remove') {
  let removed = notes.removeNote(argv.title);
  let mes =
    removed ? `Note was removed` : `Note with title '${argv.title}' is not found.`;
  console.log(mes);

} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log(`Note is not found.`);
  }

} else {
  console.log('Command not recognized');

}
console.log('====');