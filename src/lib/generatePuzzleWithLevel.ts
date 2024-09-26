import { makeRandom } from '@herbcaudill/random'
import { Puzzle } from 'types'
import { solvePuzzle } from './solvePuzzle'
import { generatePuzzle } from './generatePuzzle'

const SALT = 'DBFF6CA2-4FB3-4469-A7F2-C7BBB9C3F794'

// harder levels have fewer solutions
export const levels = {
  expert: { minSolutions: 0, maxSolutions: 2 },
  hard: { minSolutions: 3, maxSolutions: 7 },
  medium: { minSolutions: 8, maxSolutions: 50 },
  easy: { minSolutions: 51, maxSolutions: 300 },
}

export const generatePuzzleWithLevel = (level: Level, seed = Math.random().toString()): Puzzle => {
  const { minSolutions, maxSolutions } = levels[level]
  const random = makeRandom(seed + SALT)
  const { solution, layout } = generatePuzzle(seed)

  const solutions = solvePuzzle(layout, { onlyCommonWords: true })
  if (solutions.length < minSolutions || solutions.length > maxSolutions) {
    return generatePuzzleWithLevel(level, random.alpha(10))
  } else {
    return { solution, layout } as Puzzle
  }
}

export type Level = keyof typeof levels
