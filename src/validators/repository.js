const User = require('../models/User')

function checksIfFieldsIsEmpty(body, res) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "" && key != 'description') return res.status(400).json({
            message: `Preecha o campo ${key}`
        })
    }
}

async function checkIfRepositoryisEmpty(userId, repositoryId, res ){
    const user = await User.findByPk(userId, {
        include: 'repositories'
    })

    const repository = user.repositories.find(repository => repository.id == repositoryId)

    if (!repository) return res.status(404).json({
        error: `Você não possui repositório com o id ${repositoryId}.`
    })

    return repository
}


async function create(req, res, next) {
    const { userId } = req.params
    const { name } = req.body

    const fillAllFields = checksIfFieldsIsEmpty(req.body, res)
    if (fillAllFields) return fillAllFields

    const user = await User.findByPk(userId, {
        include: 'repositories'
    })

    const repository = user.repositories.find(repository => repository.name == name)

    if (repository) return res.status(404).json({
        error: `Repositório com o nome ${name} já existe na conta.`
    })

    next()
}

async function show(req, res, next) {
    const { userId, repositoryId } = req.params

    const repository = await checkIfRepositoryisEmpty(userId, repositoryId, res)
    
    req.repository = repository

    next()
}

async function update(req, res, next) {
    const { userId, repositoryId } = req.params

    const repository = await checkIfRepositoryisEmpty(userId, repositoryId, res)

    req.repository = repository

    next()
}

async function deleteRepository(req, res, next) {
    const { userId, repositoryId } = req.params

    const repository = await checkIfRepositoryisEmpty(userId, repositoryId, res)

    req.repository = repository

    next()
}

module.exports = {
    create,
    show,
    update,
    deleteRepository
}