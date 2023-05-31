'use strict';
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DECIMAL(10, 2)
            },
            discount: {
                type: Sequelize.INTEGER
            },
            weight: {
                type: Sequelize.INTEGER
            },
            length: {
                type: Sequelize.DECIMAL(10, 2)
            },
            width: {
                type: Sequelize.DECIMAL(10, 2)
            },
            height: {
                type: Sequelize.DECIMAL(10, 2)
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            childCategoryId: {
                type: Sequelize.INTEGER
            },
            bookDescriptionId: {
                type: Sequelize.INTEGER
            },
            stationaryDescriptionId: {
                type: Sequelize.INTEGER
            },
            toyDescriptionId: {
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
        await queryInterface.dropTable('Products');
    }
};