'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductMarkdown extends Model {

        static associate(models) {
            ProductMarkdown.belongsTo(models.Product,
                {
                    foreignKey: 'productId',
                    targetKey: 'id',
                    as: 'markdownData'
                })
        }
    };

    ProductMarkdown.init({
        productId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT("long"),
        contentMarkdown: DataTypes.TEXT("long"),
    }, {
        sequelize,
        modelName: 'ProductMarkdown',
    });

    return ProductMarkdown;
};