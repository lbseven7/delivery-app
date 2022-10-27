const { Router } = require('express');
const loginRouter = require('./loginRouter');

const mainRouter = Router();

mainRouter.use('/login', (req, res) => loginRouter(req, res));

module.exports = mainRouter;