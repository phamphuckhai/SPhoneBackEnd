'use strict';
module.exports = (sequelize, DataTypes) => {
  const manufacture = sequelize.define('manufacture', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    
  });
  manufacture.associate = function(models) {
    // associations can be defined here
    manufacture.hasMany(models.products, {
        as: 'manufacture'
    })
  };
  return manufacture;
};