import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout, State } from 'types'
import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'

// constants
const size = 450
const squareSize = size * 0.6
const origin = (size - squareSize) / 2
const letterSize = squareSize * 0.11
const bubbleSize = letterSize * 0.3
const stroke = letterSize * 0.1
const offset = 0.7

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
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useKeyboard(({ key }: KeyboardEvent) => {
    if (isAlpha(key)) dispatch({ type: 'ADD', letter: key.toUpperCase() })
    else if (key === 'Delete' || key === 'Backspace') dispatch({ type: 'DELETE' })
    else if (key === 'Enter') dispatch({ type: 'ENTER' })
    else if (key === 'Esc') dispatch({ type: 'RESTART' })
  })

  return (
    <div className="flex flex-col w-full items-center py-12 max-w-sm select-none border">
      {/* Input */}
      <div
        className={`
          flex justify-center content-center items-center w-full h-12 
          ${state.message?.type === 'ERROR' ? 'animate-shake' : ''}
          `}
        style={{ borderBottom: '3px solid black', height: letterSize * 2 }}
      >
        <div className="font-bold" style={{ fontSize: letterSize, lineHeight: 1 }}>
          {state.currentWord}
        </div>
        {/* cursor */}
        <div
          className="bg-black animate-blink ml-1"
          style={{ top: 3, width: 3, height: letterSize }}
        />
      </div>

      {/* Found words */}
      <div className="mt-2 h-10 flex flex-row flex-wrap min-w-full gap-1 justify-center ">
        {state.words.map((word, i) => (
          <>
            <div key={i} className="text-md tracking-wide font-sans">
              {word}
            </div>
            {
              // add dash after all but last word
              i < state.words.length - 1 && (
                <div className="text-white text-sm font-bold">&ndash;</div>
              )
            }
          </>
        ))}
      </div>

      {/* Message */}
      <div className="flex justify-center items-center mt-2 h-10 relative ">
        {state.message && (
          <div
            className={`
              absolute opacity-0 animate-pop 
              font-semibold whitespace-nowrap text-center text-sm tracking-wide
              ${state.message.type === 'ERROR' ? 'bg-black text-white' : 'bg-white text-black'}
              py-1 px-4
              rounded border border-black `}
          >
            {state.message.text}
          </div>
        )}
      </div>

      {/* Board */}
      <div>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* white square with black borders */}
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
                ? letterSize * offset * 2
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

            return Array.from(letters).map((letter, j) => {
              const bubblePosition = origin + (squareSize * (1 + 2 * j)) / 6

              const position =
                which === TOP || which === BOTTOM
                  ? { x: bubblePosition, y: sidePosition }
                  : { x: sidePosition, y: bubblePosition }

              return (
                <g key={`${i}_${j}`} onClick={() => dispatch({ type: 'ADD', letter })}>
                  {/* white circle with black border */}
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
                    style={{ fontSize: letterSize, lineHeight: 1 }}
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
    </div>
  )
}

type Props = {
  layout: Layout
}
