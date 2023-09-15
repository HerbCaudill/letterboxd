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

  const add = (letter: string) => dispatch({ type: 'ADD', letter: letter.toUpperCase() })
  const backspace = () => dispatch({ type: 'BACKSPACE' })
  const enter = () => dispatch({ type: 'ENTER' })
  const restart = () => dispatch({ type: 'RESTART' })

  useKeyboard(({ key }: KeyboardEvent) => {
    if (isAlpha(key)) add(key)
    else if (key === 'Delete' || key === 'Backspace') backspace()
    else if (key === 'Enter' || key === ' ') enter()
    else if (key === 'Escape') restart()
  })

  return (
    <div className="flex flex-col items-center h-screen bg-pink">
      <div className="py-12 px-8 container auto-mx flex flex-col max-w-lg gap-3 select-none ">
        <div className="h-10 ">
          <FoundWords words={state.words} />
        </div>
        <div className="h-12 w-full px-4">
          <WordInput currentWord={state.currentWord} isError={state.message?.type === 'ERROR'} />
        </div>
        <div className="h-10">
          <MessageDisplay message={state.message} wordCount={state.words.length} />
        </div>
        <div className="p-4 sm:p-12">
          <Board
            layout={state.layout}
            words={state.words}
            currentWord={state.currentWord}
            onAdd={letter => add(letter)}
          />
        </div>
        <div className="flex gap-8 justify-center">
          <button
            className="button"
            onClick={e => {
              restart()
            }}
          >
            Restart
          </button>
          <button
            className="button"
            onClick={e => {
              e.currentTarget.blur()
              backspace()
            }}
          >
            Delete
          </button>
          <button
            className="button"
            onClick={e => {
              e.currentTarget.blur()
              enter()
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

type Props = {
  layout: Layout
}
