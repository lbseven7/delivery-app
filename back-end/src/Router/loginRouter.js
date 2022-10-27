const { Router } = require('express');
const loginController = require('../Controllers/loginController');

const loginRouter = Router();

loginRouter.post('/', (req, res) => loginController(req, res));

module.exports = loginRouter;