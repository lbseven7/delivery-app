const { Router } = require('express');
const { registerController } = require('../Controllers/registerController');
const { registerMiddleware } = require('../Middlewares/registerMiddleware');

const regRouter = Router();

regRouter.post('/', registerMiddleware, registerController);

module.exports = { regRouter };