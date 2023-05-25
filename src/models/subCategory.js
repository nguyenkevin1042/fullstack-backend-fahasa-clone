'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

        static associate(models) {
            SubCategory.belongsTo(models.AllCodes, {
                foreignKey: 'categoryType',
                targetKey: 'keyMap',
                as: 'subCategoryData'
            })
            SubCategory.hasMany(models.ChildCategory, {
                foreignKey: 'subCategoryId',
                as: 'childCategoryData'
            })


        }
    };

    SubCategory.init({
        categoryType: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SubCategory',
    });

    return SubCategory;
};