const User = require('../models/User')

function checksIfFieldsIsEmpty(body, res){
    const keys = Object.keys(body)

    for(key of keys){
        if(body[key] == "") return res.status(400).json({
            message: `Preecha o campo ${key}`
        })
    }
}

async function create(req, res, next) {
    const { username, email } = req.body

    const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
    if(fillAllFields) return fillAllFields

    const users = await User.findAll()
    const usernameIsRegistered = users.find(user => user.username === username)

    if(usernameIsRegistered) return res.status(401).json({ 
        error: `O username ${username} já está registrado.`
    })

    const emailIsRegistered = users.find(user => user.email === email)

    if(emailIsRegistered) return res.status(401).json({ 
        error: "O email já está registrado."
    })

    next()
}

async function update(req, res, next) {
    const { username, email } = req.body
    const { userId } = req.params

    const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
    if(fillAllFields) return fillAllFields

    const users = await User.findAll()
    const userIsRegistered = users.find(user => user.id != userId)
    
    if(userIsRegistered && userIsRegistered.username == username && userIsRegistered.id != userId) return res.status(401).json({ 
        error: `O username ${username} já está registrado.`
    })

    if(userIsRegistered && userIsRegistered.email == email && userIsRegistered.id != userId) return res.status(401).json({ 
        error: "O email já está registrado."
    })

    next()
}

async function deleteUser(req, res, next) {
    const { userId } = req.params

    const user = await User.findByPk(userId)
    
    if(!user) return res.status(404).json({ 
        error: "Usuário não encontrado."
    })

    next()
}

module.exports = {
    create,
    update,
    deleteUser
}