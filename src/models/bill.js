'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {

        static associate(models) {
        }
    };

    Bill.init({
        orderedDate: DataTypes.DATE,
        userId: DataTypes.INTEGER,
        userAddressId: DataTypes.INTEGER,
        paymentType: DataTypes.STRING,
        totalPrice: DataTypes.DECIMAL(10, 2),
        status: DataTypes.STRING,
    }, {
        sequelize,
        timestamps: true,
        modelName: 'Bill',
    });

    return Bill;
};