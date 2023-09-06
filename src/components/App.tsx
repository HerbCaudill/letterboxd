import { queryString } from 'lib/queryString'
import { generatePuzzle } from '../lib/generatePuzzle'
import { Game } from './Game'

export const App = () => {
  // We generate a unique puzzle every day, with a new one appearing at midnight UTC.
  // We can also specify a date in the query string to get the puzzle for that date.
  let seed = String(queryString('date') || getUtcDate())

  const { layout } = generatePuzzle(seed)

  return (
    <div className="flex flex-col items-center ">
      <div className="container auto-mx flex flex-col max-w-xl gap-2">
        <Game layout={layout} />
      </div>
    </div>
  )
}

const getUtcDate = () => {
  const now = new Date()
  return `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`
}
