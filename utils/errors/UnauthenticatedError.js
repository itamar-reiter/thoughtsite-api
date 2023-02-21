const { UNAUTHENTICATED_ERROR_ERROR_CODE } = require('./errorCodes');

module.exports = class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHENTICATED_ERROR_ERROR_CODE;
  }
};
