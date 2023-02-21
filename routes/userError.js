const errorRouter = require('express').Router();
const getUserError = require('../controllers/userError');

errorRouter.use('*', getUserError);

module.exports = errorRouter;
