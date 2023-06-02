'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChildCategory extends Model {

        static associate(models) {
            ChildCategory.belongsTo(models.SubCategory, {
                foreignKey: 'subCategory',
                targetKey: 'keyName',
                as: 'childCategoryData'
            })

        }
    };

    ChildCategory.init({
        subCategory: DataTypes.INTEGER,
        keyName: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ChildCategory',
    });

    return ChildCategory;
};