'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderDetails = sequelize.define('orderDetails', {
    unitPrice: DataTypes.INTEGER,
  }, {
  });
  orderDetails.associate = function(models) {
    // associations can be defined her
  };
  return orderDetails;
};