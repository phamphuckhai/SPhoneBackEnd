'use strict';
module.exports = (sequelize, DataTypes) => {
  const manufactures = sequelize.define('manufactures', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    
  });
  manufactures.associate = function(models) {
    // associations can be defined here
    manufactures.hasMany(models.products, {
        as: 'manufactures'
    })
  };
  return manufactures;
};