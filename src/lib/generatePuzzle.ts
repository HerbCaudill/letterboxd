import { makeRandom } from '@herbcaudill/random'
import { distinctLetters, generateRandomSolution } from './words'

export const generatePuzzle = (seed = Math.random().toString()) => {
  const random = makeRandom(seed)
  while (true) {
    const solution = generateRandomSolution(seed)
    try {
      const layout = generateLayout(solution, seed)
      return { solution, layout }
    } catch (e) {
      // if we can't find a valid layout, we'll just try again with a new seed
      console.log(`Unable to find a valid layout for ${solution}`)
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
    // (1) find an existing side that has room and doesn't contain any adjacent letters
    const options = layout.filter(
      side =>
        // side isn't full
        side.size < 3 &&
        // side doesn't contain any adjacent letters
        !Array.from(side).some(l => adjacencyMap[letter].has(l))
    )

    // OR (2) create a new side, if we don't have 4 yet
    if (layout.length < 4) options.push(new Set() as Side)

    if (options.length === 0) {
      // if there are no options, there are two possibilities:
      // - maybe if we'd made different choices earlier, we could find a valid layout
      // - maybe there's not a valid layout for this solution
      // not sure how to handle that yet
      // for now we'll just throw an error and the caller will have to choose a different solution
      throw new Error(`Unable to find a valid layout`)
    } else {
      // otherwise we pick an option randomly
      const side = random.pick(options)
      if (side.size === 0) layout.push(side)
      side.add(letter)
    }
  }

  return layout
}

export const getAdjacencyMap = (solution: string) => {
  const solutionSequence = solution
    .split(' ')
    .map((word, i) => {
      if (i === 0) return word
      else return word.substring(1)
    })
    .join('')

  return distinctLetters(solution).reduce<AdjacencyMap>((result, letter) => {
    const adjacentLetters = result[letter] || new Set<string>()
    let i = -1
    while (true) {
      i = solutionSequence.indexOf(letter, i + 1)
      if (i === -1) break
      if (i > 0) adjacentLetters.add(solutionSequence[i - 1])
      if (i < solutionSequence.length - 1) adjacentLetters.add(solutionSequence[i + 1])
    }
    result[letter] = adjacentLetters
    return result
  }, {})
}

export type Side = Set<string> // each side has three letters; the order doesn't matter
export type Layout = Side[] // each layout has 4 sides; the order doesn't matter but we use an array for convenience
export type AdjacencyMap = { [letter: string]: Set<string> }
