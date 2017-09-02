const express = require('express');

var app = express();


app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.'
  });
});

app.get('/users', (req, res) => {
  res.send(["Andrey","None","Somebody","Friend"])
});

app.listen(4000);

module.exports.app = app;