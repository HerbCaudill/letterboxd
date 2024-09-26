import { isSolution } from 'lib/isSolution'
import { WordSequence } from './WordSequence'
import { useContext } from 'react'
import { Context } from './ContextProvider'
import { distinctLetterCount } from 'lib/words'

export const History = () => {
  const { state, dispatch } = useContext(Context)
  const { history, layout } = state

  const allLetters = layout.map(side => [...side]).flat()

  return history.length > 0 ? (
    <div>
      <h2>
        <i>📝</i> You've found
      </h2>
      <div className="leading-loose divide-y">
        {history.map((words, i) => {
          const wordsLetters = words.join('').split('')
          const remainingLetters = allLetters.filter(l => !wordsLetters.includes(l))
          return (
            <div key={i} className="flex flex-row gap-2">
              <div
                className="flex-grow cursor-pointer"
                onClick={() => dispatch({ type: 'SET', words })}
                title="Click to restore"
              >
                <WordSequence words={words} />
              </div>
              {isSolution(words) ? (
                // celebration icon if solved
                <div className="flex items-center gap-2 font-black">
                  {words.length === 2 && <div className="text-xl">🎉</div>}
                  <div className="bg-green-500 rounded text-xs text-white px-2 ">
                    {words.length}
                  </div>
                </div>
              ) : null}
              {distinctLetterCount(words) > 9 ? (
                // show remaining letters if only a few left
                <div className="text-gray-300 font-bold">{remainingLetters.join('')}</div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  ) : null
}
