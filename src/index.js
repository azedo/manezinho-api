const { ApolloServer, gql } = require('apollo-server')
const WordsAPI = require('./datasources/words')

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
    words: (_, { initial }, { dataSources }) => {
      const words = dataSources.wordsAPI.getWords()
      return initial
        ? words.filter(({ word }) => word.charAt(0) == initial)
        : words
    },
    meanings: (_context, _args, { dataSources }) => {
      const words = dataSources.wordsAPI.getWords()
      return words.map(({ meaning }) => meaning)
    },
  },
  Mutation: {
    addWord: async (_, { word }) => {
      console.log({ word })
    },
  },
}

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
