import { WordSequence } from './WordSequence'

export const History = ({ history }: { history: string[][] }) =>
  history.length > 0 ? (
    <div>
      <h2>
        <i>📝</i> You've found
      </h2>
      <div className="leading-loose divide-y">
        {history.map((words, i) => (
          <WordSequence key={i} words={words} />
        ))}
      </div>
    </div>
  ) : null
