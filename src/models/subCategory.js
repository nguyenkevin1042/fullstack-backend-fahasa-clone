'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {

        static associate(models) {
            SubCategory.belongsTo(models.AllCode,
                {
                    foreignKey: 'category',
                    targetKey: "keyMap",
                    // as: 'childCategoryData'
                })

            SubCategory.hasMany(models.ChildCategory,
                {
                    foreignKey: 'subCategory',
                    sourceKey: "keyName",
                    // as: 'childCategoryData'
                })
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