const registerRouter = require('express').Router();
const { createUser } = require('../controllers/users');
const { registerValidator } = require('../middleware/celebrateValidators');

registerRouter.post('signup', registerValidator, createUser);

module.exports = registerRouter;
