const { perfis, proximoPerfilId } = require('../../data/db')
const { indicePerfil } = require('../../helpers/indicePerfil')

module.exports = {
    novoPerfil(_, { dados }) {
        const perfilExiste = perfis.some(perfil => perfil.nome === dados.nome)

        if (perfilExiste)
            throw new Error('Perfil já cadastrado')

        const novo = {
            id: proximoPerfilId(),
            ...dados
        }

        perfis.push(novo)
        return novo
    },

    alterarPerfil(_, { filtro, dados }) {
        const i = indicePerfil(filtro)

        if (i < 0)
            throw new Error('Perfil não existe')

        const novo = {
            ...perfis[i],
            ...dados
        }

        perfis.splice(i, 1, novo)
        return perfis[i]
    },

    excluirPerfil(_, { filtro }) {
        const i = indicePerfil(filtro)

        if (i < 0)
            throw new Error('Perfil não encontrado')

        const excluidos = perfis.splice(i, 1)
        return excluidos[0]
    }
}