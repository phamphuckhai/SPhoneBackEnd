'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'orderDetails', //table name
          'unitPrice', //field name
          {
              type: Sequelize.INTEGER,
              allowNull: true,
          },
          
      ),
      queryInterface.addColumn(
        'orderDetails', //table name
        'id', //field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,        
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
