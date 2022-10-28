const { registerSchema } = require('../Schemas/register');

const registerMiddleware = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some valid fields are request' });
  }
  next();
};

module.exports = { registerMiddleware };