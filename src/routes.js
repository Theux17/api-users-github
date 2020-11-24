const { Router } = require('express')
const UserController = require('./controllers/UserController')
const TokenController = require('./controllers/TokenController')
const FollowingController = require('./controllers/FollowingController')
const FollowerController = require('./controllers/FollowerController')

const UserValidator = require('./validators/user')
const TokenValidator = require('./validators/token')
const FollowingValidator = require('./validators/following')
const FollowerValidator = require('./validators/follower')

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

// following
routes.get('/users/:userId/following', usersLoggedIn, FollowingController.index)
routes.post('/users/:userId/following', usersLoggedIn, FollowingValidator.create, FollowingController.create)
routes.get('/users/:userId/following/:followingId', usersLoggedIn, FollowingValidator.show, FollowingController.show)
routes.delete('/users/:userId/following', usersLoggedIn, FollowingValidator.deleteFollowing, FollowingController.delete)

// Followers 
routes.get('/users/:userId/followers', usersLoggedIn, FollowerController.index)
routes.get('/users/:userId/followers/:followerId', usersLoggedIn, FollowerValidator.show, FollowerController.show)

module.exports = routes