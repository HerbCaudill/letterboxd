import { makeRandom } from '@herbcaudill/random'
import fs from 'fs'
import { getLinesFromFile } from 'lib/getLinesFromFile'
import { uniq } from 'lodash'
import path from 'path'
import { generateLists } from './generateLists'

export const distinctLetters = (s: string) => uniq(s.replace(' ', ''))

export const distinctLetterCount = (s: string) => distinctLetters(s).length

export const hasDoubleLetters = (word: string) => {
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1]) return true
  }
  return false
}

if (!fs.existsSync(path.join(__dirname, '../data/common.txt'))) await generateLists()

export const commonWords = await getLinesFromFile('../data/common.txt')

const uncommonWords = await getLinesFromFile('../data/uncommon.txt')
export const allWords = commonWords.concat(uncommonWords)

const allWordsSet = new Set(allWords)
export const isValid = (word: string) => allWordsSet.has(word)
