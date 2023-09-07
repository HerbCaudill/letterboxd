import { Reducer } from 'react'
import { Layout, State } from 'types'
import { isValid } from './lib/words'

const nextLetterCanBe = (letter: string, state: State) => {
  letter = letter.toUpperCase()

  // letter must be in layout
  if (!state.layout.some(letters => letters.has(letter))) return false

  // if current word is empty, any letter in the layout is valid
  if (state.currentWord.length === 0) {
    return true
  }

  // otherwise, letter must be not be on the same side as the previous letter
  const prevLetter = state.currentWord.slice(-1)
  const prevLetterSide = state.layout.find(side => side.has(prevLetter))
  return !prevLetterSide?.has(letter)
}

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      // add letter to current word, if allowed
      if (nextLetterCanBe(action.letter, state))
        return {
          ...state,
          currentWord: state.currentWord + action.letter,
        }
      break
    }

    case 'DELETE': {
      // delete last letter from current word
      return {
        ...state,
        currentWord: state.currentWord.slice(0, -1),
      }
    }

    case 'ENTER': {
      // check if current word is valid
      const validationResult = validate(state.currentWord)
      if (validationResult.isValid) {
        // if so, start a new word starting with the last letter of the previous word
        return {
          ...state,
          words: [...state.words, state.currentWord],
          currentWord: lastLetter(state.currentWord),
          error: null,
        }
      } else {
        return {
          ...state,
          error: validationResult.error,
        }
      }
    }

    case 'CLEAR': {
      // start over
      return {
        ...state,
        words: [],
        currentWord: '',
      }
    }

    case 'CLEAR_ERROR': {
      // clear any errors
      return {
        ...state,
        error: null,
      }
    }
  }

  return state
}

type ValidationResult =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: string
    }

const validate = (word: string): ValidationResult => {
  if (word.length < 3) {
    return { isValid: false, error: 'Too short' }
  } else if (!isValid(word)) {
    return { isValid: false, error: 'Not a word' }
  }
  return { isValid: true }
}

export type Action =
  | {
      type: 'ADD'
      letter: string
    }
  | { type: 'DELETE' }
  | { type: 'ENTER' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ERROR' }

export const lastLetter = (word: string) => (word.length > 0 ? word[word.length - 1] : '')
