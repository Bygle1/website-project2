const Joi = require("joi");

const signupRules = {
  email: Joi.string().email().min(2).max(30).required(),
  name: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
};

const loginRules = {
  email: Joi.string().email().min(2).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
};

const singupSchema = Joi.object(signupRules);
const loginSchema = Joi.object(loginRules);

module.exports = {
  singupSchema,
  loginSchema,
};
