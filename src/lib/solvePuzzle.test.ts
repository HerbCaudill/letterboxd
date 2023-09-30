import { layoutFromString } from './generateLayout'
import { candidateWords, noAdjacentLetters, solvePuzzle, wordsOnlyContaining } from './solvePuzzle'

describe('wordsOnlyContaining', () => {
  it('should contain words that only have the given letters', () => {
    const letters = new Set('AGIBEULTZNSX')

    const candidates = wordsOnlyContaining(letters, { onlyCommonWords: false })

    expect(candidates.length).toMatchInlineSnapshot('3654')

    expect(candidates).toContain('NEXUS')
    expect(candidates).toContain('STABILIZING')

    expect(candidates).toContain('ABAXILE')
    expect(candidates).toContain('ANABAENAS')

    expect(candidates).not.toContain('CLOTH')
    expect(candidates).not.toContain('HUMANITIES')
  })

  it('should contain only common words if onlyCommonWords is true', () => {
    const letters = new Set('AGIBEULTZNSX')

    const candidates = wordsOnlyContaining(letters, { onlyCommonWords: true })

    expect(candidates.length).toMatchInlineSnapshot('523')

    expect(candidates).toContain('NEXUS')
    expect(candidates).toContain('STABILIZING')

    expect(candidates).not.toContain('ABAXILE')
    expect(candidates).not.toContain('ANABAENAS')
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
    const candidates = candidateWords(layoutFromString('AGI/BEU/LTZ/NSX'), {
      onlyCommonWords: false,
    })

    expect(candidates.length).toMatchInlineSnapshot('1872')

    expect(candidates).toContain('NEXUS')
    expect(candidates).toContain('STABILIZING')

    expect(candidates).toContain('ABAXILE')
    expect(candidates).toContain('ANABAENAS')
  })

  it('should contain only common words if onlyCommonWords is true', () => {
    const candidates = candidateWords(layoutFromString('AGI/BEU/LTZ/NSX'), {
      onlyCommonWords: true,
    })

    expect(candidates.length).toMatchInlineSnapshot('276')

    expect(candidates).toContain('NEXUS')
    expect(candidates).toContain('STABILIZING')

    expect(candidates).not.toContain('ABAXILE')
    expect(candidates).not.toContain('ANABAENAS')
  })
})

describe('solvePuzzle', () => {
  it('should solve a puzzle with lots of solutions', () => {
    const layout = layoutFromString('AGI/BEU/LTZ/NSX')

    const solutions = solvePuzzle(layout, { onlyCommonWords: false })

    expect(solutions.length).toMatchInlineSnapshot('166')
    expect(solutions).toContain('NEXUS STABILIZING')
  })

  it('should generate fewer solutions if onlyCommonWords is true', () => {
    const layout = layoutFromString('AGI/BEU/LTZ/NSX')

    const solutions = solvePuzzle(layout, { onlyCommonWords: true })

    expect(solutions.length).toMatchInlineSnapshot('1')
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

  it('should find 3-word solutions', () => {
    const layout = layoutFromString('AGI/BEU/LTZ/NSX')
    const solutions = solvePuzzle(layout, { maxLength: 3, onlyCommonWords: true })
    expect(solutions.length).toMatchInlineSnapshot('996')
    expect(solutions.slice(0, 10)).toMatchInlineSnapshot(`
      [
        "ALIEN NEXUS STABILIZING",
        "ASTUTE EXEGESIS STABILIZING",
        "ASTUTE EXILES STABILIZING",
        "ASTUTE EXISTS STABILIZING",
        "ASTUTE EXITS STABILIZING",
        "AUGUST TAXES STABILIZING",
        "AUGUST TEXAS STABILIZING",
        "AUGUST TEXTILES STABILIZING",
        "AUGUST TEXTS STABILIZING",
        "AUNTIE EXEGESIS SIZABLE",
      ]
    `)
    expect(solutions.filter(s => s.split(' ').length === 2)).toMatchInlineSnapshot(`
      [
        "NEXUS STABILIZING",
      ]
    `)
  })

  it('should find 3-word solutions', () => {
    const layout = layoutFromString('ETR/INO/SHA/DLU')
    const solutions = solvePuzzle(layout, { maxLength: 3, onlyCommonWords: true })
    expect(solutions.length).toMatchInlineSnapshot('7826')
    expect(solutions.slice(0, 10)).toMatchInlineSnapshot(`
      [
        "ADORN NATURALIST THEIR",
        "ADORN NATURALIST THEIRS",
        "ADORN NATURALIST THEORIES",
        "ADORN NATURALIST THEORIST",
        "ADORN NATURALIST THEORISTS",
        "ADORN NATURALIST THESE",
        "ADORN NATURALIST THESES",
        "ADORN NATURALIST THESIS",
        "ADORN NATURALIST THISTLE",
        "ADORN NATURALIST THOSE",
      ]
    `)
    expect(solutions.filter(s => s.split(' ').length === 2)).toMatchInlineSnapshot(`
      [
        "AROUSE ENDOTHELIAL",
        "AUTHORISED DENTAL",
        "AUTHORISED DIURNAL",
        "AUTHORITARIAN NESTLED",
        "HIDEOUS SENATORIAL",
        "HOUNDS SENATORIAL",
        "NURSE ENDOTHELIAL",
        "ROUSE ENDOTHELIAL",
        "SUNRISE ENDOTHELIAL",
      ]
    `)
    expect(solutions.filter(s => s.split(' ').length === 1)).toMatchInlineSnapshot('[]')
  })
})
