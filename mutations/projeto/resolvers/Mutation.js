const { usuarios, proximoId } = require('../data/db')

const indiceUsuario = function (filtro) {
    if (!filtro) return -1

    const { id, email } = filtro

    if (id) return usuarios.findIndex(usuario => usuario.id === id)
    if (email) return usuarios.findIndex(usuario => usuario.email === email)

    return -1
}

module.exports = {
    // { nome, email, idade }
    novoUsuario(_, { dados }) {
        const emailExistente = usuarios.some(usuario => usuario.email === dados.email)

        if (emailExistente)
            throw new Error('Email já cadastrado')

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    },

    excluirUsuario(_, { filtro }) {
        const i = indiceUsuario(filtro)
        if (i < 0) return null

        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },

    alterarUsuario(_, args) {
        const i = usuarios.findIndex(usuario => usuario.id === args.id)

        const usuario = {
            ...usuarios[i],
            ...args
        }

        usuarios.splice(i, 1, usuario)
        return usuarios[i]
    }
}