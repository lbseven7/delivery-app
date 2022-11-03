const md5 = require('md5');
const { createToken } = require('../helpers/tokenHelper');
const { User } = require('../database/models');

const loginService = async (email, password) => {
  const checkedUser = await User.findOne({ where: { email } });
  if (!checkedUser) {
    return { code: 404, message: 'User not found' };
  }

  const md5Password = md5(password);
  if (checkedUser.password !== md5Password) {
    return { code: 401, massage: 'Invalid password' };
  }

  const token = createToken({ 
    email: checkedUser.email, 
    id: checkedUser.id,
  });

  const userInfo = { 
    ...checkedUser.dataValues, 
    token,
  };

  return { code: 200, userInfo };
};

module.exports = { loginService };