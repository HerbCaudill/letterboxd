import { Fragment } from 'react'

export const WordSequence = ({ words }: { words: string[] }) => {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <div className="text-md tracking-wide font-mono">{word}</div>
          {
            // add dash after all but last word
            i < words.length - 1 && <div className="opacity-20 font-bold">&ndash;</div>
          }
        </Fragment>
      ))}
    </div>
  )
}
