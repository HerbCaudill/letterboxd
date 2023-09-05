import fs from 'fs'
import path from 'path'
import { getLinesFromFile } from 'lib/getLinesFromFile'
import { hasDoubleLetters } from 'lib/words'

export const frequentWords = await getLinesFromFile('../data/frequent.txt')
export const scrabbleWords = await getLinesFromFile('../data/scrabble.txt')

const commonFile = path.join(__dirname, '../data/common.txt')
const uncommonFile = path.join(__dirname, '../data/uncommon.txt')

fs.writeFileSync(commonFile, '')
fs.writeFileSync(uncommonFile, '')

for (const word of scrabbleWords) {
  if (hasDoubleLetters(word)) continue
  if (frequentWords.includes(word)) {
    fs.appendFileSync(commonFile, `${word}\n`)
  } else {
    fs.appendFileSync(uncommonFile, `${word}\n`)
  }
}
