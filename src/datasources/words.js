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

  addWord(newWord) {
    if (words.filter(({ word }) => word === newWord.word).length > 0) {
      return new Error('Word already exists')
    }
    newWord.id = uuid()
    words.push(newWord)
    return newWord
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
