'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {});
    users.associate = function (models) {
        // associations can be defined here
    };
    return users;
};