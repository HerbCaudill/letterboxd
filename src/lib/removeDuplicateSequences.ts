export const removeDuplicateSequences = (sequences: string[][]) =>
  sequences
    // remove any sequences of words that are contained in other sequences
    // e.g. if we have 'CAT TOE' AND 'CAT TOE EYE', we can remove 'CAT TOE'
    .filter((sequence, i, allSequences): boolean => {
      const a = sequence.join('')
      return !allSequences.some((otherSequence, j) => {
        const b = otherSequence.join('')
        if (a === b) return i < j // if there are exact duplicates, remove the earlier one
        else if (i !== j) return b.includes(a) // if there are subsets, remove the shorter one
        else return false
      })
    })
