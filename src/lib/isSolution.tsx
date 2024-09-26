import { distinctLetterCount } from './words'

export const isSolution = (words: string[]) => distinctLetterCount(words) === 12
