const { Router } = require('express');
const { auth } = require('../Middlewares/auth');
const { createSaleController, findUserController } = require('../Controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', auth, createSaleController);
salesRouter.get('/', auth, findUserController);

module.exports = { salesRouter };