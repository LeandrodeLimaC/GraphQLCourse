import { ApoloServer, gql } from 'apollo-server'

const typeDefs = gql`

`

const resolvers = {}

const server = new ApoloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})