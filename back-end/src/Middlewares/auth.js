const { verifyToken } = require('../helpers/tokenHelper');

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const { id } = verifyToken(token);
    req.userId = id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { auth };