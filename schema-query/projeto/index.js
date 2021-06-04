const { ApolloServer, gql } = require('apollo-server')

const perfis = [
    { id: 1, nome: 'Administrator' },
    { id: 2, nome: 'Comum' }
]

const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade: 29
}, {
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    idade: 31
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@uemail.com',
    idade: 24
}]

const typeDefs = gql`
    scalar Date
    
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }
    
    type Perfil {
        id: Int
        nome: String
    }
    
    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }
 
    # Pontos de entrada da sua API!
    type Query {
        ola: String!
        horaAtual: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]!
        usuario(id: Int): Usuario
        perfis: [Perfil]!
        perfil(id: Int): Perfil
    }
`

const resolvers = {
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
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})