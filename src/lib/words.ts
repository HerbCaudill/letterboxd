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
const allWords = commonWords.concat(uncommonWords)

const allWordsSet = new Set(allWords)
export const isValid = (word: string) => allWordsSet.has(word)

export function generateRandomSolution(seed = Math.random().toString()) {
  const rand = makeRandom(seed)
  const w1 = rand.pick(commonWords)
  const finalLetter = w1.substring(w1.length - 1, w1.length)
  const pairs = commonWords
    .filter(w2 => w2.startsWith(finalLetter))
    .map(w2 => w1 + ' ' + w2)
    .filter(pair => distinctLetterCount(pair) === 12)
  if (pairs.length === 0) {
    // unable to find a solution with the starting word; try again with a new seed
    return generateRandomSolution(rand.alpha(20).toString())
  }
  return rand.pick(pairs)
}
