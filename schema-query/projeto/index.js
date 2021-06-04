const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')

const perfis = [
    { id: 1, nome: 'Administrator', permissoes_ids: [1, 2, 3] },
    { id: 2, nome: 'Comum', permissoes_ids: [1, 3] }
]

const permissoes = [
    { id: 1, nome: 'leitura' },
    { id: 2, nome: 'escrita' },
    { id: 3, nome: 'execução' }
]

const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 2
}, {
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    idade: 31,
    perfil_id: 1
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@uemail.com',
    idade: 24,
    perfil_id: 2
}]

const resolvers = {
    Perfil: {
        permissoes(perfil) {
            const result = perfil.permissoes_ids.map(
                id => permissoes.filter(permissao => permissao.id === id)[0]
            )

            return result
        }
    },
    Produto: {
        precoComDesconto(produto) {
            let result;
            if (!produto.desconto)
                result = produto.preco

            result = produto.preco * (1 - produto.desconto);

            return result.toFixed(2)
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        },
        perfil(usuario) {
            const result = perfis.filter(perfil => perfil.id === usuario.perfil_id)
            return result[0]
        }
    },
    Query: {
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
}

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql'),
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})