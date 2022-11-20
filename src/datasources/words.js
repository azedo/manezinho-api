let words = require('../data/words.json')
const { DataSource } = require('apollo-datasource')
const { v4: uuid } = require('uuid')

class WordsAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {}

  getWords() {
    return words
  }

  addWord(word) {
    word.id = uuid()
    words.push(word)
    return word
  }

  updateWord(id, updatedWord) {
    words = words.map((word) =>
      id === word.id
        ? {
            ...word,
            ...updatedWord,
          }
        : word
    )
    const newWord = {
      id,
      ...updatedWord,
    }
    console.log({ newWord })
    return newWord
  }
}

module.exports = WordsAPI
