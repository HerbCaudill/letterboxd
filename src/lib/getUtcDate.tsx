export function getUtcDate() {
  const now = new Date()
  const year = now.getUTCFullYear().toString()
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = now.getUTCDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}