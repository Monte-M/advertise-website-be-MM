const joi = require('joi');

async function validateRegister(req, res, next) {
  console.log('body got to validate:', req.body);
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
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
};
