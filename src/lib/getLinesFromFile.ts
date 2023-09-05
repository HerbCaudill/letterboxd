import fs from 'fs'
import path from 'path'

export const getLinesFromFile = (relativePath: string) => {
  const filePath = path.join(__dirname, relativePath)
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  const lines: string[] = []
  let lastLineOfChunk = ''
  fileStream.on('data', (chunk: string) => {
    const chunkLines = chunk.split('\n')
    chunkLines[0] = lastLineOfChunk + chunkLines[0]
    lastLineOfChunk = chunkLines.pop() || ''
    lines.push(...chunkLines.map(l => l.trim()))
  })
  return new Promise<string[]>((resolve, reject) => {
    fileStream.on('end', () => {
      if (lastLineOfChunk) lines.push(lastLineOfChunk)
      resolve(lines)
    })
    fileStream.on('error', reject)
  })
}
