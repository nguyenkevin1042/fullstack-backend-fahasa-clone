'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {

        static associate(models) {
            AllCode.hasMany(models.SubCategory,
                {
                    foreignKey: 'category',
                    sourceKey: 'keyMap',
                })
            AllCode.hasMany(models.Product,
                {
                    foreignKey: 'formId',
                    sourceKey: 'keyMap',
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
        modelName: 'AllCode',
    });

    return AllCode;
};