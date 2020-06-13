'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'orderDetails', //table name
          'unitPrice', //field name
          {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
      ),
  ]);
  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn('orderDetails', 'unitPrice')
  ]);
  }
};
