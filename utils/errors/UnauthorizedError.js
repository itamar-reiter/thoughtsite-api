const { UNAUTHORIZED_ERROR_ERROR_CODE } = require('./errorCodes');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_ERROR_CODE;
  }
};
