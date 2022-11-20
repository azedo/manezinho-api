const words = require('../data/words.json')
const { DataSource } = require('apollo-datasource')

class WordsAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {}

  getWords() {
    return words
  }
}

module.exports = WordsAPI
