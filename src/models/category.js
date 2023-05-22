'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {

        static associate(models) {


        }
    };

    Category.init({
        categoryId: DataTypes.INTEGER,
        subCategoryId: DataTypes.INTEGER,
        childCategoryId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Category',
    });

    return Category;
};