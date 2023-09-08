import { Reducer } from 'react'
import { Layout, State } from 'types'
import { distinctLetterCount, isValid } from './lib/words'
import { makeRandom } from '@herbcaudill/random'

const random = makeRandom()

export const reducer: Reducer<State, Action> = (state, action) => {
  state.message = undefined

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
      if (state.words.length === 0) {
        // this is the only word, so we can delete the last letter,
        // going all the way back to the beginning
        return {
          ...state,
          currentWord: state.currentWord.slice(0, -1),
        }
      } else {
        if (state.currentWord.length === 1) {
          // if there's just one letter, it has to be the same as the last letter of the previous
          // word; so we discard this word and go back to the previous one
          const currentWord = state.words[state.words.length - 1]
          const words = state.words.slice(0, -1)
          return {
            ...state,
            words,
            currentWord,
          }
        } else {
          // otherwise, we can just delete the last letter of this word
          return {
            ...state,
            currentWord: state.currentWord.slice(0, -1),
          }
        }
      }
    }

    case 'ENTER': {
      if (state.currentWord.length === 0) return state

      // check if current word is valid
      const validationResult = validate(state.currentWord)
      if (validationResult.isValid) {
        const words = [...state.words, state.currentWord]
        // check if we've found a solution
        if (isSolution(words)) {
          return {
            ...state,
            words,
            currentWord: '',
            message: {
              text: `You found a solution in ${words.length} words!`,
              type: 'FOUND_SOLUTION',
            },
          }
        }
        // start a new word starting with the last letter of the previous word
        else
          return {
            ...state,
            words,
            currentWord: lastLetter(state.currentWord),
            message: {
              text:
                state.currentWord.length < 7
                  ? random.pick(['Nice!', 'Awesome!', 'Sweet!'])
                  : random.pick(['Genius!', 'Amazing!', 'Incredible!']),
              type: 'FOUND_WORD',
            },
          }
      } else {
        return {
          ...state,
          message: { text: validationResult.error, type: 'ERROR' },
        }
      }
    }

    case 'RESTART': {
      // start over
      return {
        ...state,
        words: [],
        currentWord: '',
      }
    }
  }

  return state
}

/** Checks if a letter that has been typed is valid in context */
const nextLetterCanBe = (letter: string, state: State) => {
  letter = letter.toUpperCase()

  // must be one of the letters in the board layout
  if (!state.layout.some(letters => letters.has(letter))) return false

  // if current word is empty, any letter in the layout is valid
  if (state.currentWord.length === 0) return true

  // otherwise, letter must be not be on the same side as the previous letter
  const prevLetter = state.currentWord.slice(-1)
  const prevLetterSide = state.layout.find(side => side.has(prevLetter))
  return !prevLetterSide?.has(letter)
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

const isSolution = (words: string[]) => distinctLetterCount(words.join('')) === 12

export type Action =
  | {
      type: 'ADD'
      letter: string
    }
  | { type: 'DELETE' }
  | { type: 'ENTER' }
  | { type: 'RESTART' }

export const lastLetter = (word: string) => (word.length > 0 ? word[word.length - 1] : '')
