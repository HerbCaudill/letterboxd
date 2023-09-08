import { queryString } from 'lib/queryString'
import { generatePuzzle } from '../lib/generatePuzzle'
import { Game } from './Game'

export const App = () => {
  // We generate a unique puzzle every day, with a new one appearing at midnight UTC.
  // We can also specify a date in the query string to get the puzzle for that date.
  let seed = String(queryString('date') || getUtcDate())
  const { solution, layout } = generatePuzzle(seed)
  console.log(solution)

  return (
    <div className="flex flex-col items-center h-screen bg-background">
      <div className="container auto-mx flex flex-col items-center max-w-xl ">
        <Game layout={layout} />
      </div>
    </div>
  )
}

const getUtcDate = () => {
  const now = new Date()
  const year = now.getUTCFullYear().toString()
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = now.getUTCDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
