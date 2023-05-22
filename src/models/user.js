'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {


        }
    };

    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        district: DataTypes.STRING,
        ward: DataTypes.STRING,
        deliveryAddress: DataTypes.STRING,
        roleId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};