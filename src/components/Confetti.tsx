import _Confetti from 'react-confetti'

export const Confetti = () => (
  <_Confetti
    recycle={false}
    gravity={0.7}
    numberOfPieces={500}
    initialVelocityY={-20}
    tweenDuration={500}
    colors={[
      '#ffffff33',
      '#ffffff66',
      '#ffffff99',
      '#ffffffbb',
      '#FAA6A4',
      '#E87E7E',
      '#FF3833',
      'E20736',
    ]}
  />
)
