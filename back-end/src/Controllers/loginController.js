const loginService = require("../Services/loginService");

const loginController = async (req, res) => {
  const user = await loginService();
  return res.json(user);
  // return res.status(code).json();
};

module.exports = loginController;