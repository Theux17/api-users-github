const User = require('../models/User')

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll()

            return res.json(users)
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar todos os usuários."
            })
        }
    },

    async create(req, res) {
        try {
            const {
                name,
                email,
                location,
                avatar,
                username,
                biography
            } = req.body

            const user = await User.create({
                name,
                email,
                location,
                avatar,
                username,
                biography
            })

            return res.status(201).json(user)
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao cadastrar usuário."
            })
        }
    },

    async update(req, res) {
        try {
            const { userId } = req.params

            const {
                name,
                email,
                location,
                avatar,
                username,
                biography
            } = req.body

            await User.update({
                name,
                email,
                location,
                avatar,
                username,
                biography
            }, { where: { id: userId } })

            const user = await User.findByPk(userId)

            return res.json(user)

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao atualizar o usuário."
            })
        }
    },

    async delete(req, res) {
        try {
            const { userId } = req.params

            await User.destroy({ where: { id: userId } })

            return res.json({
                error: "Usuário deletado com sucesso!"
            })

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao deletar o usuário."
            })
        }
    },

}