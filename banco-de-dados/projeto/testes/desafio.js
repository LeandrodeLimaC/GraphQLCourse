const db = require('../config/db')

const getUserByEmail = async (email) => {
    const userFound = await db('usuarios')
        .where({ email })
        .first()

    return userFound
}

const getPerfilByName = async (nome) => {
    const perfilFound = await db('perfis')
        .where({ nome })
        .first()

    return perfilFound
}

const getRelationUser_Perfil = async (usuario_id, perfil_id) => {
    const relationFound = await db('usuarios_perfis')
        .where({
            usuario_id,
            perfil_id
        })
        .first()

    return relationFound
}

async function salvarUsuario(nome, email, senha) {
    const userAlreadyExists = await getUserByEmail(email)

    if (userAlreadyExists) {
        await db('usuarios').where({ email }).update({ nome, senha })
    } else {
        const novoUsuario = { nome, email, senha }
        await db('usuarios').insert(novoUsuario)
    }

    return await getUserByEmail(email)
}

async function salvarPerfil(nome, rotulo) {
    const perfilAlreadyExists = await getPerfilByName(nome)

    if (perfilAlreadyExists) {
        await db('perfis').where({ nome }).update({ rotulo })
    } else {
        const novoPerfil = { nome, rotulo }
        await db('perfis').insert(novoPerfil)
    }

    return await getPerfilByName(nome)
}

async function adicionarPerfis(usuario, ...perfis) {
    const userAlreadyExists = await getUserByEmail(usuario.email)
    if (!userAlreadyExists)
        throw Error("Usuario não encontrado")

    for (perfil of perfis) {
        const perfilAlreadyExists = await getPerfilByName(perfil.nome)
        if (!perfilAlreadyExists)
            throw Error("Perfil não encontrado")

        const userAlreadyAssignToPerfil = await getRelationUser_Perfil(usuario.id, perfil.id)
        if (userAlreadyAssignToPerfil)
            throw Error("Perfil já atribuido ao usuario")

        await db('usuarios_perfis')
            .insert({
                usuario_id: usuario.id,
                perfil_id: perfil.id
            })
    }
}

async function executar() {
    const usuario = await salvarUsuario('Ana',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh2', 'Pessoal')
    const perfilB = await salvarPerfil('fin3', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())