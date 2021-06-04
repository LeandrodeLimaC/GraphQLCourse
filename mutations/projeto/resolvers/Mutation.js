const { usuarios, proximoId } = require('../data/db')

module.exports = {
    // { nome, email, idade }
    novoUsuario(_, args) {
        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    }
}