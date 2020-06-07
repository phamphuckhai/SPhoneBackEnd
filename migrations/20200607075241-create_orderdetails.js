'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orderdetails', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      amount: {
          type: Sequelize.INTEGER
      }
  });
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('orderdetails');
  }
};