const { createSaleService, findUserService } = require('../Services/salesService');

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

module.exports = { createSaleController, findUserController };