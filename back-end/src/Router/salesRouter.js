const { Router } = require('express');
const { auth } = require('../Middlewares/auth');
const { createSaleController } = require('../Controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', auth, createSaleController);

module.exports = { salesRouter };