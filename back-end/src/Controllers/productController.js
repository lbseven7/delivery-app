const { productService } = require('../Services/productService');

const productController = async (req, res) => {
  const { code, data } = await productService();

  return res.status(code).json(data);
};

module.exports = { productController };