'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ToyDescriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            age: {
                type: Sequelize.INTEGER
            },
            supplier: {
                type: Sequelize.STRING
            },
            brand: {
                type: Sequelize.STRING
            },
            origin: {
                type: Sequelize.STRING
            },
            madeBy: {
                type: Sequelize.STRING
            },
            color: {
                type: Sequelize.STRING
            },
            specification: {
                type: Sequelize.STRING
            },
            warning: {
                type: Sequelize.STRING
            },
            usage: {
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
        await queryInterface.dropTable('ToyDescriptions');
    }
};