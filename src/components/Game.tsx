import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout, State } from 'types'
import { Cursor } from './Cursor'
import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { layoutToString } from 'lib/generateLayout'

export const Game = ({ layout }: Props) => {
  const initialState: State = {
    layout,
    words: [],
    currentWord: '',
    error: null,
  }

  console.log(layoutToString(layout))
  const [state, dispatch] = useReducer(reducer, initialState)

  const letters = layout.flatMap(side => Array.from(side))

  const nextLetterCanBe = (letter: string) => {
    console.log('nextLetterCanBe', { letter, state })
    letter = letter.toUpperCase()

    // letter must be in layout
    if (!letters.includes(letter)) return false

    // if current word is empty, any letter in the layout is valid
    if (state.currentWord.length === 0) {
      console.log('current word is empty')
      return true
    }

    // otherwise, letter must be not be on the same side as the previous letter
    const prevLetter = state.currentWord.slice(-1)
    const prevLetterSide = layout.find(side => side.has(prevLetter))

    console.log({ prevLetter, prevLetterSide })
    return !prevLetterSide?.has(letter)
  }

  useKeyboard(({ key }: KeyboardEvent) => {
    if (isAlpha(key) && nextLetterCanBe(key)) dispatch({ type: 'ADD', letter: key.toUpperCase() })
    else if (key === 'Delete' || key === 'Backspace') dispatch({ type: 'DELETE' })
    else if (key === 'Enter') dispatch({ type: 'ENTER' })
  })

  const size = 525
  const squareSize = size * 0.5
  const origin = (size - squareSize) / 2
  const bubbleSize = squareSize * 0.03
  const stroke = squareSize * 0.012
  const fontSize = squareSize * 0.11

  const bubbles = (side: 'top' | 'bottom' | 'left' | 'right') => {
    const xOffset = side === 'left' ? -fontSize * 0.6 : side === 'right' ? fontSize * 0.6 : 0
    const yOffset =
      side === 'top' ? -fontSize * 0.6 : side === 'bottom' ? fontSize * 1.4 : fontSize * 0.3

    // alignment of text
    const textAnchor =
      side === 'left'
        ? 'end' // left side: right align
        : side === 'right'
        ? 'start' // right side: left align
        : 'middle' // top & bottom sides: center align

    const sidePosition = origin + squareSize * (side === 'top' || side === 'left' ? 0 : 1)
    return [0, 1, 2].map(i => {
      const bubblePosition = origin + (squareSize * (1 + 2 * i)) / 6
      return {
        xOffset,
        yOffset,
        textAnchor,
        side,
        ...(side === 'top' || side === 'bottom'
          ? { x: bubblePosition, y: sidePosition }
          : { x: sidePosition, y: bubblePosition }),
      }
    })
  }

  const Bubble = ({ x, y }: { x: number; y: number }) => (
    <circle cx={x} cy={y} r={bubbleSize} fill="white" stroke="black" strokeWidth={stroke} />
  )

  const scale = 25

  return (
    <>
      <div className={`select-none`}>
        <div
          className="border-b-[3px] h-12 border-black flex justify-center content-center items-center font-bold"
          style={{ height: scale * 2 }}
        >
          <div style={{ fontSize: scale, lineHeight: 1 }}>{state.currentWord}</div>
          {/* cursor */}
          <div
            className="bg-black animate-blink ml-1"
            style={{ top: scale * 0.2, width: 3, height: scale * 1.2 }}
          ></div>
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
          // white circles with black borders
          {[...bubbles('top'), ...bubbles('right'), ...bubbles('bottom'), ...bubbles('left')].map(
            ({ x, y, xOffset, yOffset, textAnchor }, i) => {
              // position of text relative to bubble
              return (
                <g key={i}>
                  <Bubble x={x} y={y} />
                  <text
                    x={x + xOffset}
                    y={y + yOffset}
                    style={{ fontSize }}
                    textAnchor={textAnchor}
                    className={`font-sans font-semibold fill-white`}
                  >
                    {letters[i]}
                  </text>
                </g>
              )
            }
          )}
        </svg>
      </div>
    </>
  )
}

type Props = {
  layout: Layout
}
