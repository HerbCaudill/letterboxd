import { solvePuzzle } from 'lib/solvePuzzle'
import { useContext, useMemo } from 'react'
import { Context } from './ContextProvider'
import { WordSequence } from './WordSequence'

export const Solutions = ({ showSolutions, onChange }: Props) => {
  const { state } = useContext(Context)
  const { layout } = state

  const solutions = useMemo(() => solvePuzzle(layout, { onlyCommonWords: true }), [layout])
  return (
    <div>
      {/* heading */}
      <div className="">
        <h2 className="flex flex-row justify-between items-center">
          <span>
            <i>{showSolutions ? '🙉' : '🙈'}</i> Solutions
          </span>
          {/* checkbox and label */}
          <span className="flex items-center gap-2 text-sm font-normal select-none">
            <input
              type="checkbox"
              id="show-solutions"
              className="w-3 h-3 cursor-pointer"
              checked={showSolutions}
              onChange={() => onChange(!showSolutions)}
            />
            <label htmlFor="show-solutions" className="cursor-pointer">
              Show {solutions.length === 1 ? 'solution' : `${solutions.length} solutions`}
            </label>
          </span>
        </h2>
      </div>
      {/* hidden/visible list of solutions */}
      {showSolutions && (
        <div className="mt-2 leading-loose divide-y">
          {solutions.map((solution, i) => (
            <WordSequence key={i} words={solution.split(' ')} />
          ))}
        </div>
      )}
    </div>
  )
}

type Props = {
  showSolutions: boolean
  onChange: (showSolutions: boolean) => void
}
