const { Router } = require('express')
const UserController = require('./controllers/UserController')
const TokenController = require('./controllers/TokenController')
const FollowingController = require('./controllers/FollowingController')
const FollowerController = require('./controllers/FollowerController')
const RepositoryController = require('./controllers/RepositoryController')
const RepositoryStarController = require('./controllers/RepositoryStarController')

const UserValidator = require('./validators/user')
const TokenValidator = require('./validators/token')
const FollowingValidator = require('./validators/following')
const FollowerValidator = require('./validators/follower')
const RepositoryValidator = require('./validators/repository')
const RepositoryStarValidator = require('./validators/repositoryStar')

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

// followers 
routes.get('/users/:userId/followers', usersLoggedIn, FollowerController.index)
routes.get('/users/:userId/followers/:followerId', usersLoggedIn, FollowerValidator.show, FollowerController.show)

// repositories
routes.get('/users/:userId/repositories', usersLoggedIn, RepositoryController.index)
routes.post('/users/:userId/repositories', usersLoggedIn, RepositoryValidator.create, RepositoryController.create)
routes.get('/users/:userId/repositories/:repositoryId', usersLoggedIn, RepositoryValidator.show, RepositoryController.show)
routes.put('/users/:userId/repositories/:repositoryId', usersLoggedIn, RepositoryValidator.update, RepositoryController.update)
routes.delete('/users/:userId/repositories/:repositoryId', usersLoggedIn, RepositoryValidator.deleteRepository, RepositoryController.delete)

// repositories-stars
routes.post('/users/:userId/repositories-stars', usersLoggedIn, RepositoryStarValidator.create, RepositoryStarController.create)
routes.delete('/users/:userId/repositories-stars', usersLoggedIn, RepositoryStarValidator.deleteStar, RepositoryStarController.delete)


module.exports = routes