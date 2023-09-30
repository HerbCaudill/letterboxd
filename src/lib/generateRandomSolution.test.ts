import { uniq } from 'lodash'
import { generateRandomSolution } from './generateRandomSolution'
import { range } from './range'

describe('generateRandomSolution', () => {
  it('should generate consistent results when given a seed', () => {
    const N = 50
    const solutions = range(N).map(i => generateRandomSolution(`generateRandomSolution-${i}`))

    // There shouldn't be any duplicates
    expect(uniq(solutions).length).toBe(N)

    expect(solutions).toMatchInlineSnapshot(`
      [
        "TEMPS SEARCHING",
        "TUNING GRANDCHILDREN",
        "UTILIZED DISABLING",
        "DAUGHTER REGISTRATION",
        "SOAKED DRAFTING",
        "BAPTISM MONTHLY",
        "COLOGNE ETHNOGRAPHY",
        "USHERED DISCONTINUITY",
        "CONTRIBUTIONS STIFLE",
        "PERPETRATED DESTROYING",
        "ETHYLENE EQUALIZATION",
        "GATHERINGS SAVAGELY",
        "CRACKLING GATHERS",
        "SNAILS SUPERMARKET",
        "DOPED DISCOLORATION",
        "GENERATORS SUBSCRIBERS",
        "SEIZING GLAUCOMA",
        "DERIVING GRAPHICAL",
        "BOYISH HEALTHFUL",
        "SIGHTED DISQUALIFIED",
        "DISMAL LIGHTHOUSE",
        "BRAKING GLOBULES",
        "INDICATORS SPELT",
        "GASPED DECORATION",
        "PUBLISHES SHARPENED",
        "DILUTION NUMBERS",
        "REPRODUCTIONS SODIUM",
        "SWEPT TRIUMPHANT",
        "COMPETE EXCLUSIVE",
        "FAVORS SPECTACULAR",
        "FURTHEST TWINKLE",
        "MACRO OWNERSHIP",
        "RETORTED DISTURBANCE",
        "BAKING GESTURED",
        "REALISE EXPEDIENCY",
        "INCLUSIONS SECONDARY",
        "DISPENSING GOVERNMENTS",
        "STAINING GODFATHER",
        "SPORADIC COMBINED",
        "HARLEQUIN NATIONS",
        "RECIPROCATING GOSPELS",
        "MIDST THEORIZING",
        "ORDERS STIMULANTS",
        "COMPLIMENT TALKS",
        "CONTEMPLATE ENCOUNTERED",
        "AFTERWARDS STIMULATED",
        "VIGOROUS SOUTHEASTERN",
        "DARKEN NOURISHING",
        "FOREFRONT TRIUMPHED",
        "TRANSITORY YOURSELVES",
      ]
    `)
  })
})
