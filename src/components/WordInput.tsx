import cx from 'classnames'
import { letterSize } from './Board'

export const WordInput = ({ currentWord, isError }: { currentWord: string; isError: boolean }) => {
  return (
    <div
      className={cx('flex justify-center content-center items-center w-full', {
        'animate-shake': isError,
      })}
      style={{ borderBottom: '3px solid black', height: letterSize * 2 }}
    >
      {/* letters */}
      <div className="font-bold" style={{ fontSize: letterSize, lineHeight: 1 }}>
        {currentWord}
      </div>
      {/* cursor */}
      <div
        className="bg-black animate-blink ml-1"
        style={{ top: 3, width: 3, height: letterSize }}
      />
    </div>
  )
}
