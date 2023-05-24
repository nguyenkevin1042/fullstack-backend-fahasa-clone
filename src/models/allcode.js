'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCodes extends Model {

        static associate(models) {
            AllCodes.hasMany(models.SubCategory,
                {
                    foreignKey: 'categoryType',
                    as: 'subCategoryData'
                })

        }
    };

    AllCodes.init({
        type: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCodes',
    });

    return AllCodes;
};