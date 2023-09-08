import _Confetti from 'react-confetti'
import { range } from 'lib/range'

export const Confetti = () => (
  <_Confetti
    recycle={false}
    gravity={0.9}
    initialVelocityY={-20}
    tweenDuration={500}
    colors={range(15).map(i => `#ffffff${(i * 17).toString(16)}`)}
  />
)
