'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('following', { 
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
      following_id:{ 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {model: 'users', key: 'id'  },
        onUpdate: 'CASCADE'
      }
  
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('following');
  }
};
