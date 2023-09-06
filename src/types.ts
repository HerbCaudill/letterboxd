export type Side = Set<string> // each side has three letters; the order doesn't matter
export type Layout = Side[] // each layout has 4 sides; the order doesn't matter but we use an array for convenience
export type AdjacencyMap = { [letter: string]: Set<string> }
