import { gql } from 'apollo-server'

export default gql`
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
    updateWord(id: ID!, meaning: String!): Word
  }
`
