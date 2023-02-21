const NotFoundError = require('../utils/errors/NotFoundError');

const getUserError = (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
};

module.exports = getUserError;
