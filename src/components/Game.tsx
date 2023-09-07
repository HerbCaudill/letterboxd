import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout, State } from 'types'
import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'

// constants
const size = 525
const squareSize = size * 0.5
const origin = (size - squareSize) / 2
const letterSize = squareSize * 0.11
const bubbleSize = letterSize * 0.3
const stroke = letterSize * 0.1
const offset = 0.6

const TOP = 'TOP'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'
const LEFT = 'LEFT'

const sides = [TOP, RIGHT, BOTTOM, LEFT]

export const Game = ({ layout }: Props) => {
  const initialState: State = {
    layout,
    words: [],
    currentWord: '',
    error: null,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const nextLetterCanBe = (letter: string) => {
    letter = letter.toUpperCase()

    // letter must be in layout
    if (!layout.some(letters => letters.has(letter))) return false

    // if current word is empty, any letter in the layout is valid
    if (state.currentWord.length === 0) {
      console.log('current word is empty')
      return true
    }

    // otherwise, letter must be not be on the same side as the previous letter
    const prevLetter = state.currentWord.slice(-1)
    const prevLetterSide = layout.find(side => side.has(prevLetter))
    return !prevLetterSide?.has(letter)
  }

  useKeyboard(({ key }: KeyboardEvent) => {
    if (isAlpha(key) && nextLetterCanBe(key)) dispatch({ type: 'ADD', letter: key.toUpperCase() })
    else if (key === 'Delete' || key === 'Backspace') dispatch({ type: 'DELETE' })
    else if (key === 'Enter') dispatch({ type: 'ENTER' })
  })

  return (
    <>
      <div className={`select-none`}>
        <div
          className="border-b-[3px] h-12 border-black flex justify-center content-center items-center font-bold"
          style={{ height: letterSize * 2 }}
        >
          <div style={{ fontSize: letterSize, lineHeight: 1 }}>{state.currentWord}</div>
          {/* cursor */}
          <div
            className="bg-black animate-blink ml-1"
            style={{ top: 3, width: 3, height: letterSize }}
          />
        </div>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          // white square with black borders
          <rect
            width={squareSize}
            height={squareSize}
            x={origin}
            y={origin}
            fill="white"
            stroke="black"
            strokeWidth={stroke}
          />
          {layout.flatMap((letters, i) => {
            const which = sides[i]

            // offset of text relative to bubble
            const xOffset =
              which === LEFT //
                ? -letterSize * offset
                : which === RIGHT
                ? letterSize * offset
                : // TOP or BOTTOM
                  0
            const yOffset =
              which === TOP //
                ? -letterSize * offset
                : which === BOTTOM
                ? letterSize * offset * 2.2
                : // LEFT or RIGHT
                  letterSize * offset * 0.5

            // alignment of text
            const textAnchor =
              which === LEFT
                ? 'end' // left side: right align
                : which === RIGHT
                ? 'start' // right side: left align
                : // TOP or BOTTOM
                  'middle' // top & bottom sides: center align

            const sidePosition = origin + squareSize * (which === TOP || which === LEFT ? 0 : 1)

            return Array.from(letters).map((letter, i) => {
              const bubblePosition = origin + (squareSize * (1 + 2 * i)) / 6

              const position =
                which === TOP || which === BOTTOM
                  ? { x: bubblePosition, y: sidePosition }
                  : { x: sidePosition, y: bubblePosition }

              return (
                <g>
                  {/* white circle with black borders */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={bubbleSize}
                    fill="white"
                    stroke="black"
                    strokeWidth={stroke}
                  />
                  {/* letter */}
                  <text
                    x={position.x + xOffset}
                    y={position.y + yOffset}
                    style={{ fontSize: letterSize }}
                    textAnchor={textAnchor}
                    className={`font-sans font-semibold fill-white`}
                  >
                    {letter}
                  </text>
                </g>
              )
            })
          })}
        </svg>
      </div>
    </>
  )
}

type Props = {
  layout: Layout
}
