import { isSolution } from 'lib/isSolution'
import { WordSequence } from './WordSequence'
import { useContext } from 'react'
import { Context } from './ContextProvider'

export const History = () => {
  const { state } = useContext(Context)
  const { history } = state

  return history.length > 0 ? (
    <div>
      <h2>
        <i>📝</i> You've found
      </h2>
      <div className="leading-loose divide-y">
        {history.map((words, i) => (
          <div key={i} className="flex flex-row gap-2">
            <WordSequence words={words} />
            {isSolution(words) ? (
              <div className="flex items-center gap-2 font-black">
                {words.length === 2 && <div className="text-xl">🎉</div>}
                <div className="bg-green-500 rounded text-xs text-white px-2 ">{words.length}</div>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  ) : null
}
