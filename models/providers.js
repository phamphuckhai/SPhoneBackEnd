"use strict";
module.exports = (sequelize, DataTypes) => {
  const providers = sequelize.define(
    "providers",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
      email: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    }
    },
    {}
  );
  providers.associate = function (models) {
    // associations can be defined here
    providers.hasOne(models.orders, {
      as: "provider",
    });
  };
  return providers;
};
