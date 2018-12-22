const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/post', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post
    .save()
    .then()
    .catch();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fa336h',
      title: 'first server side post',
      content: 'coming from the server'
    },
    {
      id: 'qa736h',
      title: 'second server side post',
      content: 'coming from the server@'
    },
    {
      id: 'mj764q',
      title: 'third server side post',
      content: 'coming from the server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
