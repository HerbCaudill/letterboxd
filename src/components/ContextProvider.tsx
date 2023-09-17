import { generatePuzzle } from 'lib/generatePuzzle'
import { getUtcDate } from 'lib/getUtcDate'
import { queryString } from 'lib/queryString'
import { createContext, useEffect, useReducer } from 'react'
import { State } from 'types'
import { storage } from '../lib/storage'
import { Action, initializer, reducer } from '../reducer'

// We generate a unique puzzle every day, with a new one appearing at midnight UTC.
// We can also specify a date in the query string to get the puzzle for that date.
let date = String(queryString('date') || getUtcDate())

const initialState = storage.get(date) || initializer(generatePuzzle(date).layout)

export const Context = createContext<ProviderPayload>({
  state: initialState,
  dispatch: () => {},
})

export const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    storage.set(date, state)
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
