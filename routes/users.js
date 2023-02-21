const usersRouter = require('express').Router();
const { idValidator } = require('../middleware/celebrateValidators');
const { getUserData } = require('../controllers/users');

usersRouter.get('/users/me', idValidator, getUserData);

module.exports = usersRouter;
