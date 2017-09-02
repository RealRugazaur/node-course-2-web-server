// РАБОТА С JSON ФАЙЛАМИ

let obj = {
  name: 'Andrew'
};
var stringObj = JSON.stringify(obj); // Преобразуем объект в строку json формата.
console.log(typeof stringObj);
console.log(stringObj);

let personString = '{"name": "Andrew", "age": 25}';
let personObj = JSON.parse(personString); // Создаем объект на основе json
console.log(typeof personObj);
console.log(personObj);

// ---

const fs = require('fs');

let originalNote = {
  title: 'Some title',
  body: 'Some body'
};

let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json',originalNoteString);

let noteString = fs.readFileSync('notes.json');
let noteObj = JSON.parse(noteString);

console.log(typeof noteObj);
console.log(noteObj.title);
