const db = require('../config/db');

const novoUsuario = {
    nome: 'Pedro',
    email: 'pedro@empresa.com.br',
    senha: '123456'
}

async function exercicio() {
    // Count
    const { qtde } = await db('usuarios')
        .count('* as qtde')
        .first()

    // Inserir (se a tabela estiver vazia)
    if (qtde === 0) {
        await db('usuarios').insert(novoUsuario)
    }

    // Consultar
    let { id } = await db('usuarios')
        .select('id')
        .limit(1)
        .first()

    // Alterar
    await db('usuarios')
        .where({ id })
        .update({
            nome: 'Pedro Garcia',
            email: 'pedro.garcia@empresa.com.br'
        })

    return db('usuarios').where({ id })
}

exercicio()
    .then(console.log)
    .finally(() => db.destroy())