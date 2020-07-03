"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "users", //table name
        "role", //field name
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        "users", //table name
        "status", //field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        }
      ),
    ]);
    
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("users", "role")]);
  },
};
