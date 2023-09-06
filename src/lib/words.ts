import { commonWords } from '../data/common.json'
import { uncommonWords } from '../data/uncommon.json'

import { uniq } from 'lodash'

export const distinctLetters = (s: string) => uniq(s.replace(' ', ''))

export const distinctLetterCount = (s: string) => distinctLetters(s).length

export const hasDoubleLetters = (word: string) => {
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1]) return true
  }
  return false
}

export const allWords = commonWords.concat(uncommonWords)

const allWordsSet = new Set(allWords)
export const isValid = (word: string) => allWordsSet.has(word)
