'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CartProduct extends Model {

        static associate(models) {
            CartProduct.belongsTo(models.Cart,
                {
                    foreignKey: 'cartId',
                    targetKey: 'id'
                })
            CartProduct.belongsTo(models.Product,
                {
                    foreignKey: 'productId',
                    targetKey: 'id'
                })
        }
    };

    CartProduct.init({
        cartId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        totalPrice: DataTypes.DECIMAL(10, 2)
    }, {
        sequelize,
        modelName: 'CartProduct',
    });

    return CartProduct;
};