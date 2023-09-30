import { State } from 'types'
import { layoutToString } from './generateLayout'
import { Level, generatePuzzleWithLevel } from './generatePuzzleWithLevel'

export const storage = {
  set: (date: string, level: Level, value: State) => {
    localStorage.setItem(getKey(date, level), serialize(value))
  },
  get: (date: string, level: Level) => {
    const value = localStorage.getItem(getKey(date, level))
    if (value) return deserialize(value)
  },
}

const getKey = (date: string, level: Level) => {
  const { layout } = generatePuzzleWithLevel(level, date)
  return layoutToString(layout)
}

// sets aren't serializable, so we have to convert them to and from arrays
// also we omit the message because it's a react element (probably a terrible idea but anyway)

const serialize = (value: State) => {
  const { message, ...serializablePortion } = value
  const state: SerializableState = {
    ...serializablePortion,
    layout: value.layout.map(set => Array.from(set)),
  }
  return JSON.stringify(state)
}

const deserialize = (value: string) => {
  const state = JSON.parse(value) as SerializableState
  return {
    ...state,
    layout: state.layout.map(arr => new Set(arr)),
  } as State
}

type SerializableState = Omit<State, 'layout' | 'message'> & {
  layout: string[][]
}
