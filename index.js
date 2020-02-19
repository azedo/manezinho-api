const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  enum Status {
    AWESOME
    GOOD
    INTERESTING
    BAD
    HORRIBLE
  }

  type Author {
    id: ID!
    name: String!
  }

  type Phrase {
    id: ID!
    text: String!
    entryDate: String
    author: Author
    status: Status
    rating: Int
  }

  type Query {
    phrases: [Phrase]
    phrase(id: ID): Phrase
  }
`

const phrases = [
  {
    id: 'asdasd',
    text: 'Today is a fantastic day to play Ping-Pong',
    entryDate: '19-02-2020',
    author: { name: 'Eduardo' },
    rating: 3
  },
  {
    id: 'dsadsa',
    text: 'Real men know how to play Ping Pong',
    entryDate: '18-02-2020',
    author: { name: 'André' },
    rating: 5
  }
]

const resolvers = {
  Query: {
    phrases: () => {
      return phrases
    },
    phrase: (obj, { id }, context, info) => {
      const foundPhrase = phrases.find(phrase => {
        return phrase.id === id
      })

      return foundPhrase
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

server
  .listen({
    port: process.env.PORT || 4000
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`)
  })
