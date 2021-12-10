const joi = require('joi');

async function validateRegister(req, res, next) {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    city: joi.string().min(3).required(),
    phone_number: joi.string().min(8).required(),
    image: joi.string().required(),
    password: joi.string().min(6).required(),
    password2: joi.string().min(6).required().valid(joi.ref('password')),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.warn(error);
    res.status(400).send({
      error: error.details.map((e) => ({
        errorMsg: e.message,
        field: e.context.key,
      })),
    });
    return false;
  }
}

async function validateLogin(req, res, next) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.warn(error);
    res.status(400).send({
      error: error.details.map((e) => ({
        errorMsg: e.message,
        field: e.context.key,
      })),
    });
    return false;
  }
}

module.exports = {
  validateRegister,
  validateLogin,
};
