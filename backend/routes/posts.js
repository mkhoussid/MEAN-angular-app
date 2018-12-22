const express = require('express');

const router = express.Router();

const Post = require('../models/post');

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

//put or patch
router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: `Successfully updated ${req.params.id}` });
  });
});

router.get('', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents //you can do res.map() because mongodb has '__id', but our structure has 'id'
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: `Post with ID: ${req.params.id} not found!` });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res
      .status(200)
      .json({ message: `Post with ID: ${req.params.id} deleted!` });
  });
});

module.exports = router;
