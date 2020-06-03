'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('providers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.INTEGER
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('providers');
    }
};
