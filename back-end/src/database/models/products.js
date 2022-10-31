module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    urlImage: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.saleProduct, {
      through: models.saleProduct, 
      foreignKey: 'productId', 
      as: 'product' 
    });
  }

  return Product;
};