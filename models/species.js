'use strict';
module.exports = (sequelize, DataTypes) => {
  const species = sequelize.define('species', {
    name: DataTypes.STRING,
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  species.associate = function(models) {
    // associations can be defined here
  };
  return species;
};