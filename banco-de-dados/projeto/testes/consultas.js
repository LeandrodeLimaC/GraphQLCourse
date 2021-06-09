const db = require('../config/db')

// db('perfis')
//     .then(res => res.map(p => p.nome))
//     .then(console.log)
//     .finally(() => db.destroy())

// db('perfis').select('nome', 'id')
//     .then(console.log)
//     .finally(() => db.destroy())

// db.select('nome', 'id')
//     .from('perfis')
//     .then(console.log)
//     .finally(() => db.destroy())

db.select('nome', 'id')
    .from('perfis')
    .limit(4).offset(2)
    .then(console.log)
    .finally(() => db.destroy())