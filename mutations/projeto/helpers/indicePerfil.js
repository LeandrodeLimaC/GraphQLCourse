const { perfis } = require('../data/db')

module.exports = {
    indicePerfil(filtro) {
        if (!filtro) return -1

        const { id, nome } = filtro

        if (id) return perfis.findIndex(perfil => perfil.id === id)
        if (nome) return perfis.findIndex(perfil => perfil.nome === nome)

        return -1
    }
}