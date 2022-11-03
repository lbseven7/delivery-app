const { createSaleService } = require('../Services/salesService');

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

module.exports = { createSaleController };