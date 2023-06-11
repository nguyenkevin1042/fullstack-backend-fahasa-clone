'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {

        static associate(models) {
            Cart.belongsTo(models.User,
                {
                    foreignKey: 'userId',
                    targetKey: 'id'
                })
            Cart.hasMany(models.CartProduct,
                {
                    foreignKey: 'cartId',
                    sourceKey: 'id'
                })
        }
    };

    Cart.init({
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Cart',
    });

    return Cart;
};