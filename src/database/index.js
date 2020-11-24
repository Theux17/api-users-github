const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Token = require('../models/Token')
const Following = require('../models/Following')
const Follower = require('../models/Follower')
const Repository = require('../models/Repository')

const connection = new Sequelize(dbConfig)

User.init(connection)
Token.init(connection)
Follower.init(connection)
Following.init(connection)
Repository.init(connection)

User.associate(connection.models)
Following.associate(connection.models)
Follower.associate(connection.models)
Repository.associate(connection.models)

module.exports = connection