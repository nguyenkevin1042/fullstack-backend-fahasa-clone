'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BillProduct extends Model {

        static associate(models) {

        }
    };

    BillProduct.init({
        billId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        totalPrice: DataTypes.DECIMAL(10, 2)
    }, {
        sequelize,
        modelName: 'BillProduct',
    });

    return BillProduct;
};