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
}

module.exports = User