import { generateLayout, getAdjacencyMap, layoutToString } from './generateLayout'

describe('getAdjacencyMap', () => {
  const testCase = (solution: string, expected: Record<string, string>) => {
    const adjacencyMap = {} as Record<string, Set<string>>
    for (const letter in expected) {
      adjacencyMap[letter] = new Set(expected[letter])
    }
    expect(getAdjacencyMap(solution)).toEqual(adjacencyMap)
  }

  it('FREAKIEST THONGS', () => {
    testCase('FREAKIEST THONGS', {
      F: 'R',
      R: 'FE',
      E: 'RAIS',
      A: 'EK',
      K: 'AI',
      I: 'KE',
      S: 'ETG',
      T: 'SH',
      H: 'TO',
      O: 'HN',
      N: 'OG',
      G: 'NS',
    })
  })

  it('ABNORMALITIES SENSITIZATION', () => {
    testCase('ABNORMALITIES SENSITIZATION', {
      A: 'BMLZT',
      B: 'AN',
      N: 'BOES',
      O: 'NRI',
      R: 'OM',
      M: 'RA',
      L: 'AI',
      I: 'LTESZO',
      T: 'IA',
      E: 'ISN',
      S: 'ENI',
      Z: 'IA',
    })
  })
})

describe('generateLayout', () => {
  it('generates a layout when possible', () => {
    const seed = 'test-1'
    expect(layoutToString(generateLayout('FREAKIEST THONGS', seed))) //
      .toEqual('AIO/EFT/GKR/HNS')
    expect(layoutToString(generateLayout('ABNORMALITIES SENSITIZATION', seed))) //
      .toEqual('AIN/BRZ/ELT/MOS')
  })

  it('throws an error when no layout is found', () => {
    // this seed happens not to find a layout for this solution
    const seed = 'test-2'
    expect(() => generateLayout('ABNORMALITIES SENSITIZATION', seed)).toThrow()
  })
})
