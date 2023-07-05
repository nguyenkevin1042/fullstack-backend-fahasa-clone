'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {

        static associate(models) {

        }
    };

    Review.init({
        productId: DataTypes.INTEGER,
        reviewer: DataTypes.STRING,
        isAnonymous: DataTypes.BOOLEAN,
        reviewText: DataTypes.TEXT("long"),
        rating: DataTypes.STRING,
        reviewedDate: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Review',
    });

    return Review;
};