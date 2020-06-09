'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderTypes = sequelize.define('orderTypes', {
    name: DataTypes.INTEGER
  }, {
    
  });
  orderTypes.associate = function(models) {
    // associations can be defined here
    orderTypes.hasMany(models.orders, {
      as: 'type'
    })
  };
  return orderTypes;
};