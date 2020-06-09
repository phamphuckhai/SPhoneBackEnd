'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});
    Customer.associate = function (models) {
        // associations can be defined here
        Customer.hasMany(models.orders, {
        as: 'customer'
    })
    };

    
    return Customer;
};