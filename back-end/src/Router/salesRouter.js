const { Router } = require('express');
// const { loginMiddleware } = require('../Middlewares/loginMiddleware');
const { createSaleController } = require('../Controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', createSaleController);

module.exports = { salesRouter };