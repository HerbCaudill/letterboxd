import { Layout } from 'types'
import { commonWords, allWords, distinctLetterCount } from './words'

export const solvePuzzle = (layout: Layout, options: SolveOptions = {}) => {
  const { onlyCommonWords = false, length = 2 } = options

  const candidates = candidateWords(layout, { onlyCommonWords }) // the only words we're interested in are ones that work with the layout

  const solve = (sequence: string[] = []): string[][] => {
    if (sequence.length === length) return [sequence]
    const joinedSequence = sequence.join('')
    const prevWord = sequence.length > 0 ? sequence[sequence.length - 1] : undefined

    const nextCandidates: string[] = []

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i]
      if (prevWord && !prevWord.endsWith(candidate[0])) continue
      if (sequence.length === length - 1 && distinctLetterCount(joinedSequence + candidate) !== 12)
        continue

      nextCandidates.push(candidate)
    }

    return nextCandidates.flatMap(word => solve(sequence.concat(word)))
  }

  return solve().map(words => words.join(' '))
}

export const candidateWords = (layout: Layout, options: WordlistOptions = {}) => {
  const { onlyCommonWords = false } = options
  const letters = new Set(layout.flatMap(side => Array.from(side)))
  return wordsOnlyContaining(letters, { onlyCommonWords }).filter(word =>
    noAdjacentLetters(word, layout)
  )
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
  length?: number
}
