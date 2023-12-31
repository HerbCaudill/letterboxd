import { layoutToString } from './generateLayout'
import { generatePuzzle } from './generatePuzzle'
import { range } from './range'

describe('generatePuzzle', () => {
  it('always returns a valid puzzle', () => {
    const N = 100
    const solutions = range(N).map(i => {
      const { solution, layout } = generatePuzzle(`test-${i}`)
      return `${solution} ${layoutToString(layout)}`
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
        "HOUSEWORK KELVIN EHU/IRS/KVW/LNO",
        "TIBIAL LYMPHOCYTE ABT/CLP/EHY/IMO",
        "HYDRODYNAMIC CLINICIANS AOS/CMN/DHL/IRY",
        "FRIEND DETACHMENTS AFI/CNS/DMT/EHR",
        "SCENT TRANSFORMATIVE ACI/EOT/FMN/RSV",
        "ESTABLISHED DEPENDENCIES ACE/BHI/DLT/NPS",
        "PATENTS SORGHUM ANS/ERU/GMP/HOT",
        "DISLOYAL LIGATURE ARS/DEO/GLU/ITY",
        "RESOURCEFUL LECTURING CLS/EIU/FGO/NRT",
        "SHARPLY YOUNGER AEN/GOS/HPY/LRU",
        "YOUNGSTER RICHEST CGT/EUY/HIS/NOR",
        "NUMBER REGULATORY AGO/BUY/ELT/MNR",
        "INTENSELY YARDSTICK AEI/CRS/DNY/KLT",
        "HOSTILITY YOUNGSTERS EGY/HIS/LTU/NOR",
        "UNBOUNDED DIALECTS ACS/BDU/EOT/ILN",
        "AMENDING GLOBULES ABN/DEU/GMO/ILS",
        "SEXTON NEIGHBOUR BEU/GNT/HIS/ORX",
        "FIBROSIS SAMPLED AIR/BFM/DLO/EPS",
        "AGEING GLYCOPROTEIN ALR/CIT/ENP/GOY",
        "NONZERO OUTSTANDING ASZ/DGO/EIU/NRT",
        "PROJECTIONS SHEIKH CIN/ERT/HJP/KOS",
        "PROPER REVOLUTIONARY AET/ILP/NRV/OUY",
        "INTERFACE EVOLUTION AEL/CNU/FOT/IRV",
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
        "BEACHES SPECIFICATION AHP/BIN/CST/EFO",
        "OVERVIEW WATCHMAN AIO/CMR/EHN/TVW",
        "WETLANDS SUSPENSION AST/DEO/INW/LPU",
        "NUCLEUS SUPERLATIVE AEN/CIP/LST/RUV",
        "UPWARDS SIMULATOR AIP/DMT/LOS/RUW",
        "NORTH HEADLIGHTS AOT/DEN/GLR/HIS",
        "EUCALYPTUS SITUATIONAL AEP/CIN/LST/OUY",
        "SANITY YOURSELF AEO/FTU/ILR/NSY",
        "DANGEROUSLY YEOMAN ASY/DLO/ENU/GMR",
        "CONTEMPORANEOUS STRAY AOT/CPY/ERU/MNS",
        "CLOTHED DISPERSAL ADH/CRT/EOS/ILP",
        "SPONSOR REPUBLICANS ABP/CEO/ISU/LNR",
        "MYRIADS SUBPARAGRAPH AHS/BGM/DIY/PRU",
        "REVOKED DISCLAIMER AES/CIK/DMV/LOR",
        "FACETS STUDYING ADI/CFT/ENY/GSU",
        "BANTAM MICROSCOPE AEO/BNP/CMT/IRS",
        "CONTEMPORARY YOUNG APY/CEN/GMO/RTU",
        "PROSPER RATIONALIZED AES/DOZ/INR/LPT",
        "CONSENTING GRATIFIED AFN/CGS/DIR/EOT",
        "MONUMENTS STRUCTURALISM AIT/CRS/EOU/LMN",
        "SUBJECTED DATING AEI/BGS/CJU/DNT",
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
        "ANTIQUITIES SPECTATORS AOP/CIN/ERU/QST",
        "SUNSHINE EXPROPRIATION ANP/EIU/HOX/RST",
        "FADING GRUMBLED ALN/BGI/DMR/EFU",
        "IDOLATRY YOURSELVES AEO/DLR/ISU/TVY",
        "UNBOUND DISPLACE AEI/BDU/COP/LNS",
        "BONDED DISCOURAGE ASU/BEN/CGI/DOR",
        "SYMBOLISM MACHINE ANY/BEI/CLS/HMO",
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
        "ROARED DISTINGUISH AHI/DGR/EOT/NSU",
        "TOPICAL LEISURELY APT/CES/ILU/ORY",
        "CATEGORIZE EDIFICES AEO/CDF/GIS/RTZ",
        "PRECIPITATES SWAYING ACR/EGI/NPS/TWY",
      ]
    `)
  })
})
