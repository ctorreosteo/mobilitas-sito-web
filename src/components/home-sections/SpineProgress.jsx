import React from 'react'
import { motion, useTransform } from 'framer-motion'
import { SPINE_COUNT, useReadingProgress } from './homeMotion'

// La colonna parte storta e rossa, e si raddrizza diventando verde
// man mano che progress va da 0 a 1. Usata come indicatore di lettura
// (verticale su schermi larghi), nel dock mobile e nella sezione "tieni premuto".
export const Vertebra = ({ i, count = SPINE_COUNT, progress, vertical = false, amp = 1, size = 1 }) => {
  // Disallineamento a "S" con un po' di irregolarità
  const offset = (Math.sin(i * 0.55 + 0.6) * (vertical ? 20 : 5) + Math.sin(i * 1.9) * (vertical ? 5 : 1.5)) * amp
  const tilt = Math.cos(i * 0.55 + 0.6) * 16

  // L'allineamento scende come un'onda: le vertebre in alto si sistemano prima
  const start = (i / count) * 0.3
  const end = start + 0.55

  const shift = useTransform(progress, [start, end], [offset, 0])
  const rotate = useTransform(progress, [start, end], [vertical ? tilt : -tilt, 0])
  const backgroundColor = useTransform(progress, [start, (start + end) / 2, end], ['#FF6869', '#F4F4F4', '#72fa93'])

  // Cervicali piccole, lombari grandi
  const big = 1 + (i / count) * 0.9
  const style = vertical
    ? { x: shift, rotate, backgroundColor, width: 15 * big * size, height: (9 + i * 0.12) * size }
    : { y: shift, rotate, backgroundColor, width: (4 + i * 0.06) * size, height: 8 * big * size }

  return <motion.span className="mx-vertebra" style={style} />
}

const SpineProgress = () => {
  const progress = useReadingProgress()
  const percent = useTransform(progress, (v) => `${Math.round(Math.min(1, v / 0.85) * 100)}%`)

  return (
    <>
      <div className="mx-spine mx-spine--v" aria-hidden="true">
        <div className="mx-spine__col">
          {Array.from({ length: SPINE_COUNT }, (_, i) => (
            <Vertebra key={i} i={i} progress={progress} vertical />
          ))}
        </div>
        <div className="mx-spine__meta">
          <motion.span>{percent}</motion.span>
          <small>allineamento</small>
        </div>
      </div>

      <div className="mx-spine mx-spine--h" aria-hidden="true">
        <div className="mx-spine__col">
          {Array.from({ length: SPINE_COUNT }, (_, i) => (
            <Vertebra key={i} i={i} progress={progress} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SpineProgress
