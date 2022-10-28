const { Router } = require('express');
const { loginRouter } = require('./loginRouter');
const { regRouter } = require('./registerRouter');

const mainRouter = Router();

mainRouter.use('/login', (req, res) => loginRouter(req, res));
mainRouter.use('/register', (req, res) => regRouter(req, res));

module.exports = { mainRouter };