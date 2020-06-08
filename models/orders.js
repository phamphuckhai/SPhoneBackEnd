'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    amount: DataTypes.INTEGER
  }, {
    
  });
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};