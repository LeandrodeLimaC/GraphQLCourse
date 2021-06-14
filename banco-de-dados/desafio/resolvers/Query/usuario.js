const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return await db('usuarios')
    },
    async usuario(_, { filtro }) {
        // implementar
    },
}