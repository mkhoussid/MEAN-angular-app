const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: `User with email ${req.body.email} created`,
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `Email ${req.body.email} already exists`,
          error: err
        });
      });
  });
});

router.post('/login', (req, res, next) => {
  let _user;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: `Email ${req.body.email} does not exist in system`
        });
      }
      _user = user;
      return bcrypt.compare(req.body.password, user.password); //compare return a promise
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: `Incorrect password for ${req.body.email}`
        });
      }
      const token = jwt.sign(
        { email: _user.email, userId: _user._id },
        'you_better_be_studying',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        message: `${_user.email} successfully logged in`,
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Authentication failed',
        error: err
      });
    });
});

module.exports = router;

// store like this if you dont want to hash / encrypt passwords

// router.post('/signup', (req, res, next) => {
//   const user = new user({
//     email: req.body.email,
//     password: req.body.password
//   })
// });
