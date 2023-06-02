'use strict';
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BookDescriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            supplier: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            translator: {
                type: Sequelize.STRING
            },
            publisher: {
                type: Sequelize.STRING
            },
            language: {
                type: Sequelize.STRING
            },
            pages: {
                type: Sequelize.INTEGER
            },
            bookLayout: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('BookDescriptions');
    }
};