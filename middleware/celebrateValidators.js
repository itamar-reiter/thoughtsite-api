const { celebrate, Joi } = require('celebrate');

// mongoose default id
const mongooseDefaultIdValidator = Joi.string().alphanum().length(24);

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const idValidator = celebrate({
  body: Joi.object().keys({
    id: mongooseDefaultIdValidator,
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
  idValidator,
};
