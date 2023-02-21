const { INVALID_DATA_ERROR_CODE } = require('./errorCodes');

module.exports = class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INVALID_DATA_ERROR_CODE;
  }
};
