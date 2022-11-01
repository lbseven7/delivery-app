const { Router } = require('express');
const { productController } = require('../Controllers/productController');
const { auth } = require('../Middlewares/auth');

const prodRouter = Router();

prodRouter.get('/', auth, productController);

module.exports = { prodRouter };