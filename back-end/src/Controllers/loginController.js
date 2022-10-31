const { loginService } = require('../Services/loginService');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { code, message, userInfo } = await loginService(email, password);

  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(userInfo);
};

module.exports = { loginController };