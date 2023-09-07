import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout, State } from 'types'

export const Game = ({ layout }: Props) => {
  const initialState: State = {
    layout,
    words: [],
    currentWord: '',
    error: null,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const size = 525
  const squareSize = size * 0.5
  const origin = (size - squareSize) / 2
  const bubbleSize = squareSize * 0.03
  const stroke = squareSize * 0.012
  const fontSize = squareSize * 0.11

  const bubbles = [0, 1].flatMap(i =>
    [0, 1, 2].flatMap(j => {
      const bubblePosition = origin + (squareSize * (1 + 2 * j)) / 6
      const sidePosition = origin + squareSize * i
      return [
        // top/bottom * 3 horizontal bubbles
        { x: bubblePosition, y: sidePosition, side: i === 0 ? 'top' : 'bottom' },
        // left/right * 3 vertical bubbles
        { x: sidePosition, y: bubblePosition, side: i === 0 ? 'left' : 'right' },
      ]
    })
  )

  const letters = layout.flatMap(side => Array.from(side))

  const Bubble = ({ x, y }: { x: number; y: number }) => (
    <circle cx={x} cy={y} r={bubbleSize} fill="white" stroke="black" strokeWidth={stroke} />
  )

  return (
    <>
      <div className={`select-none`}>
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
          {bubbles.map(({ x, y, side }, i) => {
            // position of text relative to bubble
            const xOffset =
              side === 'left' ? -fontSize * 0.6 : side === 'right' ? fontSize * 0.6 : 0
            const yOffset =
              side === 'top' ? -fontSize * 0.6 : side === 'bottom' ? fontSize * 1.4 : fontSize * 0.3

            // alignment of text
            const textAnchor =
              side === 'left'
                ? 'end' // left side: right align
                : side === 'right'
                ? 'start' // right side: left align
                : 'middle' // top & bottom sides: center align

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
          })}
        </svg>
      </div>
    </>
  )
}

type Props = {
  layout: Layout
}
