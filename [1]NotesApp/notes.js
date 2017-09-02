console.log('Starting notes.js');

//console.log(module);
// module.exports.add = (a, b) => {
//   return a + b;
// };
//module.exports - содержит все, что будет импортировано.

//
const fs = require('fs');

let fetchNotes = () => {

  try {
    // Чтение из файла
    let notesString = fs.readFileSync('./Notes/notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }

};

let saveNotes = (notes) => {
  fs.writeFileSync('./Notes/notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  // Отфильтровать массив, если метод для очередного элемента
  // вернет true, то он будет добавлен в отфильтрованный массив.
  let duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    // запись в файл
    saveNotes(notes);
    return note;
  }
};

let getAll = () => {
  return fetchNotes();
};

let getNote = (title) => {
  let notes = fetchNotes();
  let fetchedNodes = notes.filter((note) => note.title === title);
  return fetchedNodes[0]; // если массив пустой, вернет undefined

};

let removeNote = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  if (notes.length === filteredNotes.length){
    return false;
  } else {
    return true;
  }
};

let logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote, // в ES6 идентично 'addNode: addNode'
  getAll,
  getNote,
  removeNote,
  logNote
};

