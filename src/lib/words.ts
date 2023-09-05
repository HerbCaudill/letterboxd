import { makeRandom } from '@herbcaudill/random'
import fs from 'fs'
import { getLinesFromFile } from 'lib/getLinesFromFile'
import { uniq } from 'lodash'
import path from 'path'

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
  return rand.pick(pairs)
}

async function generateLists() {
  // Our source data includes two word lists:
  //
  // - scrabble.txt contains all the words in the official English Scrabble dictionary
  // - frequency.txt contains frequency data for the most common words found in a large English corpus
  //
  // Any word in the scrabble list is considered valid. To generate puzzles, we only use valid scrabble words
  // that are relatively common.

  const scrabbleWords = new Set(await getLinesFromFile('../data/source/scrabble.txt'))

  const isValid = (word: string) => {
    return !hasDoubleLetters(word) && scrabbleWords.has(word)
  }
  const MAX_VOCABULARY = 30000

  const frequentWords = new Set(
    (await getLinesFromFile('../data/source/frequency.txt'))
      .slice(0, MAX_VOCABULARY)
      .map((l: string) => l.split('\t')[0])
      .filter(isValid)
  )

  const commonWords = []
  const uncommonWords = []

  for (const word of scrabbleWords) {
    if (hasDoubleLetters(word)) continue
    if (frequentWords.has(word)) {
      commonWords.push(word)
    } else {
      uncommonWords.push(word)
    }
  }

  fs.writeFileSync(path.join(__dirname, '../data/common.txt'), commonWords.join('\n'))
  fs.writeFileSync(path.join(__dirname, '../data/uncommon.txt'), uncommonWords.join('\n'))
}
