const { usuarios, proximoId } = require('../data/db')

module.exports = {
    // { nome, email, idade }
    novoUsuario(_, args) {
        const emailExistente = usuarios.some(usuario => usuario.email === args.email)

        if (emailExistente)
            throw new Error('Email já cadastrado')

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    },

    excluirUsuario(_, { id }) {
        const i = usuarios.findIndex(usuario => usuario.id === id)
        if (i < 0) return null

        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    }
}