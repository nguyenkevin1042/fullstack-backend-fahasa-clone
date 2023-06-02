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
        category: DataTypes.STRING,
        keyName: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SubCategory',
    });

    return SubCategory;
};