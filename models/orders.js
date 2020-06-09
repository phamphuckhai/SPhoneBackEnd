'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
  }, {
    
  });
  orders.associate = function(models) {
    // associations can be defined here
    orders.hasOne(models.orderDetails, {
      as: 'order'
    })

    orders.belongsTo(models.Customer, {
      foreignKey: 'customer'
    })

    orders.hasOne(models.providers, {
      as: 'provider'
    })

    orders.belongsTo(models.orderTypes, {
      foreignKey: 'type'
    })

  };
  return orders;
};