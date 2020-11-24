const User = require('../models/User')

module.exports = {
    async index (req, res) {
        try {
            const { userId } = req.params

            let user = await User.findByPk(userId, {
                where: { user_id: userId },
                include: { association: 'followers' }
            })

            return res.json({ user })  

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar todos os seguidores."
            })  
        }
    },

    async show (req, res) {
        try {
            const { followerId } = req.params
            
            const following = await User.findByPk(followerId)

            return res.json( following )  
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar seguidor."
            })  
        }
    },
}