'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('manufactures', [{
      name: 'SamSUng',
      country: 'Han QUoc',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Apple',
      country: 'USA',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('manufactures', null, {});
  }
};
