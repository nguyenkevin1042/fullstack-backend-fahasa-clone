'use strict';
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProductMarkdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT("long")
            },
            contentMarkdown: {
                type: Sequelize.TEXT("long")
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
        await queryInterface.dropTable('ProductMarkdowns');
    }
};