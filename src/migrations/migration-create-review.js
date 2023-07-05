'use strict';
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER
            },
            reviewer: {
                type: Sequelize.STRING
            },
            isAnonymous: {
                type: Sequelize.BOOLEAN
            },
            reviewText: {
                type: Sequelize.TEXT("long")
            },
            rating: {
                type: Sequelize.STRING
            },
            reviewedDate: {
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Reviews');
    }
};