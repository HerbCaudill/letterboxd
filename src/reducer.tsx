import { lastLetter } from 'lib/lastLetter'
import { isSolution } from 'lib/isSolution'
import { validateWord } from 'lib/validateWord'
import { nextLetterCanBe } from 'lib/nextLetterCanBe'
import { Reducer } from 'react'
import { removeDuplicateSequences } from 'lib/removeDuplicateSequences'
import { Layout, State } from 'types'

export const initializer = (layout: Layout): State => {
  return {
    layout,
    words: [],
    currentWord: '',
    history: [],
  }
}

export const reducer: Reducer<State, Action> = (state, action) => {
  const solutionFoundPreviously = isSolution(state.words)

  switch (action.type) {
    case 'ADD': {
      // If we've found a solution, start over
      if (solutionFoundPreviously)
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
      if (solutionFoundPreviously) {
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
      if (state.currentWord.length === 0) break
      const words = [...state.words, state.currentWord]
      const solutionFound = isSolution(words)
      // check if current word is valid
      const validationResult = validateWord(state.currentWord)
      if (validationResult.isValid) {
        // add current word to list of words
        const words = [...state.words, state.currentWord]
        return {
          ...state,
          words,
          currentWord: solutionFound //
            ? ''
            : lastLetter(state.currentWord),
          message: solutionFound
            ? { type: 'FOUND_SOLUTION', words }
            : { type: 'FOUND_WORD', word: state.currentWord },
          history: removeDuplicateSequences([...state.history, words]),
        }
      } else {
        return {
          ...state,
          message: { type: 'ERROR', details: validationResult.error },
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

export type Action =
  | { type: 'ADD'; letter: string }
  | { type: 'BACKSPACE' }
  | { type: 'ENTER' }
  | { type: 'RESTART' }

export const add = (letter: string): Action => ({ type: 'ADD', letter: letter.toUpperCase() })
export const backspace: Action = { type: 'BACKSPACE' }
export const enter: Action = { type: 'ENTER' }
export const restart: Action = { type: 'RESTART' }
