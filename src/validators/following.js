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
    const { userId } = req.params
    const { username } = req.body

    const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
    if(fillAllFields) return fillAllFields

    const userFollowing = await User.findOne({ where: { username } })
    if(!userFollowing) return res.status(404).json({
        error: "Usuário não cadastrado!"
    })

    const user = await User.findByPk(userId,{
        include: { association: 'following' }
    })

    if(user.id == userFollowing.id) return res.status(404).json({
        error: `Você não pode seguir você mesmo.`
    })

    const following = user.following.find(following => userFollowing.id == following.dataValues.following_id)
    if(following) return res.status(404).json({
        error: `Você já está seguindo ${userFollowing.username}.`
    })


    next()
}

async function show (req, res, next) {
    const { userId, followingId } = req.params

    const userFollowing = await User.findByPk(followingId)

    if(!userFollowing) return res.status(404).json({ 
        error: "Usuário não encontrado."
    })
    
    const user = await User.findByPk(userId,{
        include: { association: 'following' }
    })

    const following = user.following.find(following => userFollowing.id == following.dataValues.following_id)
    if(!following) return res.status(404).json({ 
        error: "Você não está seguindo nenhum usuário com esse id."
    })

    next()
}

async function deleteFollowing(req, res, next) {
    const { userId } = req.params
    const { username } = req.body

    const userFollowing = await User.findOne({
        where: { username }
    })

    if(!userFollowing) return res.status(404).json({ 
        error: "Usuário não encontrado."
    })
    
    const user = await User.findByPk(userId,{
        include: { association: 'following' }
    })

    const following = user.following.find(following => userFollowing.id == following.dataValues.following_id)
    if(!following) return res.status(404).json({ 
        error: "Você não possui nenhum seguidor com esse username."
    })

    next()
}

module.exports = {
    create,
    show,
    deleteFollowing
}