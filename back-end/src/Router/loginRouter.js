const { Router } = require('express');
const { loginMiddleware } = require('../Middlewares/loginMiddleware');
const { loginController } = require('../Controllers/loginController');

const loginRouter = Router();

loginRouter.post('/', loginMiddleware, loginController);

module.exports = { loginRouter };