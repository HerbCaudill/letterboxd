import cx from 'classnames'
import { Layout } from 'types'

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

export const sides = [TOP, RIGHT, BOTTOM, LEFT]

export const Board = ({ layout, words, currentWord, onAdd }: Props) => {
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

  const usedLetters = [...words, currentWord].flatMap(word => Array.from(word))

  return (
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
        points={getPoints(currentWord)}
      ></polyline>

      {/* lines linking letters in previous words */}
      {words.map((word, i) => (
        <polyline
          fill="none"
          className="stroke-pink"
          strokeWidth={stroke * 1.5}
          strokeOpacity={0.8 - (0.6 / words.length) * (words.length - i)}
          points={getPoints(word)}
        />
      ))}

      <g>
        {nodes.map(({ letter, position, labelOffset, labelAlignment }, i) => {
          const isUsed = usedLetters.includes(letter)
          return (
            <g key={`${i}`} onClick={() => onAdd(letter)}>
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
  )
}

type Props = {
  layout: Layout
  words: string[]
  currentWord: string
  onAdd: (letter: string) => void
}

export type Node = {
  letter: string
  position: { x: number; y: number }
  labelOffset: { x: number; y: number }
  labelAlignment: 'start' | 'middle' | 'end'
}
