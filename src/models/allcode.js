'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {

        static associate(models) {
            AllCode.hasMany(models.SubCategory,
                {
                    foreignKey: 'categoryType',
                    as: 'subCategoryData'
                })
        }
    };

    AllCode.init({
        type: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCodes',
    });

    return AllCode;
};