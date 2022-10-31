const { Router } = require('express');
const { productController } = require('../Controllers/productController');

const prodRouter = Router();

prodRouter.get('/', productController);

module.exports = { prodRouter };