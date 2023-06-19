'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            User.belongsTo(models.AllCode,
                {
                    foreignKey: 'gender',
                    targetKey: 'keyMap',
                })
            User.hasOne(models.Cart,
                {
                    foreignKey: 'userId',
                    sourceKey: 'id'
                })
            User.hasMany(models.UserAddress,
                {
                    foreignKey: 'userId',
                    sourceKey: 'id'
                })
            User.hasMany(models.Bill,
                {
                    foreignKey: 'userId',
                    sourceKey: 'id'
                })
        }
    };

    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthday: DataTypes.STRING,
        roleId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};