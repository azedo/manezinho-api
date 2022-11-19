const { ApolloServer, gql } = require('apollo-server')
const words = require('../data.json')

const typeDefs = gql`
  type Word {
    id: ID!
    word: String!
    meaning: String!
    username: String!
  }

  input WordInput {
    word: String!
    meaning: String!
    username: String!
  }

  type Query {
    words(initial: String): [Word]
    meanings: [String]
  }

  type Mutation {
    addWord(word: WordInput!): Word
    updateWord(id: ID!, word: WordInput!): Word
  }
`

const resolvers = {
  Query: {
    words: (_, { initial }) => {
      return initial
        ? words.filter(({ word }) => word.charAt(0) == initial)
        : words
    },
    meanings: () => {
      return words.map(({ meaning }) => meaning)
    },
  },
  Mutation: {
    addWord: async (_, { word }) => {
      console.log({ word })
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
