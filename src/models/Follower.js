const { Model, DataTypes } = require('sequelize')

class Follower extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            follower_id: DataTypes.INTEGER,   
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'follower_id', as: 'user' })
    }
}

module.exports = Follower