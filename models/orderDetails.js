"use strict";
module.exports = (sequelize, DataTypes) => {
    const orderDetails = sequelize.define(
        "orderDetails",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            unitPrice: DataTypes.BIGINT,
            quantity: DataTypes.INTEGER,
            interest: DataTypes.BIGINT,
        },
        {}
    );
    orderDetails.associate = function (models) {
        // associations can be defined her
        orderDetails.belongsTo(models.products);
        orderDetails.belongsTo(models.orders);
    };
    return orderDetails;
};
