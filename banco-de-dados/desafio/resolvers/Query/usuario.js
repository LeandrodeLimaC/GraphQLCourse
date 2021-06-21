const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return await db('usuarios')
    },
    async usuario(_, { filtro }) {
        const { id, email } = filtro

        if (id) return db('usuarios').where({ id }).first()
        if (email) return db('usuarios').where({ email }).first()

        throw new Error("Filtro utilizado é invalido")
    },
}