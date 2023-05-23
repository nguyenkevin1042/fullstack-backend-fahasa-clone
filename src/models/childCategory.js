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
        subCategoryId: DataTypes.INTEGER,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ChildCategory',
    });

    return ChildCategory;
};