const md5 = require('md5');
const { Op } = require('sequelize');
const { createToken } = require('../helpers/tokenHelper');
const { User } = require('../database/models');

const registerService = async (name, email, password, role = 'customer') => {
  const findUser = await User.findOne({
    where: { [Op.or]: [{ name }, { email }] },
  });
  
  if (findUser) {
    return {
      code: 409,
      message: 'User already registered',
    };
  }
  const pass = md5(password);    

  const result = await User.create({ name, email, password: pass, role });

  const token = createToken({ id: result.id, email: result.email });

  const userInfo = { ...result.dataValues, token };
  return { code: 201, userInfo };
};

module.exports = { registerService };