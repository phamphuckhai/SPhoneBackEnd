"use strict";
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            fullname: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            email: DataTypes.STRING,
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
            }
        },
        {}
    );
    users.associate = function (models) {
        // associations can be defined here
    };
    return users;
};
