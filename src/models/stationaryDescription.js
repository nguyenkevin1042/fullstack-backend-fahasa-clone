'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StationaryDescription extends Model {

        static associate(models) {

        }
    };

    StationaryDescription.init({
        supplier: DataTypes.STRING,
        brand: DataTypes.STRING,
        origin: DataTypes.STRING,
        color: DataTypes.STRING,
        material: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        madeBy: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'StationaryDescriptions',
    });

    return StationaryDescription;
};