import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout } from 'types'
import { Board } from './Board'
import { FoundWords } from './FoundWords'
import { MessageDisplay } from './MessageDisplay'
import { WordInput } from './WordInput'

export const App = ({ layout }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    layout,
    words: [],
    currentWord: '',
  })

  useKeyboard(({ key }: KeyboardEvent) => {
    if (isAlpha(key)) {
      dispatch({ type: 'ADD', letter: key.toUpperCase() })
    } else if (key === 'Delete' || key === 'Backspace') {
      dispatch({ type: 'DELETE' })
    } else if (key === 'Enter' || key === ' ') {
      dispatch({ type: 'ENTER' })
    } else if (key === 'Escape') {
      dispatch({ type: 'RESTART' })
    }
  })

  return (
    <div className="flex flex-col items-center h-screen bg-pink">
      <div className="py-12 px-4 container auto-mx flex flex-col max-w-lg gap-2 select-none ">
        <div className="h-12 w-full">
          <WordInput currentWord={state.currentWord} isError={state.message?.type === 'ERROR'} />
        </div>
        <div className="h-10">
          <MessageDisplay message={state.message} />
        </div>
        <div className="h-10 ">
          <FoundWords words={state.words} />
        </div>
        <div>
          <Board
            layout={state.layout}
            words={state.words}
            currentWord={state.currentWord}
            onAdd={letter => dispatch({ type: 'ADD', letter })}
          />
        </div>
      </div>
    </div>
  )
}

type Props = {
  layout: Layout
}
