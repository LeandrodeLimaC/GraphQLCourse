const { usuarios, perfis } = require('../data/db')

module.exports = {
    ola() {
        return 'Olá Mundo! Bom dia!'
    },
    horaAtual() {
        return new Date
    },
    usuarioLogado() {
        return {
            id: 1,
            nome: 'Ana da Web',
            email: 'anadaweb@email.com',
            idade: 23,
            salario_real: 1234.56,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            nome: "Celular Xiaomi S9",
            preco: 1051.56,
            desconto: 0.15
        }
    },
    numerosMegaSena() {
        const crescente = (a, b) => a - b

        return Array(6).fill(0)
            .map(() => parseInt(Math.random() * 60 + 1))
            .sort(crescente)
    },
    usuarios() {
        return usuarios
    },
    usuario(_, { id }) {
        const selecionados = usuarios
            .filter(usuario => usuario.id === id)

        return selecionados ? selecionados[0] : null
    },
    perfis() {
        return perfis
    },
    perfil(_, { id }) {
        const result = perfis.filter(perfil => perfil.id === id)
        return result[0] || null
    }
}