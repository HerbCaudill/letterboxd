export const Cursor = ({ scale }: { scale: number }) => (
  <div
    className="inline-block bg-black relative animate-blink"
    style={{ top: scale * 0.2, width: 3, height: scale * 1.2 }}
  ></div>
)
