'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ToyDescription extends Model {

        static associate(models) {

        }
    };

    ToyDescription.init({
        age: DataTypes.INTEGER,
        supplier: DataTypes.STRING,
        publishYear: DataTypes.INTEGER,
        brand: DataTypes.STRING,
        origin: DataTypes.STRING,
        madeBy: DataTypes.STRING,
        color: DataTypes.STRING,
        specification: DataTypes.STRING,
        warning: DataTypes.STRING,
        usage: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ToyDescription',
    });

    return ToyDescription;
};