"use strict";
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    "products",
    {
      name: DataTypes.STRING,
      codeName: DataTypes.STRING,
      description: DataTypes.STRING,
      madeIn: DataTypes.STRING,
      // amount: DataTypes.INTEGER,
      // cost: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {}
  );
  products.associate = function (models) {
    // associations can be defined here
    products.belongsTo(models.categories, {
      as: "category",
    });

    products.hasOne(models.productSpecs);

    products.belongsTo(models.manufactures, {
      as: "manufacture",
    });

    products.belongsToMany(models.orders, { through: "orderDetails" });

    products.hasMany(models.orderDetails);
  };
  return products;
};
