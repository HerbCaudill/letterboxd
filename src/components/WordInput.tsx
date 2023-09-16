import cx from 'classnames'

export const WordInput = ({ currentWord, isError }: { currentWord: string; isError: boolean }) => {
  return (
    <div
      className={cx(
        {
          'flex justify-center content-center items-center w-full h-[50px]': true,
          'animate-shake': isError,
        },
        'border-b-[3px] border-black'
      )}
    >
      {/* letters */}
      <div className="font-condensed font-bold text-[30px] tracking-widest">{currentWord}</div>
      {/* cursor */}
      <div className="bg-black animate-blink ml-1 w-[3px] h-[32px]" />
    </div>
  )
}
