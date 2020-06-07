'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      name: {
          type: Sequelize.STRING
      },
      codeName: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.STRING
      },
      madeIn: {
        type: Sequelize.STRING
      },
      amount:{
        type: Sequelize.INTEGER
      }
  });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
