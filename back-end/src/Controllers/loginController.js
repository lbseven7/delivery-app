const { loginService } = require('../Services/loginService');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { code, message, token } = await loginService(email, password);
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ token });
};

module.exports = { loginController };