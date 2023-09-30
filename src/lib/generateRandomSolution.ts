import { makeRandom } from '@herbcaudill/random'
import { commonWords, distinctLetterCount } from './words'

export function generateRandomSolution(seed = Math.random().toString()) {
  const rand = makeRandom(seed)
  const w1 = rand.pick(commonWords)
  if (distinctLetterCount(w1) === 12) return w1
  const pairs = commonWords
    .filter(w2 => w1.endsWith(w2[0]))
    .map(w2 => `${w1} ${w2}`)
    .filter(pair => distinctLetterCount(pair) === 12)
  if (pairs.length === 0) {
    // unable to find a solution with the starting word; try again with a new seed
    const nextSeed = rand.alpha(20).toString()
    return generateRandomSolution(nextSeed)
  }
  return rand.pick(pairs)
}
