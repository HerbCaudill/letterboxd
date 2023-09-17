import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { useContext, useState } from 'react'
import { add, backspace, enter, restart } from 'reducer'
import { Board } from './Board'
import { History } from './History'
import { MessageDisplay } from './MessageDisplay'
import { Solutions } from './Solutions'
import { Context } from './ContextProvider'
import { WordInput } from './WordInput'
import { WordSequence } from './WordSequence'

export const App = () => {
  const { state, dispatch } = useContext(Context)
  const { words } = state
  const [showSolutions, setShowSolutions] = useState(false)

  useKeyboard(({ key, altKey, ctrlKey, metaKey }: KeyboardEvent) => {
    const noModifiers = !altKey && !ctrlKey && !metaKey

    if (isAlpha(key) && noModifiers) dispatch(add(key))
    else if (key === 'Enter' || key === ' ') dispatch(enter)
    else if ((key === 'Delete' || key === 'Backspace') && noModifiers) dispatch(backspace)
    else if ((key === 'Delete' || key === 'Backspace') && ctrlKey) dispatch(restart)
    else if (key === 'Escape') dispatch(restart)
  })

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-pink-500">
        <div className="py-12 px-8 container auto-mx flex flex-col max-w-lg gap-3 select-none ">
          <div className="h-10 flex min-w-full justify-center">
            <WordSequence words={words} />
          </div>
          <div className="h-12 w-full px-4">
            <WordInput />
          </div>
          <div className="h-10">
            <MessageDisplay />
          </div>
          <div className="p-4 sm:p-12">
            <Board />
          </div>
          <div className="flex gap-8 justify-center">
            <button className="button" onClick={_ => dispatch(restart)} children="Restart" />
            <button className="button" onClick={_ => dispatch(backspace)} children="Delete" />
            <button className="button" onClick={_ => dispatch(enter)} children="Enter" />
          </div>
        </div>
      </div>

      {/* lower sheet */}
      <div className="flex flex-col h-screen items-center bg-white">
        <div className="py-12 px-8 container auto-mx max-w-lg text-left flex flex-col gap-6 ">
          <History />
          <Solutions showSolutions={showSolutions} onChange={setShowSolutions} />
        </div>
      </div>
    </>
  )
}
