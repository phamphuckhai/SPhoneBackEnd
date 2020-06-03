'use strict';
module.exports = (sequelize, DataTypes) => {
    const providers = sequelize.define('providers', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.INTEGER
    }, {});
    providers.associate = function (models) {
        // associations can be defined here
    };
    return providers;
};