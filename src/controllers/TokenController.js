const Token = require('../models/Token')

module.exports = {
    async login(req, res) {
        try {
            const date = new Date
            const date_now = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate() - 1}`

            const user = req.user

            await Token.create({
                user_id: user.id,
                date_now
            })
            
            return res.json(user)
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao tentar realizar o login."
            })
        }
    },

    async logout(req, res) {
        try {
            const { userId } = req.params

            await Token.destroy({ where: { user_id: userId } })
            
            return res.json({
                message: "Operação realizada com sucesso."
            })  

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao realizar o logout."
            })  
        }
    }
}