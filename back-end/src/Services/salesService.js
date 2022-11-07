const { Sale, saleProduct, sequelize } = require('../database/models');

const getUtcDate = () => {
  const d = new Date();
  const utcDate = new Date(Date.UTC(d.getUTCFullYear(),
  d.getUTCMonth(), d.getUTCDate(),
  d.getUTCHours(),
  d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()));
  return utcDate;
};

const createSaleService = async (sales, orders) => {
  try {
    const trs = await sequelize.transaction(async (transaction) => {
      const { dataValues } = await Sale.create(
        { ...sales, saleDate: getUtcDate(), status: 'Pendente' }, { transaction },
      );
      const salesArray = orders.map(({ productId, quantity }) => ({
        saleId: dataValues.id,
        productId,
        quantity,
      }));

      await saleProduct.bulkCreate(salesArray, { transaction });
      return dataValues;
    });
    return { code: 201, data: trs };
  } catch (e) {
    return { code: 404, message: 'Can\'t create sale' };
  }
};

const findUserService = async (userId) => {
  if (!userId) {
    return { code: 404, message: 'User not found' };
  }
  const sales = await Sale.findAll({ where: { userId } });
  return { code: 200, sales };
};

module.exports = { createSaleService, findUserService };