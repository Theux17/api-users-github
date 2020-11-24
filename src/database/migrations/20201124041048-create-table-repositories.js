'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repositories', { 
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
      description:{ 
        type: Sequelize.TEXT
      },
      public: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      slug: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      user_id:{ 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {model: 'users', key: 'id'  },
        onUpdate: 'CASCADE'
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('repositories');
  }
};
