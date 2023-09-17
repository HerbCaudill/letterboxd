import { generatePuzzleWithLevel, levels } from './generatePuzzleWithLevel'
import { solvePuzzle } from './solvePuzzle'

describe('generatePuzzleWithLevel', () => {
  const testLevel = (level: Level) => {
    it(`${level} puzzle`, () => {
      const { layout } = generatePuzzleWithLevel(level, `generatePuzzleWithLevel-${level}`)
      const solutions = solvePuzzle(layout, { onlyCommonWords: true })
      expect(solutions.length).toBeGreaterThanOrEqual(levels[level].minSolutions)
      expect(solutions.length).toBeLessThanOrEqual(levels[level].maxSolutions)
    })
  }

  testLevel('easy')
  testLevel('medium')
  testLevel('hard')
  testLevel('expert')
})
