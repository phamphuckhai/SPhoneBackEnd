'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Customers', //table name
                'phone', //field name
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            ),
            queryInterface.addColumn(
                'Customers', //table name
                'address', //field name
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            ),
            queryInterface.addColumn(
                'Customers', //table name
                'email', //field name
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            ),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
