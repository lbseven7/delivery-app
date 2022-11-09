const { 
  createSaleService, 
  findUserService, 
  findSellerService,
  findSalesProducts, 
} = require('../Services/salesService');

const createSaleController = async (req, res) => {
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    orders,
  } = req.body;
  const { code, message, data } = await createSaleService(
    { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
    orders,
);
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(data);
};

const findUserController = async (req, res) => {
  const { userId } = req.body;
  const { code, message, sales } = await findUserService(userId);
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(sales);
};

const findSellerController = async (req, res) => {
  const { userId } = req.body;
  const sellerId = userId;
  const { code, message, sales } = await findSellerService(sellerId);
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(sales);
};

const findSalesProductsController = async (req, res) => {
  const { id } = req.params;
  const { code, sales } = await findSalesProducts(id);

  return res.status(code).json(sales);
};

module.exports = {
  createSaleController, 
  findUserController,
  findSellerController,
  findSalesProductsController,
};