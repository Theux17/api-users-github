const { Model, DataTypes } = require('sequelize')

class RepositoryStar extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            repository_id: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'repositories_stars'
        })
    }

    static associate(models) {
      this.belongsTo(models.Repository, { foreignKey: 'repository_id', as: 'repository' })
    }
}

module.exports = RepositoryStar