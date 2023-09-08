import cx from 'classnames'

export const WordInput = ({ currentWord, isError }: { currentWord: string; isError: boolean }) => {
  return (
    <div
      className={cx({
        'flex justify-center content-center items-center w-full ': true,
        'animate-shake': isError,
      })}
      style={{ borderBottom: '3px solid black', height: 50 }}
    >
      {/* letters */}
      <div className="font-bold" style={{ fontSize: 25, lineHeight: 1 }}>
        {currentWord}
      </div>
      {/* cursor */}
      <div className="bg-black animate-blink ml-1" style={{ top: 3, width: 3, height: 25 }} />
    </div>
  )
}
