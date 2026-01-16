const Joi = require('joi');
const asyncHandler = require('../utils/asyncHandler');

const signupSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(64).required(),
  username: Joi.string().min(3).max(30).required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required()
});

const loginSchema = Joi.object({
  emailOrUsername: Joi.alternatives().try(
    Joi.string().email().lowercase(),
    Joi.string().min(3).max(30)
  ).required(),
  password: Joi.string().min(6).max(64).required()
});

const validateSignup = asyncHandler(async (req, _res, next) => {
  const result = await signupSchema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });
  req.validated = result;
  return next();
});

const validateLogin = asyncHandler(async (req, _res, next) => {
  const result = await loginSchema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });
  req.validated = result;
  return next();
});

module.exports = { validateSignup, validateLogin };
