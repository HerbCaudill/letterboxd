import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { useReducer, useState } from 'react'
import { reducer } from 'reducer'
import { Layout } from 'types'
import { Board } from './Board'
import { WordSequence } from './WordSequence'
import { MessageDisplay } from './MessageDisplay'
import { WordInput } from './WordInput'
import { History } from './History'
import { Solutions } from './Solutions'

export const App = ({ layout, solutions }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    layout,
    words: [],
    currentWord: '',
    history: [],
  })

  const [showSolutions, setShowSolutions] = useState(false)

  const add = (letter: string) => dispatch({ type: 'ADD', letter: letter.toUpperCase() })
  const backspace = () => dispatch({ type: 'BACKSPACE' })
  const enter = () => dispatch({ type: 'ENTER' })
  const restart = () => dispatch({ type: 'RESTART' })

  useKeyboard(({ key, altKey, ctrlKey, metaKey }: KeyboardEvent) => {
    const noModifiers = !altKey && !ctrlKey && !metaKey
    if (isAlpha(key) && noModifiers) add(key)
    else if (key === 'Enter' || key === ' ') enter()
    else if ((key === 'Delete' || key === 'Backspace') && noModifiers) backspace()
    else if ((key === 'Delete' || key === 'Backspace') && ctrlKey) restart()
    else if (key === 'Escape') restart()
  })

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-pink">
        <div className="py-12 px-8 container auto-mx flex flex-col max-w-lg gap-3 select-none ">
          <div className="h-10 flex min-w-full justify-center">
            <WordSequence words={state.words} />
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
            <button className="button" onClick={restart}>
              Restart
            </button>
            <button className="button" onClick={backspace}>
              Delete
            </button>
            <button className="button" onClick={enter}>
              Enter
            </button>
          </div>
        </div>
      </div>

      {/* lower sheet */}
      <div className="flex flex-col h-screen items-center bg-white">
        <div className="py-12 px-8 container auto-mx max-w-lg text-left flex flex-col gap-6 divide-y-2 divide-black">
          {/* history */}
          <History history={state.history} />

          {/* solutions */}
          <Solutions
            solutions={solutions}
            showSolutions={showSolutions}
            onChange={setShowSolutions}
          />
        </div>
      </div>
    </>
  )
}

type Props = {
  layout: Layout
  solutions: string[]
}
