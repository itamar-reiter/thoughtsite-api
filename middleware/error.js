module.exports = (err, req, res, next) => {
  console.log('in error middleware');
  console.log(err.message);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server (through middleware)'
        : message,
    });
};
