import { State } from 'types'

/** Checks if a letter that has been typed is valid in context */
export const nextLetterCanBe = (letter: string, state: State) => {
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
