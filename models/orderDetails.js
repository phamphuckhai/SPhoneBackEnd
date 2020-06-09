'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderDetails = sequelize.define('orderDetails', {
    amount: DataTypes.INTEGER
  }, {
    
  });
  orderDetails.associate = function(models) {
    // associations can be defined here
    orderDetails.belongsTo(models.orders, {
      as: 'order'
  })
  };
  return orderDetails;
};