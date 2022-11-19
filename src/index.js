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
    words: [Word]
    meanings: [String]
    wordsByInitial(initial: String!): [Word]!
  }
`

const resolvers = {
  Query: {
    words: () => {
      return words
    },
    meanings: () => {
      return words.map(({ meaning }) => meaning)
    },
    wordsByInitial: (initial) => {
      return words.filter(({ word }) => word.charAt(0) == initial)
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
