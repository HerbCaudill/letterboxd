import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout } from 'types'
import { Board } from './Board'
import { MessageDisplay } from './MessageDisplay'
import { WordInput } from './WordInput'
import { FoundWords } from './FoundWords'

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

  return (
    <div className="max-w-sm py-12 flex flex-col gap-2 items-center select-none ">
      {/* Input */}
      <WordInput currentWord={state.currentWord} isError={state.message?.type === 'ERROR'} />

      {/* Message */}
      <div className="h-10">
        <MessageDisplay message={state.message} />
      </div>

      {/* Found words */}
      <div className="h-10 ">
        <FoundWords words={state.words} />
      </div>

      <Board
        layout={state.layout}
        words={state.words}
        currentWord={state.currentWord}
        onAdd={letter => dispatch({ type: 'ADD', letter })}
      />
    </div>
  )
}

type Props = {
  layout: Layout
}
