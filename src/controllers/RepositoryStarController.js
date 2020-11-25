const User = require('../models/User')
const RepositoryStar = require('../models/RepositoryStar')

module.exports = {

    async create(req, res) {
        try {
            const { userId } = req.params
            const { name, username } = req.body

            const user = await User.findOne({
                where: { username },
                include: 'repositories'
            })
        
            const repository = user.repositories.find(repository => repository.name == name)

            const star = await RepositoryStar.create({
                user_id: userId,
                repository_id: repository.id
            })

            return res.status(201).json(star)

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao dar estrela para o repositório."
            })
        }
    },

    async delete(req, res) {
        try {
            const star = req.star

           await RepositoryStar.destroy({ where: { id: star.id } })

            return res.json({ message: 'Estrela removida com sucesso.' })

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao retirar estrela do repositório."
            })
        }
    }
}