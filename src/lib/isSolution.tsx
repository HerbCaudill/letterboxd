import { distinctLetterCount } from './words'

export const isSolution = (words: string[]) => distinctLetterCount(words.join('')) === 12
