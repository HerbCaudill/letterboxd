import { isValid } from './words'

export const validateWord = (word: string): ValidationResult => {
  if (word.length < 3) {
    return { isValid: false, error: 'Too short' }
  } else if (!isValid(word)) {
    return { isValid: false, error: 'Not a word' }
  }
  return { isValid: true }
}
type ValidationResult =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: string
    }
