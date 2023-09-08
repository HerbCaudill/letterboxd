import cx from 'classnames'
import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout, State } from 'types'
import { Confetti } from './Confetti'

// constants
const size = 450
const squareSize = size * 0.6
const origin = (size - squareSize) / 2
const letterSize = squareSize * 0.11
const nodeSize = letterSize * 0.3
const stroke = letterSize * 0.1
const labelOffsetAmount = 0.7

const TOP = 'TOP'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'
const LEFT = 'LEFT'

const sides = [TOP, RIGHT, BOTTOM, LEFT]

export const Game = ({ layout }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    layout,
    words: [],
    currentWord: '',
  })

  useKeyboard(({ key }: KeyboardEvent) => {
    if (isAlpha(key)) dispatch({ type: 'ADD', letter: key.toUpperCase() })
    else if (key === 'Delete' || key === 'Backspace') dispatch({ type: 'DELETE' })
    else if (key === 'Enter' || key === ' ') dispatch({ type: 'ENTER' })
    else if (key === 'Escape') dispatch({ type: 'RESTART' })
  })

  const gameOver = state.message?.type === 'FOUND_SOLUTION'
  const error = state.message?.type === 'ERROR'

  const nodes = layout.flatMap((letters, i) => {
    const which = sides[i]

    // offset of text relative to node
    const labelOffset = {
      x:
        which === LEFT //
          ? -letterSize * labelOffsetAmount
          : which === RIGHT
          ? letterSize * labelOffsetAmount
          : // TOP or BOTTOM
            0,

      y:
        which === TOP //
          ? -letterSize * labelOffsetAmount
          : which === BOTTOM
          ? letterSize * labelOffsetAmount * 2
          : // LEFT or RIGHT
            letterSize * labelOffsetAmount * 0.5,
    }
    // alignment of text
    const labelAlignment =
      which === LEFT
        ? 'end' // left side: right align
        : which === RIGHT
        ? 'start' // right side: left align
        : // TOP or BOTTOM
          'middle' // top & bottom sides: center align

    const sidePosition = origin + squareSize * (which === TOP || which === LEFT ? 0 : 1)

    return Array.from(letters).map((letter, j) => {
      const nodePosition = origin + (squareSize * (1 + 2 * j)) / 6

      const position =
        which === TOP || which === BOTTOM
          ? { x: nodePosition, y: sidePosition }
          : { x: sidePosition, y: nodePosition }

      return {
        letter,
        position,
        labelOffset,
        labelAlignment,
      } as Node
    })
  })

  const nodeLookup = nodes.reduce(
    (result, node) => ({
      ...result,
      [node.letter]: node,
    }),
    {} as Record<string, Node>
  )

  const getPoints = (word: string): string => {
    return Array.from(word)
      .map(letter => {
        const { x, y } = nodeLookup[letter].position
        return `${x},${y}`
      })
      .join(' ')
  }

  const usedLetters = [...state.words, state.currentWord].flatMap(word => Array.from(word))

  return (
    <div className="flex flex-col w-full items-center py-12 max-w-sm select-none">
      {/* Input */}
      <div
        className={cx('flex justify-center content-center items-center w-full h-12', {
          'animate-shake': error,
        })}
        style={{ borderBottom: '3px solid black', height: letterSize * 2 }}
      >
        {/* letters */}
        <div className="font-bold" style={{ fontSize: letterSize, lineHeight: 1 }}>
          {state.currentWord}
        </div>
        {/* cursor */}
        <div
          className="bg-black animate-blink ml-1"
          style={{ top: 3, width: 3, height: letterSize }}
        />
      </div>

      {/* Message */}
      {gameOver && <Confetti />}
      <div className="flex justify-center items-center mt-2 h-10 relative ">
        {state.message && (
          <div
            className={cx(
              'absolute bottom-[10px]',
              'font-semibold whitespace-nowrap text-center text-sm tracking-wide',
              'py-1 px-4 rounded border border-black',
              {
                'animate-rise opacity-0': !gameOver,
                'animate-celebrate': gameOver,
                'bg-black text-white': error,
                'bg-white text-black': !error,
              }
            )}
          >
            {state.message.text}
          </div>
        )}
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
                <div key={`${i}-`} className="text-white text-sm font-bold">
                  &ndash;
                </div>
              )
            }
          </>
        ))}
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

          {/* lines linking letters in current word */}
          <polyline
            fill="none"
            className="stroke-pink"
            strokeWidth={stroke * 1.5}
            strokeDasharray={stroke * 3}
            points={getPoints(state.currentWord)}
          ></polyline>

          {/* lines linking letters in previous words */}
          {state.words.map((word, i) => (
            <polyline
              fill="none"
              className="stroke-pink"
              strokeWidth={stroke * 1.5}
              strokeOpacity={0.8 - (0.6 / state.words.length) * (state.words.length - i)}
              points={getPoints(word)}
            />
          ))}

          <g>
            {nodes.map(({ letter, position, labelOffset, labelAlignment }, i) => {
              const isUsed = usedLetters.includes(letter)
              return (
                <g key={`${i}`} onClick={() => dispatch({ type: 'ADD', letter })}>
                  {/* white circle with black border */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={nodeSize}
                    fill={isUsed ? 'black' : 'white'}
                    stroke={isUsed ? 'white' : 'black'}
                    strokeWidth={stroke}
                  />
                  {/* letter */}
                  <text
                    x={position.x + labelOffset.x}
                    y={position.y + labelOffset.y}
                    className={cx('font-sans font-semibold')}
                    style={{ fontSize: letterSize, lineHeight: 1 }}
                    fill={isUsed ? 'black' : 'white'}
                    textAnchor={labelAlignment}
                  >
                    {letter}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}

type Props = {
  layout: Layout
}

type Node = {
  letter: string
  position: { x: number; y: number }
  labelOffset: { x: number; y: number }
  labelAlignment: 'start' | 'middle' | 'end'
}
