const indexRouter = require('express').Router();
const errorRouter = require('./userError');
const usersRouter = require('./users');

// user
indexRouter.use('/', usersRouter);

// route error
indexRouter.use('/', errorRouter);

module.exports = indexRouter;
