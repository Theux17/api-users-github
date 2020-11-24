const User = require('../models/User')
const Repository = require('../models/Repository')

module.exports = {
    async index(req, res) {
        try {
            const { userId } = req.params

            let user = await User.findByPk(userId, {
                include: { association: 'repositories' }
            })

            return res.json({ user })

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar todos os repositórios."
            })
        }
    },

    async create(req, res) {
        try {
            const { userId } = req.params

            let user = await User.findByPk(userId)

            const {
                name,
                description,
                public
            } = req.body

            const slug = `${"slug"}/${user.name}/${name}`

            const repository = await Repository.create({
                name,
                description,
                public,
                slug,
                user_id: user.id
            })

            return res.status(201).json(repository)
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao cadastrar repositório."
            })
        }
    },

    async show(req, res) {
        try {
            const repository = req.repository

            return res.json(repository)
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar repositório."
            })
        }
    },

    async update(req, res) {
        try {
            const { repositoryId } = req.params

            const {
                name,
                description,
                public
            } = req.body

            await Repository.update({ 
                name,
                description,
                public
            },{ where: { id: repositoryId } })

            const repository = await Repository.findByPk(repositoryId)

            return res.json(repository)

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao atualizar repositório."
            })
        }
    },

    async delete(req, res) {
        try {
            const repository = req.repository

            await Repository.destroy({ where: { id: repository.id } })

            return res.json({
                message: `Repositório ${repository.name} deletado com sucesso.`
            })

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao deletar repositório."
            })
        }
    }
}