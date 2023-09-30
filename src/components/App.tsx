import { DateTimeFormatter, LocalDate } from '@js-joda/core'
import { Locale } from '@js-joda/locale_en-us'
import { useKeyboard } from 'hooks/useKeyboard'
import { isAlpha } from 'lib/isAlpha'
import { useContext, useState } from 'react'
import { add, backspace, enter, restart } from 'reducer'
import { Board } from './Board'
import { Context } from './ContextProvider'
import { History } from './History'
import { MessageDisplay } from './MessageDisplay'
import { Solutions } from './Solutions'
import { WordInput } from './WordInput'
import { WordSequence } from './WordSequence'
import { datePlus } from './datePlus'
import { getDate } from './getDate'
import { getUtcDate } from 'lib/getUtcDate'

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

  const date = getDate()
  const today = getUtcDate()

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
            <button
              className="button button-sm"
              onClick={_ => dispatch(restart)}
              children="Restart"
            />
            <button
              className="button button-sm"
              onClick={_ => dispatch(backspace)}
              children="Delete"
            />
            <button className="button button-sm" onClick={_ => dispatch(enter)} children="Enter" />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-screen items-center bg-white">
        <div className="flex flex-row items-center w-full gap-4 p-4 mb-4 border-b border-black">
          <a className="button button-xs" children="<" href={`?date=${datePlus(date, -1)}`} />
          <span className="text-sm font-semibold">
            {LocalDate.parse(date).format(
              DateTimeFormatter.ofPattern('MMMM d, yyyy').withLocale(Locale.ENGLISH)
            )}
          </span>

          <span className="flex-grow" />
          {today !== date && (
            <>
              <a className="button button-xs" children=">" href={`?date=${datePlus(date, 1)}`} />
              <a className="button button-xs" children="Today" href={`?date=${today}`} />
            </>
          )}
        </div>
        <div className="py-12 px-8 container auto-mx max-w-lg text-left flex flex-col gap-6 ">
          <History />
          <Solutions showSolutions={showSolutions} onChange={setShowSolutions} />
        </div>
      </div>
    </>
  )
}
