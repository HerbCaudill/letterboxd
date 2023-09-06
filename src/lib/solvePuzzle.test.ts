import { layoutFromString } from './generateLayout'
import { candidateWords, noAdjacentLetters, solvePuzzle, wordsOnlyContaining } from './solvePuzzle'

describe('wordsOnlyContaining', () => {
  it('should contain words that only have the given letters', () => {
    const letters = new Set('AGIBEULTZNSX'.split(''))
    const candidates = wordsOnlyContaining(letters)
    expect(candidates).toContain('NEXUS')
    expect(candidates).toContain('STABILIZING')
    expect(candidates.length).toBe(3654)
    expect(candidates.slice(0, 100)).toMatchInlineSnapshot(`
      [
        "ABATE",
        "ABIGAIL",
        "ABILITIES",
        "ABLEST",
        "ABSENT",
        "ABSTAIN",
        "ABUSE",
        "ABUSES",
        "ABUSING",
        "AEGIS",
        "AGAIN",
        "AGAINST",
        "AGEING",
        "AGENT",
        "AGENTS",
        "AGILE",
        "AGING",
        "AILING",
        "AISLE",
        "AISLES",
        "ALBEIT",
        "ALGAE",
        "ALGAL",
        "ALIAS",
        "ALIEN",
        "ALIENATE",
        "ALIENATING",
        "ALIENS",
        "ALIGN",
        "ANALGESIA",
        "ANGEL",
        "ANGELS",
        "ANGINA",
        "ANGLE",
        "ANGLES",
        "ANGLING",
        "ANILINE",
        "ANTIGEN",
        "ANTIGENS",
        "ANXIETIES",
        "ASTUTE",
        "ATAXIA",
        "ATLAS",
        "AUGUST",
        "AUNTIE",
        "AUNTS",
        "AXIAL",
        "BABEL",
        "BABES",
        "BABIES",
        "BALES",
        "BANAL",
        "BANANA",
        "BANANAS",
        "BANGING",
        "BASAL",
        "BASALT",
        "BASELINE",
        "BASES",
        "BASIL",
        "BASIN",
        "BASING",
        "BASINS",
        "BASIS",
        "BATES",
        "BAUXITE",
        "BEANS",
        "BEAST",
        "BEASTS",
        "BEATEN",
        "BEATING",
        "BEATS",
        "BEAUTIES",
        "BEAUX",
        "BEGAN",
        "BEGIN",
        "BEGINS",
        "BEGUN",
        "BEIGE",
        "BEING",
        "BEINGS",
        "BELTS",
        "BENIGN",
        "BENZENE",
        "BESET",
        "BIASES",
        "BIBLE",
        "BIBLES",
        "BILINGUAL",
        "BISEXUAL",
        "BITES",
        "BITING",
        "BLAST",
        "BLASTING",
        "BLASTS",
        "BLATANT",
        "BLAZE",
        "BLAZING",
        "BLEST",
        "BLUES",
      ]
    `)

    expect(candidates).not.toContain('CLOTH')
    expect(candidates).not.toContain('HUMANITIES')
  })
})

describe('noAdjacentLetters', () => {
  it('should return true if the word has no adjacent letters on the same side', () => {
    expect(noAdjacentLetters('FREAKIEST', layoutFromString('AIO/EFT/GKR/HNS'))).toBe(true)
    expect(noAdjacentLetters('THONG', layoutFromString('AIO/EFT/GKR/HNS'))).toBe(true)

    expect(noAdjacentLetters('ABNORMALITIES', layoutFromString('AIN/BRZ/ELT/MOS'))).toBe(true)
    expect(noAdjacentLetters('SENSITIZATION', layoutFromString('AIN/BRZ/ELT/MOS'))).toBe(true)
  })

  it('should return false if the word has adjacent letters on the same side', () => {
    expect(noAdjacentLetters('FAINTER', layoutFromString('AIO/EFT/GKR/HNS'))).toBe(false)
    expect(noAdjacentLetters('GRAIN', layoutFromString('AIO/EFT/GKR/HNS'))).toBe(false)

    expect(noAdjacentLetters('BRAIN', layoutFromString('AIN/BRZ/ELT/MOS'))).toBe(false)
    expect(noAdjacentLetters('MOSTLY', layoutFromString('AIN/BRZ/ELT/MOS'))).toBe(false)
  })
})

describe('candidateWords', () => {
  it('should only contain words with the given letters and no adjacent letters', () => {
    const candidates = candidateWords(layoutFromString('AGI/BEU/LTZ/NSX'))
    expect(candidates).toContain('NEXUS')
    expect(candidates).toContain('STABILIZING')

    expect(candidates.length).toBe(1872)
    expect(candidates.slice(0, 100)).toMatchInlineSnapshot(`
      [
        "ABATE",
        "ABILITIES",
        "ABLEST",
        "ABSENT",
        "ALIEN",
        "ALIENATE",
        "ALIENATING",
        "ANGEL",
        "ANGELS",
        "ANGLE",
        "ANGLES",
        "ANGLING",
        "ANILINE",
        "ASTUTE",
        "AUGUST",
        "AUNTIE",
        "AUNTS",
        "BABIES",
        "BALES",
        "BANAL",
        "BANANA",
        "BANANAS",
        "BASAL",
        "BASELINE",
        "BASES",
        "BASIL",
        "BASIN",
        "BASING",
        "BASIS",
        "BATES",
        "BAUXITE",
        "BIBLE",
        "BIBLES",
        "BILINGUAL",
        "BISEXUAL",
        "BITES",
        "BITING",
        "BLAST",
        "BLASTING",
        "BLASTS",
        "BLATANT",
        "BLAZE",
        "BLAZING",
        "BLEST",
        "BLUNT",
        "EASIEST",
        "EASING",
        "EATEN",
        "EATING",
        "ELITE",
        "ELITES",
        "ELITIST",
        "ENABLE",
        "ENABLES",
        "ENABLING",
        "ENLIST",
        "ENLISTING",
        "ENTENTE",
        "ENTITIES",
        "ESTATE",
        "ESTATES",
        "EXEGESIS",
        "EXILE",
        "EXILES",
        "EXIST",
        "EXISTENT",
        "EXISTING",
        "EXISTS",
        "EXITS",
        "EXTANT",
        "EXTENT",
        "GELATIN",
        "GENES",
        "GENESIS",
        "GENET",
        "GENITAL",
        "GENITALS",
        "GENIUS",
        "GENIUSES",
        "GENTILE",
        "GENTILES",
        "GENUINE",
        "GENUS",
        "GLAZE",
        "GLAZING",
        "GLISTENING",
        "GLUTEN",
        "GUINEA",
        "GUINEAS",
        "GUISE",
        "INALIENABLE",
        "INGUINAL",
        "INLET",
        "INTENT",
        "INTENTS",
        "INTESTATE",
        "INTESTINAL",
        "INTESTINE",
        "INTESTINES",
        "ISLES",
      ]
    `)

    expect(candidates).toContain('STABILIZING')
  })
})

describe('solvePuzzle', () => {
  it('should solve a puzzle with lots of solutions', () => {
    const layout = layoutFromString('AGI/BEU/LTZ/NSX')
    const solutions = solvePuzzle(layout)
    expect(solutions.length).toBe(166)
    expect(solutions).toContain('NEXUS STABILIZING')
  })

  it('should solve a puzzle with only one solution', () => {
    const layout = layoutFromString('AON/HJU/SDT/BIK')
    const solutions = solvePuzzle(layout)
    expect(solutions.length).toBe(1)
    expect(solutions).toContain('BABUSHKA ADJOINT')
  })

  it(`can't solve a puzzle with no solutions`, () => {
    const layout = layoutFromString('QWX/JVU/KBP/YGF')
    const solutions = solvePuzzle(layout)
    expect(solutions.length).toBe(0)
  })

  it(`should solve today's puzzle for me`, () => {
    const layout = layoutFromString('AIG/PUV/RTL/WEO')
    const solutions = solvePuzzle(layout)
    expect(solutions).toMatchInlineSnapshot(`
      [
        "OVERWRITE EARPLUG",
        "TOPWATER REGULATIVE",
      ]
    `)
  })
})
