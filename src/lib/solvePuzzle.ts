import { Layout } from 'types'
import { commonWords, allWords, distinctLetterCount } from './words'

export const solvePuzzle = (layout: Layout, options: SolveOptions = {}) => {
  const { onlyCommonWords = false, maxLength = 2 } = options

  const candidates = candidateWords(layout, { onlyCommonWords }) // the only words we're interested in are ones that work with the layout

  const solve = (sequence: string[] = []): string[][] => {
    if (sequence.length === maxLength) return [sequence]

    const joinedSequence = sequence.join('')
    // we've already found a valid solution with fewer words
    if (distinctLetterCount(joinedSequence) === 12) return [sequence]

    const prevWord = sequence.length > 0 ? sequence[sequence.length - 1] : undefined
    const nextCandidates = candidates.filter(
      word =>
        !sequence.includes(word) &&
        (!prevWord || prevWord.endsWith(word[0])) &&
        (sequence.length < maxLength - 1 || distinctLetterCount(joinedSequence + word) === 12)
    )
    return nextCandidates.flatMap(word => solve(sequence.concat(word)))
  }

  return solve().map(words => words.join(' '))
}

/**
 * Returns all the words that could be used to solve the puzzle, given the layout
 */
export const candidateWords = (layout: Layout, options: WordlistOptions = {}) => {
  const { onlyCommonWords = false } = options
  const letters = new Set(layout.flatMap(side => Array.from(side)))
  return wordsOnlyContaining(letters, { onlyCommonWords }).filter(word =>
    noAdjacentLetters(word, layout)
  )
}

/**
 * Returns true if the word doesn't have any adjacent letters that are on the same side of the
 * given layout
 */
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
 */
export const wordsOnlyContaining = (
  letters: Set<string>,
  { onlyCommonWords = false }: WordlistOptions = {}
) => {
  const wordList = onlyCommonWords ? commonWords : allWords
  return wordList.filter(word => Array.from(word).every(letter => letters.has(letter)))
}

type WordlistOptions = {
  onlyCommonWords?: boolean
}

type SolveOptions = WordlistOptions & {
  maxLength?: number
}
