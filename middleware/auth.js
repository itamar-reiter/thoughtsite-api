const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthenticatedError = require('../utils/errors/UnauthenticatedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log("through auth middleware, no authorization or authorization isn't JWT");
    throw new UnauthenticatedError('Authorization required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'not-so-secret-string');
  } catch (err) {
    console.log('through auth middleware, jwt payload not loaded');
    next(new UnauthenticatedError('Authorization required'));
  }
  req.user = payload;
  next();
};
