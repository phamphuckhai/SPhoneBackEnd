'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderDetails = sequelize.define('orderDetails', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: true, 
      
    },
    unitPrice: DataTypes.INTEGER
  }, {
  });
  orderDetails.associate = function(models) {
    // associations can be defined her
  };
  return orderDetails;
};