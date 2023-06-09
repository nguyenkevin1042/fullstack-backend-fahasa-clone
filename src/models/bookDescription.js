'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookDescription extends Model {

        static associate(models) {
            BookDescription.belongsTo(models.Product,
                {
                    foreignKey: 'id',
                    targetKey: 'bookDescriptionId',
                    as: 'bookDescriptionData'
                })
        }
    };

    BookDescription.init({
        supplier: DataTypes.STRING,
        author: DataTypes.STRING,
        translator: DataTypes.STRING,
        publisher: DataTypes.STRING,
        language: DataTypes.STRING,
        pages: DataTypes.INTEGER,
        chapter: DataTypes.INTEGER,
        bookLayout: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BookDescription',
    });

    return BookDescription;
};