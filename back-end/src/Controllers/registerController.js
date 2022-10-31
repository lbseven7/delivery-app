const { registerService } = require('../Services/registerService');

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const { code, message, userInfo } = await registerService(name, email, password);

  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(userInfo);
};

module.exports = { registerController };