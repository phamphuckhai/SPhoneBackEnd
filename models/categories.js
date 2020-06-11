'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
  });
  categories.associate = function(models) {
    // associations can be defined here
    categories.hasMany(models.products, {
        as: 'category'
    })
  };
  return categories;
};