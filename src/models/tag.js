'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {

        static associate(models) {
            Tag.hasMany(models.ProductTag, {
                foreignKey: 'tagId',
                sourceKey: 'id'
            })
        }
    };

    Tag.init({
        type: DataTypes.STRING,
        keyName: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueEN: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Tag',
    });

    return Tag;
};