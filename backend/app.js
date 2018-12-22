const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster1-yyswf.mongodb.net/ng6?retryWrites=true'
  )
  .then(() => {
    console.log('connected PASSED!');
  })
  .catch(() => {
    console.log('connection FAILED!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS, PUT'
  );
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
