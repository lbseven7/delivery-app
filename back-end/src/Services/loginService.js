const { user } = require('../database/models')

const loginService = async () => {
  const users = await user.findAll();
  return users;
}

module.exports = loginService;