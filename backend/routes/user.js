const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

module.exports = router;

// store like this if you dont want to hash / encrypt passwords

// router.post('/signup', (req, res, next) => {
//   const user = new user({
//     email: req.body.email,
//     password: req.body.password
//   })
// });
