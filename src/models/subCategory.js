'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

        static associate(models) {
            // SubCategory.belongsTo(models.AllCode, {
            //     foreignKey: 'category',
            //     targetKey: 'keyMap',
            //     as: 'subCategoryData'
            // })
            SubCategory.belongsTo(models.AllCode, {
                foreignKey: 'category'
            })

            // SubCategory.hasOne(models.ChildCategory, {
            //     foreignKey: 'subCategory',
            // })

            SubCategory.hasMany(models.ChildCategory,
                {
                    foreignKey: 'keyName',
                    as: 'childCategoryData'
                }
            )


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