const { Router } = require('express')
const routes = Router()

routes.get('/users', (req, res) => res.json({ message: 'Hello World' }))

module.exports = routes