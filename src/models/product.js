'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        static associate(models) {

        }
    };

    Product.init({
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        discount: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        childCategoryId: DataTypes.INTEGER,
        bookDescriptionId: DataTypes.INTEGER,
        stationaryDescriptionId: DataTypes.INTEGER,
        toyDescriptionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Products',
    });

    return Product;
};