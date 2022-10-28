module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    userId: DataTypes.INTEGER,
    sallerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAdress: DataTypes.STRING,
    deliveryAdress: DataTypes.STRING,
    saleDate: DataTypes.STRING,
    status: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'sales'
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'users' 
    });
    Sale.belongsTo(models.User, { 
      foreignKey: 'sellerId', 
      as: 'sellers' 
    });
  }

  return Sale;
};