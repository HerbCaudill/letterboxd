import cx from 'classnames'
import { Message } from 'types'
import { Confetti } from './Confetti'

export const MessageDisplay = ({ message, wordCount }: Props) => {
  if (!message) return null

  const gameOver = message.type === 'FOUND_SOLUTION'
  const error = message.type === 'ERROR'

  return (
    <div>
      {gameOver && wordCount < 3 ? <Confetti /> : null}
      <div className="flex justify-center items-center mt-2 h-10 relative ">
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
          {message.text}
        </div>
      </div>
    </div>
  )
}

type Props = {
  message?: Message
  wordCount: number
}
