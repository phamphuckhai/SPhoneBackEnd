"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "products",
      [
        {
          name: "IPhone 11",
          codeName: "IP11",
          description: "Hang de vo",
          madeIn: "USA",
          categoryId: "1",
          manufactureId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SAMSUNG GALAXY NOTE 10",
          codeName: "SSGA10",
          description: "Hang de vo",
          madeIn: "KOREAN",
          categoryId: "1",
          manufactureId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
