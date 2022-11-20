module.exports = {
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
    addWord: async (_, { word }, { dataSources }) => {
      return dataSources.wordsAPI.addWord(word)
    },
    updateWord: async (_, { id, word }, { dataSources }) => {
      return dataSources.wordsAPI.updateWord(id, word)
    },
  },
}
