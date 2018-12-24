const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully',
        post: {
          id: createdPost._id,
          title: createdPost.title,
          content: createdPost.content,
          imagePath: createdPost.imagePath

          /*
          or you could always do,
          post: {
            ...createdPost,
            id: createdPost._id,
        */
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Creating post ' + req.body.title.substring(0, 10) + ' failed',
        error: err
      });
    });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result.n > 0) {
        res
          .status(200)
          .json({ message: `Successfully updated ${req.params.id}` });
      } else {
        res.status(401).json({
          message: `Not authorized to update PostID: ${req.params.id}`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Failed to update PostID: ${req.params.id}`,
        error: err
      });
    });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize; //params are strings by default, we need numeric values, so add '+'
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: fetchedPosts, //you can do res.map() because mongodb has '__id', but our structure has 'id'
        maxPosts: count //send this to front end so pagination knows
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to fetch posts',
        error: err
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: `Post with ID: ${req.params.id} not found!` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed to fetch post with ID: ' + req.params.id,
        error: err
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res
          .status(200)
          .json({ message: `Post with ID: ${req.params.id} deleted!` });
      } else {
        res.status(401).json({
          message: `Failed to delete Post with ID: ${req.params.id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong!',
        error: err
      });
    });
};
