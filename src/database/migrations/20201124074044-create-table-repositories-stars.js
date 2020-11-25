'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repositories_stars', { 
      id:{ 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id:{ 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {model: 'users', key: 'id'  },
        onUpdate: 'CASCADE'
      },
      repository_id:{ 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {model: 'repositories', key: 'id'  },
        onUpdate: 'CASCADE'
      }
  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repositories_stars');
  }
};
