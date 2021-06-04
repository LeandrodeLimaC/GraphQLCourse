const { perfis } = require('../data/db')

module.exports = {
    salario(usuario) {
        return usuario.salario_real
    },
    perfil(usuario) {
        const result = perfis.filter(perfil => perfil.id === usuario.perfil_id)
        return result[0]
    }
}