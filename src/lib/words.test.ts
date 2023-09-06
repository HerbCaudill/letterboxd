import { distinctLetterCount, isValid } from './words'

describe('distinctLetterCount', () => {
  it('should return the number of distinct letters in a word, excluding spaces', () => {
    expect(distinctLetterCount('COLORFUL LIGHTEN')).toBe(12)
    expect(distinctLetterCount('RELOCKED DEFIANT')).toBe(12)
    expect(distinctLetterCount('QUOTED DIVERSIFY')).toBe(12)
    expect(distinctLetterCount('COLORFUL BRISKET')).toBe(12)
    expect(distinctLetterCount('HAT TRUNK')).toBe(7)
    expect(distinctLetterCount('DYSMORPHIC CAVITATION')).toBe(14)
  })
})

describe('isValid', () => {
  it('should validate common words', () => {
    expect(isValid('HOUSE')).toBe(true)
    expect(isValid('PARTY')).toBe(true)
  })

  it('should not validate words with double letters', () => {
    expect(isValid('PRETTY')).toBe(false)
    expect(isValid('BALLERINA')).toBe(false)
  })

  it('should not validate proper names', () => {
    expect(isValid('AMERICAN')).toBe(false)
    expect(isValid('ROBERT')).toBe(false)
  })

  it('should validate uncommon words', () => {
    expect(isValid('ABACA')).toBe(true)
    expect(isValid('ZYMURGY')).toBe(true)
  })
})
