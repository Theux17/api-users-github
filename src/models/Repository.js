const { Model, DataTypes } = require('sequelize')

class Repository extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.TEXT,
            description: DataTypes.TEXT,            
            public: DataTypes.BOOLEAN,
            slug: DataTypes.TEXT,
            user_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.hasMany(models.RepositoryStar, { foreignKey: 'repository_id', as: 'stars' }) 
    }
}

module.exports = Repository