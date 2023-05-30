'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookDescription extends Model {

        static associate(models) {

        }
    };

    BookDescription.init({
        supplier: DataTypes.STRING,
        author: DataTypes.STRING,
        translator: DataTypes.STRING,
        publisher: DataTypes.STRING,
        language: DataTypes.STRING,
        pages: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'BookDescriptions',
    });

    return BookDescription;
};