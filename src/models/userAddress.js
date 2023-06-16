'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserAddress extends Model {

        static associate(models) {
            UserAddress.belongsTo(models.User,
                {
                    foreignKey: 'userId',
                    targetKey: 'id'
                })
            UserAddress.hasMany(models.Bill,
                {
                    foreignKey: 'userAddressId',
                    sourceKey: 'id',
                })
        }
    };

    UserAddress.init({
        fullName: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        district: DataTypes.STRING,
        ward: DataTypes.STRING,
        addressDetail: DataTypes.STRING,
        addressType: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'UserAddress',
    });

    return UserAddress;
};