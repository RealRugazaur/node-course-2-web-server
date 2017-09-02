const _ = require('lodash');

let express = require('express');
let bodyParser = require('body-parser');
// body-parser - позволяет автоматически преобразовывать json
// в
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)){
    console.log('Not valid', id);
    return res.status(404).send();
  }

  Todo.findById(id).then((result) => {
    if (!(result)) {
      console.log('No such id', id);
      return res.status(404).send();
    }
    console.log('Return id ', id);
    return res.status(200).send({result});
  },(e) => {
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)){
    console.log('Not valid', id);
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
     if (!todo) {
       console.log('No such id', id);
       return res.status(404).send();
     }
    console.log('Delete id = ', id);
    return res.status(200).send({todo});
  }, (e) => {
    res.status(400).send(e);
  });

});

// PATCH - HTTP операция для обновления данных

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  // pick - принимает объект и свойства, которые вы хотите извлечь
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    console.log('Not valid', id);
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });


});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};