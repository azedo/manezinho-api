import { ApolloServer } from 'apollo-server'
import { WordsAPI } from './datasources/words.js'
import typeDefs from './schema.js'
import resolvers from './resolvers.js'

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
