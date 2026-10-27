import { Reveal } from '../../home-sections/HomeKit'
import ClImg from '../../condition-landing/ClImg'
import './collage.css'

// Due foto sovrapposte e leggermente ruotate. foto: [{ src: '/trattamenti/<nome>', alt, className?, pos? }]
export default function FotoDoppia({ foto, className = '', delay = 0.1 }) {
  const due = foto.filter(Boolean).slice(0, 2)
  if (due.length < 2) return null
  return (
    <Reveal className={`mx-fd ${className}`} delay={delay}>
      {due.map((f) => (
        <figure key={f.src} className="mx-fd__photo">
          <ClImg
            src={f.src}
            alt={f.alt || ''}
            sizes="(min-width: 1000px) 340px, 64vw"
            className={f.className}
            style={f.pos ? { objectPosition: f.pos } : undefined}
          />
        </figure>
      ))}
    </Reveal>
  )
}
