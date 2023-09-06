import { Layout, generateLayout, generatePuzzle, getAdjacencyMap } from './generatePuzzle'
import { range } from './range'

describe('getAdjacencyMap', () => {
  const testCase = (solution: string, expected: Record<string, string>) => {
    const adjacencyMap = {} as Record<string, Set<string>>
    for (const letter in expected) {
      adjacencyMap[letter] = new Set(expected[letter].split(''))
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
    expect(layoutSummary(generateLayout('FREAKIEST THONGS', seed))).toEqual('AIO/EFT/GKR/HNS')
    expect(layoutSummary(generateLayout('ABNORMALITIES SENSITIZATION', seed))).toEqual(
      'AIN/BRZ/ELT/MOS'
    )
  })

  it('throws an error when no layout is found', () => {
    // this seed happens not to find a layout for this solution
    const seed = 'test-2'
    expect(() => generateLayout('ABNORMALITIES SENSITIZATION', seed)).toThrow()
  })
})

describe('generatePuzzle', () => {
  it('always returns a valid puzzle', () => {
    const N = 100
    const solutions = range(N).map(i => {
      const { solution, layout } = generatePuzzle(`test-${i}`)
      return `${solution} ${layoutSummary(layout)}`
    })
    expect(solutions).toMatchInlineSnapshot(`
      [
        "SOARING GEOMETRICAL ANS/CER/GMT/ILO",
        "ENGINES SYMPTOMATOLOGY AOY/EGT/IPS/LMN",
        "CLOTH HUMANITIES AIU/CHO/EMN/LST",
        "DISCHARGED DECLARATIVE ASV/CIR/DGT/EHL",
        "ENSUE EXCEPTIONAL AES/COT/ILX/NPU",
        "PLAYHOUSE ELEGANT AHT/ENU/GPY/LOS",
        "MISTAKENLY YARDS ANS/DTY/EIL/KMR",
        "RELIEVES SYNAPTIC AEY/CTV/INP/LRS",
        "OVENS SUBORDINATES AEI/BRS/DUV/NOT",
        "INSOMNIA ADVENTURES ANO/DEM/ISU/RTV",
        "HOSTAGE ELOQUENCE AHS/CGQ/EOT/LNU",
        "PARLOUR RESTING ALS/EIO/GPR/NTU",
        "FLASHED DURING AGI/DFR/ENS/HLU",
        "HYDRODYNAMIC CLINICIANS AOS/CMN/DHL/IRY",
        "FRIEND DETACHMENTS AFI/CNS/DMT/EHR",
        "SCENT TRANSFORMATIVE ACI/EOT/FMN/RSV",
        "PROTECTS SEMBLANCE ABC/EOP/LNS/MRT",
        "PATENTS SORGHUM ANS/ERU/GMP/HOT",
        "DISLOYAL LIGATURE ARS/DEO/GLU/ITY",
        "RESOURCEFUL LECTURING CLS/EIU/FGO/NRT",
        "SHARPLY YOUNGER AEN/GOS/HPY/LRU",
        "YOUNGSTER RICHEST CGT/EUY/HIS/NOR",
        "NUMBER REGULATORY AGO/BUY/ELT/MNR",
        "INTENSELY YARDSTICK AEI/CRS/DNY/KLT",
        "HOSTILITY YOUNGSTERS EGY/HIS/LTU/NOR",
        "CONDITIONAL LOGARITHM ACH/DOR/GIM/LNT",
        "AMENDING GLOBULES ABN/DEU/GMO/ILS",
        "SEXTON NEIGHBOUR BEU/GNT/HIS/ORX",
        "FIBROSIS SAMPLED AIR/BFM/DLO/EPS",
        "SEPARATION NECKLACE AKN/COT/EIL/PRS",
        "NONZERO OUTSTANDING ASZ/DGO/EIU/NRT",
        "PROJECTIONS SHEIKH CIN/ERT/HJP/KOS",
        "PROPER REVOLUTIONARY AET/ILP/NRV/OUY",
        "ARGUING GRANDMOTHER AOU/DGH/EIT/MNR",
        "SETUP PREDILECTION CDL/EOU/INR/PST",
        "INTERFERON NEUROPATHY AFU/EHO/IRT/NPY",
        "COURTIERS SOPHISTICATION AES/CTU/HOR/INP",
        "ARCHAEOLOGY YOUTHS AOT/CEY/GSU/HLR",
        "CEILING GUNBOATS ALS/BIU/CGT/ENO",
        "RESPONSIBILITY YEAST AIO/BET/LNP/RSY",
        "VERSE EXCLUDING CGR/DNV/EIL/SUX",
        "ARITHMETIC CONVENIENCES AEH/CTV/IMO/NRS",
        "PEAKS SOLIDARITY APS/DKT/ELR/IOY",
        "PILOTS SQUARED AEQ/DRT/IOU/LPS",
        "ASPARAGUS STUMBLED ABT/DLR/EPU/GMS",
        "ARCHAEOLOGY YIELDS AOY/CDE/GHR/ILS",
        "FETCH HEMOGLOBIN BGH/CFM/EIO/LNT",
        "THORNS SPEAKING AGS/EIR/HKP/NOT",
        "FALCON NERVOUSLY AEY/CRU/FLO/NSV",
        "OVERVIEW WATCHMAN AIO/CMR/EHN/TVW",
        "WETLANDS SUSPENSION AST/DEO/INW/LPU",
        "NUCLEUS SUPERLATIVE AEN/CIP/LST/RUV",
        "UPWARDS SIMULATOR AIP/DMT/LOS/RUW",
        "FARES SUSPECTING ACP/EGI/FRU/NST",
        "EUCALYPTUS SITUATIONAL AEP/CIN/LST/OUY",
        "SANITY YOURSELF AEO/FTU/ILR/NSY",
        "DANGEROUSLY YEOMAN ASY/DLO/ENU/GMR",
        "CONTEMPORANEOUS STRAY AOT/CPY/ERU/MNS",
        "CLOTHED DISPERSAL ADH/CRT/EOS/ILP",
        "SPONSOR REPUBLICANS ABP/CEO/ISU/LNR",
        "NONSENSE EPISTEMOLOGICAL AOS/CNT/EIL/GMP",
        "CUTLER REMODELING CET/DGI/LMN/ORU",
        "FACETS STUDYING ADI/CFT/ENY/GSU",
        "BANTAM MICROSCOPE AEO/BNP/CMT/IRS",
        "NEXUS STABILIZING AGI/BEU/LTZ/NSX",
        "PROSPER RATIONALIZED AES/DOZ/INR/LPT",
        "CONSENTING GRATIFIED AFN/CGS/DIR/EOT",
        "MONUMENTS STRUCTURALISM AIT/CRS/EOU/LMN",
        "COMFORTABLY YARNS ALS/BMY/CFR/NOT",
        "SYNOVIAL LIGAMENTS AEV/GLO/INS/MTY",
        "HOLDINGS SECTOR CDS/EIO/GRT/HLN",
        "GUINEAS SPECIFICATION ANU/COP/EGI/FST",
        "MONEYS SCRATCHED AMS/CEO/DNT/HRY",
        "SORELY YARDSTICK AEO/CDT/ISY/KLR",
        "JOURNEYS SOLIDITY DLY/EST/IOR/JNU",
        "EARTHQUAKE ELIGIBLE ABQ/EHI/GKT/LRU",
        "MODERATED DESTRUCTIVE ACO/DMT/EIU/RSV",
        "RAMPANT TOUCHED AEU/CNP/DHO/MRT",
        "INMATE EXPLODING ALN/DEP/GOX/IMT",
        "SOCIETAL LAUGHED AGI/CEL/DOU/HST",
        "SUNSHINE EXPROPRIATION ANP/EIU/HOX/RST",
        "FADING GRUMBLED ALN/BGI/DMR/EFU",
        "IDOLATRY YOURSELVES AEO/DLR/ISU/TVY",
        "TOWARD DECLARING ADO/CGI/ELN/RTW",
        "BONDED DISCOURAGE ASU/BEN/CGI/DOR",
        "TWOFOLD DIRECTING CDN/EGI/FLW/ORT",
        "AMBIVALENT TURBO AEO/BLN/IRT/MUV",
        "LIMIT TRANSDUCTION AOU/CIS/DLT/MNR",
        "MAGNIFY YOUTHS AIO/FGH/MUY/NST",
        "HERMENEUTIC CLAMP AEI/CRT/HNP/LMU",
        "INVESTED DEPLOYMENT DNS/ELY/IMT/OPV",
        "RESTAURANT TWITCHING ACW/EGT/HNU/IRS",
        "REFRACTORY YAWNING AEI/CNO/FTY/GRW",
        "DIABETES SCULPTURED ADR/BST/CIL/EPU",
        "INTERVIEWER REPULSION ESU/IPR/LOT/NVW",
        "NAVIGATING GEOMETRICAL AMR/CNT/EIL/GOV",
        "GENETIC CARBONYL AEL/BIY/COR/GNT",
        "TOPICAL LEISURELY APT/CES/ILU/ORY",
        "CATEGORIZE EDIFICES AEO/CDF/GIS/RTZ",
        "PRECIPITATES SWAYING ACR/EGI/NPS/TWY",
      ]
    `)
  })
})

const layoutSummary = (layout: Layout) => {
  const sides = Array.from(layout).map(side => Array.from(side).sort().join(''))
  return sides.sort().join('/')
}
