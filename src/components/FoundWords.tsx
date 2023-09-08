import { Fragment } from 'react'

export const FoundWords = ({ words }: { words: string[] }) => {
  return (
    <div className="flex flex-row flex-wrap min-w-full gap-1 justify-center ">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <div className="text-md tracking-wide font-sans">{word}</div>
          {
            // add dash after all but last word
            i < words.length - 1 && <div className="text-white text-sm font-bold">&ndash;</div>
          }
        </Fragment>
      ))}
    </div>
  )
}
