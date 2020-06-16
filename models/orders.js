'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    
  });
  orders.associate = function(models) {
    // associations can be defined here
    
    orders.belongsTo(models.Customer, {
      as: 'Customer'
    })

    orders.belongsTo(models.providers, {
      foreign: 'provider'
    })

    orders.belongsTo(models.orderTypes, {
      as: 'orderType'
    })

    orders.belongsToMany(models.products, {through: 'orderDetails'})

    orders.hasMany(models.orderDetails, {
      as: 'order'
    })

  };
  return orders;
};