const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new user({
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

module.exports = router;

// store like this if you dont want to hash / encrypt passwords

// router.post('/signup', (req, res, next) => {
//   const user = new user({
//     email: req.body.email,
//     password: req.body.password
//   })
// });
