import cx from 'classnames'
import { Message } from 'types'
import { Confetti } from './Confetti'
import { useContext } from 'react'
import { Context } from './ContextProvider'
import { makeRandom } from '@herbcaudill/random'

export const MessageDisplay = () => {
  const { state } = useContext(Context)
  const { message, words } = state
  const wordCount = words.length
  if (!message) return null

  const gameOver = message.type === 'FOUND_SOLUTION'
  const error = message.type === 'ERROR'

  return (
    <div>
      {gameOver && wordCount < 3 ? <Confetti /> : null}
      <div className="flex justify-center items-center mt-2 h-10 relative ">
        <div
          className={cx(
            'Message',
            'absolute bottom-[10px]',
            'whitespace-nowrap text-center text-sm tracking-wide',
            'py-1 px-4 rounded border border-black',
            {
              'animate-rise opacity-0': !gameOver,
              'animate-celebrate': gameOver,
              'bg-black text-white': error,
              'bg-white text-black': !error,
            }
          )}
          style={{ transform: 'scale3d(1,1,1)' }}
        >
          {getMessageText(message)}
        </div>
      </div>
    </div>
  )
}

const getMessageText = (message: Message) => {
  const random = makeRandom()
  switch (message.type) {
    case 'FOUND_WORD': {
      const length = message.word.length
      return length < 4
        ? random.pick(['OK', 'Not bad'])
        : length < 7
        ? random.pick(['Nice!', 'Awesome!', 'Sweet!'])
        : random.pick(['Genius!!', 'Amazing!!', 'Incredible!!'])
    }

    case 'FOUND_SOLUTION': {
      const words = message.words
      return (
        <>
          {words.length === 2 && <span className="text-xl">🎉</span>}
          You found a solution in <strong>{words.length}</strong> words!
        </>
      )
    }

    case 'ERROR': {
      return message.details
    }
  }
}
