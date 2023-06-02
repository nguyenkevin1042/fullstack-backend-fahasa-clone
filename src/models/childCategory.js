'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChildCategory extends Model {

        static associate(models) {


        }
    };

    ChildCategory.init({
        subCategory: DataTypes.STRING,
        keyName: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ChildCategory',
    });

    return ChildCategory;
};