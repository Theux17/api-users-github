const Token = require('../models/Token')

module.exports = {
    async usersLoggedIn(req, res, next) {
        const { userId } = req.params

        const token = await Token.findOne({ where: { user_id: userId } })
        
        if(!token) return res.status(401).json({
           message: 'Faça o login para acessar a conta.'
        })

        next()
    }

} 
