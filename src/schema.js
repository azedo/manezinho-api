const { gql } = require('apollo-server')

module.exports = gql`
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
