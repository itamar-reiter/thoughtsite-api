const { CONFLICT_ERROR_ERROR_CODE } = require('./errorCodes');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_ERROR_CODE;
  }
};
