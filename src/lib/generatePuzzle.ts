import { makeRandom } from '@herbcaudill/random'
import { generateLayout } from './generateLayout'
import { Puzzle } from 'types'
import { generateRandomSolution } from './generateRandomSolution'

export const generatePuzzle = (seed = Math.random().toString()): Puzzle => {
  const random = makeRandom(seed)
  const solution = generateRandomSolution(seed)
  try {
    const layout = generateLayout(solution, seed)
    return { solution, layout } as Puzzle
  } catch (e) {
    // if we can't find a valid layout, we'll just try again with a new seed
    return generatePuzzle(random.alpha(10))
  }
}
