const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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
