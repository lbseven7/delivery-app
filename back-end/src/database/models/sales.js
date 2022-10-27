module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
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
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user, { 
      foreignKey: 'userId', 
      as: 'users' 
    });
    Sale.belongsTo(models.user, { 
      foreignKey: 'sellerId', 
      as: 'sellers' 
    });
  }

  return Sale;
};