import fs from 'fs'
import path from 'path'
import { uniq } from 'lodash'

const getLinesFromFile = (relativePath: string) => {
  const filePath = path.join(__dirname, relativePath)
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  const lines: string[] = []
  let lastLineOfChunk = ''
  fileStream.on('data', (chunk: string) => {
    const chunkLines = chunk.split('\n')
    chunkLines[0] = lastLineOfChunk + chunkLines[0]
    lastLineOfChunk = chunkLines.pop() || ''
    lines.push(...chunkLines.map(l => l.trim()))
  })
  return new Promise<string[]>((resolve, reject) => {
    fileStream.on('end', () => {
      if (lastLineOfChunk) lines.push(lastLineOfChunk)
      resolve(lines)
    })
    fileStream.on('error', reject)
  })
}

export const distinctLetters = (s: string) => uniq(s.replace(' ', ''))
export const distinctLetterCount = (s: string) => distinctLetters(s).length

const scrabbleWords = new Set(await getLinesFromFile('./data/scrabble.txt'))

const isValid = (word: string) => scrabbleWords.has(word)

export const validWords = (await getLinesFromFile('./data/all.txt')).filter(isValid)

const hasDoubleLetters = (word: string) => {
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1]) return true
  }
  return false
}

export const candidateWords = (await getLinesFromFile('./data/frequent.txt')) //
  .filter(w => !hasDoubleLetters(w))
  .filter(isValid)

export function* solutionsGenerator() {
  for (const w1 of candidateWords) {
    const finalLetter = w1.substring(w1.length - 1, w1.length)
    for (const w2 of candidateWords.filter(w2 => w2.startsWith(finalLetter))) {
      const pair = w1 + ' ' + w2
      if (distinctLetterCount(pair) === 12) {
        yield pair
      }
    }
  }
}

// // this file is generated using `solutionsGenerator`
export const solutions = await getLinesFromFile('./data/solutions.txt')
