const { Model, DataTypes } = require('sequelize')

class Token extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            date_now: DataTypes.DATE
        }, {
            sequelize
        })
    }
}

module.exports = Token