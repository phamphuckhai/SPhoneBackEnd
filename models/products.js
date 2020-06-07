'use strict';
module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
        name: DataTypes.STRING,
        codeName: DataTypes.STRING,
        description: DataTypes.STRING,
        madeIn: DataTypes.STRING,
        amount: DataTypes.INTEGER
    }, {});
    products.associate = function (models) {
        // associations can be defined here
        products.belongsTo(models.categories, {
            as: 'category'
        })

        products.hasOne(models.productSpecs, {
            as: 'product'
        })

        products.belongsTo(models.manufacture, {
            as: 'manufacture'
        })
    };
    return products;
};