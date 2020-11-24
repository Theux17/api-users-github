const { Model, DataTypes } = require('sequelize')

class Following extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            following_id: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'following'
        })
    }

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'following_id', as: 'following' })
    }
}

module.exports = Following