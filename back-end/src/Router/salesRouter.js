const { Router } = require('express');
const { auth } = require('../Middlewares/auth');
const {
  createSaleController,
  findUserController,
  findSellerController,
  findSalesProductsController,
} = require('../Controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', auth, createSaleController);
salesRouter.get('/', auth, findUserController);
salesRouter.get('/seller', auth, findSellerController);
salesRouter.get('/orders', auth, findSalesProductsController);

module.exports = { salesRouter };