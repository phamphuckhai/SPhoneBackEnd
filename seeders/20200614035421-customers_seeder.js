'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [{
      name: 'Khải Phạm',
      phone: '0389996689',
      address: 'KTX khu B DHQG TPHCM',
      email: 'phamphuckhai@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dũng',
      phone: '039999999',
      address: 'KTX khu A DHQG TPHCM',
      email: 'dung@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {
    }
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
