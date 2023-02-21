const { NOT_FOUND_ERROR_CODE } = require('./errorCodes');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
};
