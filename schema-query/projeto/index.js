const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date
    
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: ID
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