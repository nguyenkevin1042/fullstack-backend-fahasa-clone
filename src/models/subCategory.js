'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

        static associate(models) {


        }
    };

    SubCategory.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SubCategory',
    });

    return SubCategory;
};