const { loginSchema } = require('../Schemas/login');

const loginMiddleware = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some valid fields are request' });
  }
  next();
};

module.exports = { loginMiddleware };