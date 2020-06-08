'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderTypes = sequelize.define('orderTypes', {
    amount: DataTypes.INTEGER
  }, {
    
  });
  orderTypes.associate = function(models) {
    // associations can be defined here
  };
  return orderTypes;
};