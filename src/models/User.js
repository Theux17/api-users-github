const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            location: DataTypes.STRING,
            avatar: DataTypes.STRING,
            username: DataTypes.STRING,
            biography: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Following, { foreignKey: 'user_id', as: 'following' })
        this.hasMany(models.Followers, { foreignKey: 'user_id', as: 'followers' })    
    }
}

module.exports = User