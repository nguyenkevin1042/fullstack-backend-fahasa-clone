'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

        static associate(models) {
            SubCategory.belongsTo(models.AllCodes, {
                foreignKey: 'categoryId',
                targetKey: 'keyMap',
                as: 'subCategoryData'
            })
            // SubCategory.hasOne(models.AllCodes, {
            //     foreignKey: 'categoryId',
            //     targetKey: 'keyMap',
            //     as: 'subCategoryData'
            // })

        }
    };

    SubCategory.init({
        categoryId: DataTypes.INTEGER,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SubCategory',
    });

    return SubCategory;
};