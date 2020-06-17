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
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("users", "role")]);
  },
};
