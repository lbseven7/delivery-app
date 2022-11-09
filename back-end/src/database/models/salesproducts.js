module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    quantity: DataTypes.INTEGER,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'sales_products'
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, { 
      through: SaleProduct, 
      foreignKey: 'saleId', 
      otherKey: 'productId',
      as: 'sales'
    });
    models.Product.belongsToMany(models.Sale, { 
      through: SaleProduct, 
      foreignKey: 'productId', 
      otherKey: 'saleId',
      as: 'products'
    });
  }
  return SaleProduct;
};