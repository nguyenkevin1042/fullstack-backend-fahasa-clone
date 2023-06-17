'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductTag extends Model {

        static associate(models) {
            ProductTag.belongsTo(models.Tag, {
                foreignKey: 'tagId',
                targetKey: 'id'
            })
            ProductTag.belongsTo(models.Product, {
                foreignKey: 'productId',
                targetKey: 'id'
            })
        }
    };

    ProductTag.init({
        tagId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'ProductTag',
    });

    return ProductTag;
};