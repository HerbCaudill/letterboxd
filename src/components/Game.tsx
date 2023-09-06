import { useReducer } from 'react'
import { reducer } from 'reducer'
import { Layout, State } from 'types'

export const Game = ({ layout }: Props) => {
  const initialState: State = {
    layout,
    words: [],
    currentWord: '',
    error: null,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <div className={`select-none`}>{JSON.stringify(state)}</div>
    </>
  )
}

type Props = {
  layout: Layout
}
