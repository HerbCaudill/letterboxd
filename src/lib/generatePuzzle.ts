import { makeRandom } from '@herbcaudill/random'
import { commonWords, distinctLetterCount } from './words'
import { generateLayout } from './generateLayout'

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

export function generateRandomSolution(seed = Math.random().toString()) {
  const rand = makeRandom(seed)
  const w1 = rand.pick(commonWords)
  const pairs = commonWords
    .filter(w2 => w1.endsWith(w2[0]))
    .map(w2 => `${w1} ${w2}`)
    .filter(pair => distinctLetterCount(pair) === 12)
  if (pairs.length === 0) {
    // unable to find a solution with the starting word; try again with a new seed
    return generateRandomSolution(rand.alpha(20).toString())
  }
  return rand.pick(pairs)
}
