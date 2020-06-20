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
            unitPrice: {
                type: DataTypes.BIGINT,
                validate: {
                    min: 0
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1
                }
            },
            interest: DataTypes.BIGINT,
        },
        {timestamps: false}
    );
    orderDetails.associate = function (models) {
        // associations can be defined her
        orderDetails.belongsTo(models.products);
        orderDetails.belongsTo(models.orders);
    };
    return orderDetails;
};
