import words from '../data/words.json' assert { type: 'json' }
import { DataSource } from 'apollo-datasource'
import { v4 as uuid } from 'uuid'

export class WordsAPI extends DataSource {
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
