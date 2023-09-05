import { distinctLetters, generateRandomSolution } from './words'

export const generatePuzzle = (solution = generateRandomSolution()): Set<string>[] => {
  const letters = distinctLetters(solution)

  // this is not correct
  return [
    new Set(letters.slice(0, 3)),
    new Set(letters.slice(3, 6)),
    new Set(letters.slice(6, 9)),
    new Set(letters.slice(9, 12)),
  ]
}
