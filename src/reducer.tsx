import { makeRandom } from '@herbcaudill/random'
import { isSolution } from 'lib/isSolution'
import { Reducer } from 'react'
import { Layout, State } from 'types'
import { isValid } from './lib/words'

const random = makeRandom()

export const initializer = (layout: Layout): State => {
  return {
    layout,
    words: [],
    currentWord: '',
    history: [],
  }
}

export const reducer: Reducer<State, Action> = (state, action) => {
  const solutionFound = isSolution(state.words)

  switch (action.type) {
    case 'ADD': {
      // If we've found a solution, start over
      if (solutionFound)
        return {
          ...state,
          words: [],
          currentWord: state.layout.some(letters => letters.has(action.letter))
            ? action.letter
            : '',
          message: undefined,
        }
      // Add letter to current word, if allowed
      if (nextLetterCanBe(action.letter, state))
        return {
          ...state,
          currentWord: state.currentWord + action.letter,
          message: undefined,
        }
      break
    }

    case 'BACKSPACE': {
      state.message = undefined
      if (solutionFound) {
        // If we've found a solution, start over
        return {
          ...state,
          words: [],
          currentWord: '',
        }
      }
      if (state.words.length === 0) {
        // This is the only word, so we can delete the last letter,
        // going all the way back to the beginning
        return {
          ...state,
          currentWord: state.currentWord.slice(0, -1),
        }
      } else if (state.currentWord.length === 1) {
        // If there's just one letter, it has to be the same as the last letter of the previous
        // word, so we can't just backspace this letter and let the user enter a different one.
        // Instead we discard this word and go back to the previous one
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

    case 'ENTER': {
      // ignore if no word has been started
      if (state.currentWord.length === 0) return state

      // check if current word is valid
      const validationResult = validate(state.currentWord)
      if (validationResult.isValid) {
        // add current word to list of words
        const words = [...state.words, state.currentWord]

        const history = [...state.history, words]
          // remove any sequences of words that are contained in other sequences
          // e.g. if we have 'CAT TOE' AND 'CAT TOE EYE', we can remove 'CAT TOE'
          .filter((sequence, i, history): boolean => {
            const a = sequence.join('')
            return !history.some((otherSequence, j) => {
              const b = otherSequence.join('')
              if (a === b) return i < j // if there are exact duplicates, remove the earlier one
              else if (i !== j) return b.includes(a) // if there are subsets, remove the shorter one
              else return false
            })
          })

        // check if we've found a solution
        if (isSolution(words)) {
          return {
            ...state,
            words,
            currentWord: '',
            message: {
              text: (
                <>
                  {words.length === 2 && <span className="text-xl">🎉</span>}
                  You found a solution in <strong>{words.length}</strong> words!
                </>
              ),
              type: 'FOUND_SOLUTION',
            },
            history,
          }
        } else {
          // start a new word starting with the last letter of the previous word
          return {
            ...state,
            words,
            currentWord: lastLetter(state.currentWord),
            message: {
              text: getCongratulatoryMessage(state.currentWord.length),
              type: 'FOUND_WORD',
            },
            history,
          }
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
        message: undefined,
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

const getCongratulatoryMessage = (length: number) =>
  length < 4
    ? random.pick(['OK', 'Not bad'])
    : length < 7
    ? random.pick(['Nice!', 'Awesome!', 'Sweet!'])
    : random.pick(['Genius!!', 'Amazing!!', 'Incredible!!'])

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
  | { type: 'BACKSPACE' }
  | { type: 'ENTER' }
  | { type: 'RESTART' }

export const lastLetter = (word: string) => (word.length > 0 ? word[word.length - 1] : '')

export const add = (letter: string): Action => ({ type: 'ADD', letter: letter.toUpperCase() })

export const backspace: Action = { type: 'BACKSPACE' }
export const enter: Action = { type: 'ENTER' }
export const restart: Action = { type: 'RESTART' }
