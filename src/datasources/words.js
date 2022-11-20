import wordsData from '../data/words.json' assert { type: 'json' }
import { DataSource } from 'apollo-datasource'
import { v4 as uuid } from 'uuid'

let words = wordsData.map((word) => ({
  ...word,
  id: word.id.toString(),
}))
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

  updateWord(id, newMeaning) {
    words = words.map((word) =>
      id === word.id
        ? {
            ...word,
            meaning: newMeaning,
          }
        : word
    )
    return words.filter(({ id: wordId }) => id === wordId)[0]
  }
}
