const words = require('../data/words.json')
const { DataSource } = require('apollo-datasource')

class WordsAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {}

  getWords() {
    console.log({ words })
    return words
  }
}

module.exports = WordsAPI
