const md5 = require('md5');
const { Op } = require('sequelize');
const { user } = require('../database/models');

const registerService = async (name, email, password, role = 'customer') => {
  const findUser = await user.findOne({
    where: {
      [Op.or]: [
        { name },
        { email },
      ],
    },
  });
  
  if (findUser) {
    return {
      code: 409,
      message: 'User already registered',
    };
  }
  const pass = md5(password);    
  const result = await user.create({ name, email, password: pass, role });

  return { code: 201, result };
};
module.exports = { registerService };