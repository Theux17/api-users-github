const User = require('../models/User')
const Repository = require('../models/Repository')

function checksIfFieldsIsEmpty(body, res){
    const keys = Object.keys(body)

    for(key of keys){
        if(body[key] == "") return res.status(400).json({
            message: `Preecha o campo ${key}`
        })
    }
}

async function create(req, res, next) {
    const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
    if(fillAllFields) return fillAllFields

    const { username, name } = req.body

    const user = await User.findOne({ where: { username } })
    if(!user) return res.status(404).json({
        error: "Usuário não cadastrado!"
    })

    const registeredRepositories = await Repository.findAll({
        where: { user_id: user.id },
        include: { association: 'stars' }
    })

    const repository = registeredRepositories.find(repository => repository.name == name)

    const repositoryStar = repository.stars.find(star => star.repository_id == repository.id)
    if(repositoryStar) return res.status(404).json({
        error: `Você já deu estrela para esse repositório`
    })

    next()
}

async function deleteStar(req, res, next) {
    const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
    if(fillAllFields) return fillAllFields

    const { username, name } = req.body

    const user = await User.findOne({ where: { username } })
    if(!user) return res.status(404).json({
        error: "Usuário não cadastrado!"
    })

    const registeredRepositories = await Repository.findAll({
        where: { user_id: user.id },
        include: { association: 'stars' }
    })

    const repository = registeredRepositories.find(repository => repository.name == name)

    const repositoryStar = repository.stars.find(star => star.repository_id == repository.id)

    if(!repositoryStar) return res.status(404).json({
        error: `Você não deu estrela para esse repositório.`
    })

    req.star = repositoryStar

    next()
}

module.exports = {
    create,
    deleteStar
}