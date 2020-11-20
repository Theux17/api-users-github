'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      id:{ 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name:{ 
        type: Sequelize.TEXT, 
        allowNull: false
      },
      email:{ 
        type: Sequelize.TEXT, 
        allowNull: false
      },
      location: {
        type: Sequelize.TEXT
      },
      avatar: {
        type: Sequelize.TEXT
      },
      username: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      biography: {
        type: Sequelize.TEXT
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
