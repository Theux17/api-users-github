const User = require('../models/User')
const Following = require('../models/Following')
const Follower = require('../models/Follower')

module.exports = {
    async index (req, res) {
        try {
            const { userId } = req.params

            let user = await User.findByPk(userId, {
                include: { association: 'following'}
            })

            return res.json( user )  
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar os usuários que você está seguindo."
            })  
        }
    },

    async create (req, res) {
        try {
            const { userId } = req.params
            
            const { username } = req.body
            const userFollowing = await User.findOne({ where: { username } })
            
            const following = await Following.create({
                user_id: userId,
                following_id: userFollowing.id
            })

            await Follower.create({
                user_id: userFollowing.id,
                follower_id: userId
            })

            return res.json({ following })  

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao seguir usuário."
            })  
        }
    },

    async show (req, res) {
        try {
            const { followingId } = req.params
            
            const following = await User.findByPk(followingId)

            return res.json( following )  
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar o usuário que você está seguindo."
            })  
        }
    },

    async delete (req, res) {
        try {
            const { userId } = req.params
            const { username } = req.body

            const userFollowing = await User.findOne({ where: {username} }) 
            const user = await User.findByPk(userId,{
                include: { association: 'following' }
            })

            const following = user.following.find(following => userFollowing.id == following.dataValues.following_id )
            await Following.destroy({ where: { id: following.dataValues.id } })

            return res.json({ message: `Você parou de seguir o usuário ${userFollowing.username}` })  
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao parar de seguir o usuário"
            })  
        }
    }

}