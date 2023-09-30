import { Level, generatePuzzleWithLevel, levels } from 'lib/generatePuzzleWithLevel'
import { queryString } from 'lib/queryString'
import { createContext, useEffect, useReducer } from 'react'
import { State } from 'types'
import { storage } from '../lib/storage'
import { Action, initializer, reducer } from '../reducer'
import { getDate } from './getDate'

// We generate a unique puzzle every day, with a new one appearing at midnight UTC.
// We can also specify a date in the query string to get the puzzle for that date.
let date = getDate()

const getLevel = (): Level => {
  const level = String(queryString('level'))
  return Object.keys(levels).includes(level) ? (level as Level) : 'hard'
}

const level = getLevel()

const initialState =
  storage.get(date, level) || // get from local storage if available
  initializer(generatePuzzleWithLevel(level, date).layout) // otherwise generate puzzle for this date

export const Context = createContext<ProviderPayload>(null!)

export const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    storage.set(date, level, state)
  }, [state])

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

type Props = {
  children: React.ReactNode
}

type ProviderPayload = {
  state: State
  dispatch: React.Dispatch<Action>
}
