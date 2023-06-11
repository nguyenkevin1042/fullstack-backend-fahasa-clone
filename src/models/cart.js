'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {

        static associate(models) {

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