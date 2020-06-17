"use strict";
module.exports = (sequelize, DataTypes) => {
  const productSpecs = sequelize.define("productSpecs", {}, {});
  productSpecs.associate = function (models) {
    // associations can be defined here
    productSpecs.belongsTo(models.products, {
      as: "product",
    });
  };
  return productSpecs;
};
