const db = require('../config/db')

// db('perfis')
//     .then(res => res.map(p => p.nome))
//     .then(console.log)
//     .finally(() => db.destroy())

db('perfis').select('nome', 'id')
    .then(console.log)
    .finally(() => db.destroy())
