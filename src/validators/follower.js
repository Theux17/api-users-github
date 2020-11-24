const User = require('../models/User')

async function show (req, res, next) {
    const { userId, followerId } = req.params

    const userfollower = await User.findByPk(followerId)

    if(!userfollower) return res.status(404).json({ 
        error: "Usuário não encontrado."
    })
    
    const user = await User.findByPk(userId,{
        include: { association: 'followers' }
    })

    const follower = user.followers.find(follower => userfollower.id == follower.dataValues.follower_id)
    if(!follower) return res.status(404).json({ 
        error: "Você não tem nenhum seguidor com esse id."
    })

    next()
}

module.exports = {
    show
}