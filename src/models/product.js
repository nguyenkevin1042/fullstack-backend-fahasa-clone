'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        static associate(models) {
            Product.hasOne(models.BookDescription,
                {
                    foreignKey: 'id',
                    sourceKey: 'bookDescriptionId',
                    as: 'bookDescriptionData'
                })

            Product.hasOne(models.ProductMarkdown,
                {
                    foreignKey: 'productId',
                    sourceKey: 'id',
                    as: 'markdownData'
                })

            Product.belongsTo(models.ChildCategory,
                {
                    foreignKey: 'categoryKeyName',
                    targetKey: 'keyName',
                })

        }
    };

    Product.init({
        name: DataTypes.STRING,
        keyName: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        discount: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        length: DataTypes.DECIMAL(10, 2),
        width: DataTypes.DECIMAL(10, 2),
        height: DataTypes.DECIMAL(10, 2),
        image: DataTypes.STRING,
        publishYear: DataTypes.INTEGER,
        categoryKeyName: DataTypes.STRING,
        bookDescriptionId: DataTypes.INTEGER,
        stationaryDescriptionId: DataTypes.INTEGER,
        toyDescriptionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product',
    });

    return Product;
};