'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ToyDescription extends Model {

        static associate(models) {
            ToyDescription.belongsTo(models.Product,
                {
                    foreignKey: 'id',
                    targetKey: 'toyDescriptionId',
                    as: 'toyDescriptionData'
                })
        }
    };

    ToyDescription.init({
        age: DataTypes.INTEGER,
        supplier: DataTypes.STRING,
        brand: DataTypes.STRING,
        origin: DataTypes.STRING,
        madeBy: DataTypes.STRING,
        color: DataTypes.STRING,
        material: DataTypes.STRING,
        specification: DataTypes.STRING,
        warning: DataTypes.STRING,
        usage: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ToyDescription',
    });

    return ToyDescription;
};