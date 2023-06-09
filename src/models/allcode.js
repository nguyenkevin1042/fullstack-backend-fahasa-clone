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
            AllCode.hasMany(models.Bill,
                {
                    foreignKey: 'status',
                    sourceKey: 'keyMap',
                })
            AllCode.hasMany(models.User,
                {
                    foreignKey: 'gender',
                    sourceKey: 'keyMap',
                    as: 'genderData'
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
        timestamps: true,
        modelName: 'AllCode',
    });

    return AllCode;
};