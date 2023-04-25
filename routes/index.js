const indexRouter = require('express').Router();
const postsRouter = require('./posts');
const errorRouter = require('./userError');
const usersRouter = require('./users');

// user
indexRouter.use('/', usersRouter);

// post
indexRouter.use('/', postsRouter);

// route error
indexRouter.use('/', errorRouter);

module.exports = indexRouter;
