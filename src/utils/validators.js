const Joi = require("joi");

const registerValidator = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  namaLengkap: Joi.string().required(),
});

const loginValidator = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().required(),
}).or("username", "email");

module.exports = { registerValidator, loginValidator };
