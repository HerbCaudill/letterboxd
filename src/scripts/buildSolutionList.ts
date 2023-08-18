import fs from 'fs'
import path from 'path'
import { solutionsGenerator } from '../words'

const filePath = path.join(__dirname, '../data/solutions.txt')

fs.writeFileSync(filePath, '')

let i = 1
let chunk = ''
let start = Date.now()
for (const pair of solutionsGenerator()) {
  chunk += pair + '\n'
  if (i++ % 200000 === 0) {
    const rate = Math.trunc((i * 1000) / (Date.now() - start))
    console.log(`${pair} ${rate}/ms`)
    fs.appendFileSync(filePath, chunk + '\n')
    chunk = ''
  }
}

console.log(`${i} pairs generated`)
