'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('species', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
          charset: 'utf8',
          collate: 'utf8_unicode_ci'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('species');
  }
};
