const { permissoes } = require('../data/db')

module.exports = {
    permissoes(perfil) {
        const result = perfil.permissoes_ids.map(
            id => permissoes.filter(permissao => permissao.id === id)[0]
        )

        return result
    }
}