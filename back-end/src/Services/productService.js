const { Product } = require('../database/models');

const productService = async () => {
  const data = await Product.findAll();

  return { code: 200, data };
};

module.exports = { productService };