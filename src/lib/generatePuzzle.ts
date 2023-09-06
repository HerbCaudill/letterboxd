import { makeRandom } from '@herbcaudill/random'
import { commonWords, distinctLetterCount, distinctLetters } from './words'

export const generatePuzzle = (seed = Math.random().toString()) => {
  const random = makeRandom(seed)
  while (true) {
    const solution = generateRandomSolution(seed)
    try {
      const layout = generateLayout(solution, seed)
      return { solution, layout }
    } catch (e) {
      // if we can't find a valid layout, we'll just try again with a new seed
      seed = random.alpha(10)
    }
  }
}

export const generateLayout = (solution: string, seed = Math.random().toString()): Layout => {
  const random = makeRandom(seed)
  const layout = [] as Layout
  const adjacencyMap = getAdjacencyMap(solution)

  for (const letter of distinctLetters(solution)) {
    // for each letter, the options are:
    // (A) find an existing side that has room and doesn't contain any adjacent letters
    const options = layout.filter(
      side =>
        // side isn't full
        side.size < 3 &&
        // side doesn't contain any adjacent letters
        !Array.from(side).some(l => adjacencyMap[letter].has(l))
    )

    // OR (B) create a new side, if we don't have 4 yet
    if (layout.length < 4) options.push(new Set() as Side)

    // If there are no options, there are two possibilities:
    //   1. maybe if we'd made different choices earlier, we could find a valid layout
    //   2. maybe there's not a valid layout for this solution
    //
    // We could try to come up with a principled way of generating all possible layouts and then
    // picking one, in case this is the second possibility and there is a valid layout; but
    // solutions are cheap so we'll just throw an error and try again with a new one
    if (options.length === 0) throw new Error(`Unable to find a valid layout`)

    // otherwise we pick one of the options randomly
    const side = random.pick(options)
    if (side.size === 0) layout.push(side)
    side.add(letter)
  }

  return layout
}

/**
 * Returns a map of each letter to the letters that are adjacent to it in the given solution.
 * For example, for the solution "FREAKIEST THONGS", the map would look like this:
 *   F: [R]
 *   R: [F,E]
 *   E: [R,A,I,S]
 *   A: [E,K]
 *   K: [A,I]
 *   I: [K,E]
 *   S: [E,T,G]
 *   T: [S,H]
 *   H: [T,O]
 *   O: [H,N]
 *   N: [O,G]
 *   G: [N,S]
 */
export const getAdjacencyMap = (solution: string) => {
  // First we need to convert the solution into a single sequence of letters, removing the space
  // between the two words and eliminating the repeated letter in the middle, so for example
  // FREAKIEST THONGS -> FREAKIESTHONGS
  const sequence = solution
    .split(' ')
    .map((word, i) => {
      if (i === 0) return word
      else return word.substring(1)
    })
    .flatMap(word => word.split(''))

  // now we go through that sequence and build up the adjacency map
  return sequence.reduce((result, letter) => {
    const adjacentLetters = result[letter] || new Set<string>()
    let i = -1
    // find each instance of this letter in the sequence
    while (true) {
      i = sequence.indexOf(letter, i + 1)
      if (i === -1) break // no more instances of this letter
      if (i > 0) adjacentLetters.add(sequence[i - 1]) // if this isn't the first letter, the previous letter
      if (i < sequence.length - 1) adjacentLetters.add(sequence[i + 1]) // if this isn't the last letter, the next letter
    }
    return {
      ...result,
      [letter]: adjacentLetters,
    }
  }, {} as AdjacencyMap)
}

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

export type Side = Set<string> // each side has three letters; the order doesn't matter
export type Layout = Side[] // each layout has 4 sides; the order doesn't matter but we use an array for convenience
export type AdjacencyMap = { [letter: string]: Set<string> }
