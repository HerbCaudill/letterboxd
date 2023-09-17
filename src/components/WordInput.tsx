import cx from 'classnames'
import { isError } from 'lodash'
import { useContext } from 'react'
import { Context } from './ContextProvider'

export const WordInput = () => {
  const { state } = useContext(Context)
  const { currentWord, message } = state
  const isError = message?.type === 'ERROR'
  return (
    <div
      className={cx(
        {
          'flex justify-center content-center items-center w-full h-[50px]': true,
          'animate-shake': isError,
        },
        'border-b-[3px] border-black'
      )}
    >
      {/* letters */}
      <div className="font-condensed font-bold text-[30px] tracking-widest">{currentWord}</div>
      {/* cursor */}
      <div className="bg-black animate-blink ml-1 w-[3px] h-[32px]" />
    </div>
  )
}
