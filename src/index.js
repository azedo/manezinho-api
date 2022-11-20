const { ApolloServer, gql } = require('apollo-server')
const WordsAPI = require('./datasources/words')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const dataSources = () => ({
  wordsAPI: new WordsAPI(),
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true,
})

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`)
  })
