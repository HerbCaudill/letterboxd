import fs from 'fs'
import { getLinesFromFile } from 'lib/getLinesFromFile'
import path from 'path'
import { hasDoubleLetters } from './words'

export async function generateLists() {
  // Our source data includes two word lists:
  //
  // - scrabble.txt contains all the words in the official English Scrabble dictionary
  // - frequency.txt contains frequency data for the most common words found in a large English corpus
  //
  // Any word in the scrabble list is considered valid. To generate puzzles, we only use valid scrabble words
  // that are relatively common, and that are at least 5 letters long.

  const scrabbleWords = new Set(await getLinesFromFile('../data/source/scrabble.txt'))

  const isValid = (word: string) => {
    return word.length > 2 && !hasDoubleLetters(word) && scrabbleWords.has(word)
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
    if (word.length > 4 && frequentWords.has(word)) {
      commonWords.push(word)
    } else {
      uncommonWords.push(word)
    }
  }

  fs.writeFileSync(path.join(__dirname, '../data/common.txt'), commonWords.join('\n'))
  fs.writeFileSync(path.join(__dirname, '../data/uncommon.txt'), uncommonWords.join('\n'))
}
