const { Router } = require('express')
const UserController = require('./controllers/UserController')
const UserValidator = require('./validators/user')

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserValidator.create, UserController.create)
routes.put('/users/:userId', UserValidator.update, UserController.update)
routes.delete('/users/:userId', UserValidator.deleteUser, UserController.delete)

module.exports = routes