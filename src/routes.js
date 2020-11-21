const { Router } = require('express')
const UserController = require('./controllers/UserController')
const TokenController = require('./controllers/TokenController')

const UserValidator = require('./validators/user')
const TokenValidator = require('./validators/token')

const { usersLoggedIn } = require('./middlewares/session')

const routes = Router()

// login/logout
routes.post('/users/login', TokenValidator.login, TokenController.login)
routes.delete('/users/logout/:userId', usersLoggedIn, TokenController.logout)

// users
routes.post('/users', UserValidator.create, UserController.create)
routes.get('/users/:userId', usersLoggedIn, UserController.show)
routes.put('/users/:userId', usersLoggedIn, UserValidator.update, UserController.update)
routes.delete('/users/:userId', usersLoggedIn, UserValidator.deleteUser, UserController.delete)

module.exports = routes