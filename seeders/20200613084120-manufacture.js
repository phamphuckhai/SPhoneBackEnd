'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('manufacture', [{
      name: 'SamSUng',
      country: 'Han QUoc',
      amount: '3000000',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Apple',
      country: 'USA',
      amount: '25000000',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('manufacture', null, {});
  }
};
