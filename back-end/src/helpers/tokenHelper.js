require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'trybe';
const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '45min' };

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
  return token;
};

const verifyToken = (token) => {
  const dados = jwt.verify(token, JWT_SECRET);
  return dados;
};

module.exports = { createToken, verifyToken };