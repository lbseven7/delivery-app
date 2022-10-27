module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('saleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });

  saleProduct.associate = (models) => {
    models.sale.belongsToMany(models.sale, { 
      through: saleProduct, 
      foreignKey: 'saleId', 
      otherKey: 'productId',
      as: 'sales'
    });
    models.product.belongsToMany(models.product, { 
      through: saleProduct, 
      foreignKey: 'productId', 
      otherKey: 'saleId',
      as: 'products'
    });
  }

  return saleProduct;
};