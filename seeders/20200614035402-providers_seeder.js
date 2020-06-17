"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "providers",
      [
        {
          name: "CHi nhánh Thủ Đức",
          address: "Thủ Đức",
          phone: "0389996666",
          website: "sphonethuduc.com",
          email: "sphonethuduc@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("providers", null, {});
  },
};
