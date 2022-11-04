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
    underscored: true,
    timestamps: false,
    tableName: 'sales_products'
  });

  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Sale, { 
      through: saleProduct, 
      foreignKey: 'saleId', 
      otherKey: 'productId',
      as: 'sales'
    });
    models.Product.belongsToMany(models.Product, { 
      through: saleProduct, 
      foreignKey: 'productId', 
      otherKey: 'saleId',
      as: 'products'
    });
  }
  return saleProduct;
};