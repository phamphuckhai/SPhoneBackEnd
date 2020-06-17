"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orderTypes",
      [
        {
          name: "Nhập",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xuất",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orderTypes", null, {});
  },
};
