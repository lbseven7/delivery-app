const { QueryTypes } = require('sequelize');
const { Sale, SaleProduct, sequelize } = require('../database/models');

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

      await SaleProduct.bulkCreate(salesArray, { transaction });
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

const findSellerService = async (sellerId) => {
  if (!sellerId) {
    return { code: 404, message: 'Seller not found' };
  }
  const sales = await Sale.findAll({ where: { sellerId } });
  return { code: 200, sales };
};

const findSalesProducts = async (id) => {
  const sales = await sequelize.query(
    `SELECT sp.quantity, sp.sale_id as saleId, p.name as productName, p.price, 
    s.sale_date as saleDate, s.status, s.total_price as totalPrice, u.name
    FROM sales_products AS sp
    INNER JOIN sales AS s 
    INNER JOIN products as p
    INNER JOIN users as u 
    on sp.sale_id = ? and s.id = ? and p.id = sp.product_id  and u.id = s.seller_id
    `,
    {
      replacements: [id, id],
      type: QueryTypes.SELECT,
    },
  );

  return { code: 200, sales };
};

module.exports = { createSaleService, findUserService, findSellerService, findSalesProducts };
