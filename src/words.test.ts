import { distinctLetterCount, candidateWords, solutions } from './words'

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

describe('candidateWords', () => {
  it('should contain common words', () => {
    expect(candidateWords).toContain('HOUSE')
    expect(candidateWords).toContain('PARTY')
  })

  it('should not contain words with double letters', () => {
    expect(candidateWords).not.toContain('PRETTY')
    expect(candidateWords).not.toContain('BALLERINA')
  })

  it('should not contain proper names', () => {
    expect(candidateWords).not.toContain('AMERICAN')
    expect(candidateWords).not.toContain('ROBERT')
  })

  it('should not contain uncommon words', () => {
    expect(candidateWords).not.toContain('AASVOGELS')
    expect(candidateWords).not.toContain('ZYZZYVAS')
  })
})

describe('solutions', () => {
  it('should contain valid pairs', () => {
    expect(solutions).toContain('COLORFUL LIGHTEN')
    expect(solutions).toContain('HIDEBOUND DOWAGER')
    expect(solutions).toContain('QUOTED DIVERSIFY')
  })

  it('the second word should start with the last letter of the first', () => {
    expect(solutions).not.toContain('COLORFUL BRISKET')
  })

  it('should not contain words with less than three letters', () => {
    expect(solutions).not.toContain('IT TOAST')
  })

  it('should not contain pairs with too few distinct letters', () => {
    expect(solutions).not.toContain('HAT TRUNK')
  })

  it('should not contain pairs with too many distinct letters', () => {
    expect(solutions).not.toContain('DYSMORPHIC CAVITATION')
  })
})
