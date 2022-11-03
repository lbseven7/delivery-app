require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtKey = require('fs')
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '45min' };

const createToken = (payload) => {
  const token = jwt.sign(payload, jwtKey, JWT_CONFIG);
  return token;
};

const verifyToken = (token) => {
  const dados = jwt.verify(token, jwtKey);
  return dados;
};

module.exports = { createToken, verifyToken };