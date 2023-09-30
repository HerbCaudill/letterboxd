import { allWords, commonWords, distinctLetterCount, isValid } from './words'

describe('distinctLetterCount', () => {
  it('should return the number of distinct letters in a word, excluding spaces', () => {
    expect(distinctLetterCount('COLORFUL LIGHTEN')).toBe(12)
    expect(distinctLetterCount('RELOCKED DEFIANT')).toBe(12)
    expect(distinctLetterCount('QUOTED DIVERSIFY')).toBe(12)
    expect(distinctLetterCount('COLORFUL BRISKET')).toBe(12)
    expect(distinctLetterCount('HAT TRUNK')).toBe(7)
    expect(distinctLetterCount('DYSMORPHIC CAVITATION')).toBe(14)
  })

  it('looking for one-word solutions', () => {
    const oneWordSolutions = commonWords.filter(word => distinctLetterCount(word) === 12)
    expect(oneWordSolutions).toMatchInlineSnapshot(`
      [
        "ACKNOWLEDGEMENT",
        "ACKNOWLEDGMENT",
        "ADVANTAGEOUSLY",
        "COMPARATIVELY",
        "COMPLEMENTARITY",
        "COMPLIMENTARY",
        "COMPREHENSIBLE",
        "CONCEPTUALIZED",
        "CONSIDERABLY",
        "COUNTERVAILING",
        "DEMOGRAPHICS",
        "DISTINGUISHABLE",
        "DIVERSIFICATION",
        "DYSFUNCTIONAL",
        "EXCLUSIONARY",
        "HOMOSEXUALITY",
        "HYDROCEPHALUS",
        "INSURMOUNTABLE",
        "INTERCHANGEABLY",
        "INTRAVENOUSLY",
        "JURISDICTIONAL",
        "OVERWHELMINGLY",
        "PHARMACEUTICALS",
        "POLYMERIZATION",
        "PREDOMINANTLY",
        "REPUBLICANISM",
        "SECULARIZATION",
        "SUPERCONDUCTING",
        "THERMODYNAMIC",
        "UNCOMFORTABLE",
        "UNCOMFORTABLY",
        "UNCOMPLICATED",
        "UNPREDICTABLE",
        "UNPROFITABLE",
        "UNQUESTIONABLY",
        "UNSOPHISTICATED",
        "UNSYMPATHETIC",
      ]
    `)
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
