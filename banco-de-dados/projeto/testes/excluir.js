const db = require('../config/db')

// Excluir por ID
// db('usuarios').where({ id: 1 })
//     .delete()
//     .then(console.log)
//     .finally(() => db.destroy())

// Excluir tudo
db('perfis')
    .delete()
    .then(console.log)
    .finally(() => db.destroy())
