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
        length: DataTypes.DECIMAL(10, 2),
        width: DataTypes.DECIMAL(10, 2),
        height: DataTypes.DECIMAL(10, 2),
        image: DataTypes.STRING,
        childCategoryId: DataTypes.INTEGER,
        bookDescriptionId: DataTypes.INTEGER,
        stationaryDescriptionId: DataTypes.INTEGER,
        toyDescriptionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product',
    });

    return Product;
};