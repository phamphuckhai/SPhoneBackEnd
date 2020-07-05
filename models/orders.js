"use strict";
module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define(
        "orders",
        {
            amount: {
                type: DataTypes.BIGINT,
                validate: {
                    min: 0
                }
            },
        },
        {}
    );
    orders.associate = function (models) {
        // associations can be defined here
        orders.belongsTo(models.Customer, {as: "Customer"});
        orders.belongsTo(models.users, {as: "user"});
        orders.belongsTo(models.providers, {foreign: "provider"});
        orders.belongsTo(models.orderTypes, {as: "orderType"});
        orders.belongsToMany(models.products, {through: "orderDetails"});
        orders.hasMany(models.orderDetails, {as: "orderDetail"});
    };
    return orders;
};
