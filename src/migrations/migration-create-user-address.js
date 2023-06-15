'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserAddresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullName: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            province: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            ward: {
                type: Sequelize.STRING
            },
            addressDetail: {
                type: Sequelize.STRING
            },
            addressType: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('UserAddresses');
    }
};