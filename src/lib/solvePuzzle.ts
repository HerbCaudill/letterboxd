import { Layout } from 'types'
import { allWords, distinctLetterCount } from './words'

export const solvePuzzle = (layout: Layout) => {
  const candidates = candidateWords(layout)
  return candidates.flatMap(word1 => {
    return candidates
      .filter(word => word1.endsWith(word[0]))
      .map(word2 => `${word1} ${word2}`)
      .filter(pair => distinctLetterCount(pair) === 12)
  })
}

export const candidateWords = (layout: Layout) => {
  const letters = new Set(layout.flatMap(side => Array.from(side)))
  return wordsOnlyContaining(letters).filter(word => noAdjacentLetters(word, layout))
}

export const noAdjacentLetters = (word: string, layout: Layout) => {
  for (let i = 0; i < word.length - 1; i++) {
    const letter = word[i]
    const nextLetter = word[i + 1]
    const side = layout.find(side => side.has(letter))
    if (!side) throw new Error(`The letter ${letter} is not in the layout`)
    if (side.has(nextLetter)) return false
  }
  return true
}

/**
 * Returns all the valid words that only contain letters from the given set
 * @param letters
 * @returns
 */
export const wordsOnlyContaining = (letters: Set<string>) =>
  allWords.filter(word => word.split('').every(letter => letters.has(letter)))
