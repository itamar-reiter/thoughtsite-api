const loginRouter = require('express').Router();
const { login } = require('../controllers/users');
const { loginValidator } = require('../middleware/celebrateValidators');

loginRouter.post('/signin', loginValidator, login);

module.exports = loginRouter;
