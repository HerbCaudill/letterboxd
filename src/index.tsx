import { queryString } from 'lib/queryString'
import { generatePuzzle } from 'lib/generatePuzzle'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { App } from 'components/App'
import '@fontsource-variable/libre-franklin'
import './index.css'
import { getUtcDate } from 'lib/getUtcDate'
import { solvePuzzle } from 'lib/solvePuzzle'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

// We generate a unique puzzle every day, with a new one appearing at midnight UTC.
// We can also specify a date in the query string to get the puzzle for that date.
let seed = String(queryString('date') || getUtcDate())
const { solution, layout } = generatePuzzle(seed)

const allSolutions = solvePuzzle(layout)

console.log(allSolutions.map(s => (s === solution ? '* ' : '  ') + s).join('\n'))

root.render(<App layout={layout} />)
