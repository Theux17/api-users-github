const Token = require('../models/Token')
const User = require('../models/User')

async function login(req, res, next) {
    const { username } = req.body
    const user = await User.findOne({  where: { username } })

    if(!user) return res.status(404).json({
        error: "Usuário não cadastrado!"
    })

    const token = await Token.findOne({ where: { user_id: user.id } })
    
    if(token) return res.status(400).json({
        error: "Usuário já está logado."
    })

    req.user = user

    next()
}

module.exports = {
    login
}