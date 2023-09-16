import { WordSequence } from './WordSequence'

export const Solutions = ({ solutions, showSolutions, onChange }: Props) => (
  <>
    {/* heading */}
    <div className="flex justify-between items-center">
      <h2>
        <i>{showSolutions ? '🙉' : '🙈'}</i> Solutions
      </h2>
      {/* checkbox and label */}
      <div className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          id="show-solutions"
          className="w-3 h-3 cursor-pointer"
          checked={showSolutions}
          onChange={() => onChange(!showSolutions)}
        />
        <label htmlFor="show-solutions" className="cursor-pointer">
          Show <b>{solutions.length}</b> solutions
        </label>
      </div>
    </div>
    {/* hidden/visible list of solutions */}
    {showSolutions && (
      <div className="mt-2 leading-loose divide-y">
        {solutions.map((solution, i) => (
          <WordSequence key={i} words={solution.split(' ')} />
        ))}
      </div>
    )}
  </>
)

type Props = {
  solutions: string[]
  showSolutions: boolean
  onChange: (showSolutions: boolean) => void
}
