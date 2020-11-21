const { Router } = require('express')
const UserController = require('./controllers/UserController')
const TokenController = require('./controllers/TokenController')

const UserValidator = require('./validators/user')
const { usersLoggedIn } = require('./middlewares/session')

const routes = Router()

// login/logout
routes.post('/users/login', TokenController.login)
routes.delete('/users/logout/:userId', usersLoggedIn, TokenController.logout)

routes.get('/users', UserController.index)
routes.post('/users', UserValidator.create, UserController.create)
routes.put('/users/:userId', usersLoggedIn, UserValidator.update, UserController.update)
routes.delete('/users/:userId', usersLoggedIn, UserValidator.deleteUser, UserController.delete)

module.exports = routes