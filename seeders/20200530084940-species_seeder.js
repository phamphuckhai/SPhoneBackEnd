'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('species', [{
      name: 'điện thoại'
    },
    {
      name: 'may tinh bang'
    }], {
    }
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('species', null, {});
  }
};
