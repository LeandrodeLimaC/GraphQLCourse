const { usuarios, proximoId } = require('../../data/db')
const { indiceUsuario } = require('../../helpers/indiceUsuario')

module.exports = {
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

    alterarUsuario(_, { filtro, dados }) {
        const i = indiceUsuario(filtro)

        const usuario = {
            ...usuarios[i],
            ...dados
        }

        usuarios.splice(i, 1, usuario)
        return usuarios[i]
    }
}