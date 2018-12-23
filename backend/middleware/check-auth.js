const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'you_better_be_studying');
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token incorrect',
      error: error
    });
  }
};
