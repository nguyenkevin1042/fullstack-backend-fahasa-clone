'use strict';
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bills', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            orderedDate: {
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER
            },
            userAddressId: {
                type: Sequelize.INTEGER
            },
            paymentType: {
                type: Sequelize.STRING
            },
            totalPrice: {
                type: Sequelize.DECIMAL(10, 2)
            },
            status: {
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
        await queryInterface.dropTable('Bills');
    }
};