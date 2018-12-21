const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('a');
  next();
});
app.use((req, res, next) => {
  res.send('second');
});

module.exports = app;
