const { ApolloServer, gql } = require('apollo-server')
const words = require('../data.json')

const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    meaning: String!
    author: String!
  }

  type Query {
    words(initial: String): [Word]
    meanings: [String]
  }
`

const resolvers = {
  Query: {
    words: (_parent, args) => {
      return args.initial
        ? words.filter(({ word }) => word.charAt(0) == args.initial)
        : words
    },
    meanings: () => {
      return words.map(({ meaning }) => meaning)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
