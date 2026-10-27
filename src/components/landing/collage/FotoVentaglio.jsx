import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '../../home-sections/homeMotion'
import ClImg from '../../condition-landing/ClImg'
import './collage.css'

// Sei foto sovrapposte a ventaglio (telefono: due file da tre; desktop: una fila).
// foto: [{ src: '/trattamenti/<nome>', alt, className?, pos?, etichetta? }]. Con `nomi` le etichette stanno
// sotto il collage (mai sopra le persone) e portano davanti la foto scelta.
export default function FotoVentaglio({ foto, nomi = false, className = '' }) {
  const [attiva, setAttiva] = useState(null)
  return (
    <>
      <div className={`mx-fv ${className}`}>
        {foto.slice(0, 6).map((f, i) => (
          <motion.figure
            key={f.src}
            className={`mx-fv__photo ${attiva === i ? 'is-on' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            onMouseEnter={() => setAttiva(i)}
            onMouseLeave={() => setAttiva(null)}
            onClick={() => setAttiva(attiva === i ? null : i)}
          >
            <ClImg
              src={f.src}
              alt={f.alt || ''}
              sizes="(min-width: 768px) 300px, 45vw"
              className={f.className}
              style={f.pos ? { objectPosition: f.pos } : undefined}
            />
          </motion.figure>
        ))}
      </div>
      {nomi && (
        <ul className="mx-fv__legend">
          {foto.slice(0, 6).map((f, i) => (
            <li key={f.etichetta}>
              <button
                type="button"
                className={attiva === i ? 'is-on' : ''}
                aria-pressed={attiva === i}
                onMouseEnter={() => setAttiva(i)}
                onMouseLeave={() => setAttiva(null)}
                onFocus={() => setAttiva(i)}
                onBlur={() => setAttiva(null)}
                onClick={() => setAttiva(i)}
              >
                {f.etichetta}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
