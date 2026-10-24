import React from 'react'
import { motion } from 'framer-motion'
import { Kicker, MaskLines, Reveal } from '../../home-sections/HomeKit'
import { trackSpotlight, useParallax } from '../../home-sections/homeMotion'
import '../../../styles/pages/partnership.css'

// Mattoncini condivisi dalle pagine partner (ognuna ha poi hero e momento-firma propri).

// Foto partner ottimizzate: <base>-900.jpg e <base>-1600.jpg (public/partnership/<partner>/web)
export const PartnerImg = ({ base, alt, sizes = '100vw', eager = false, className, style }) => (
  <motion.img
    src={`${base}-1600.jpg`}
    srcSet={`${base}-900.jpg 900w, ${base}-1600.jpg 1600w`}
    sizes={sizes}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={className}
    style={style}
  />
)

// Foto in cornice con parallasse leggera
export const ParallaxPhoto = ({ base, alt, sizes, className = '', children }) => {
  const [ref, y] = useParallax(7)
  return (
    <div ref={ref} className={`mx-pk-photo ${className}`}>
      <PartnerImg base={base} alt={alt} sizes={sizes} className="mx-parallax-img" style={{ y }} />
      {children}
    </div>
  )
}

// Intestazione di sezione: kicker numerato, titolo a righe mascherate, lead a fianco
export const SectionHead = ({ n, kicker, lines, lead, size = 'lg', stacked = false }) => (
  <>
    <Kicker n={n}>{kicker}</Kicker>
    <div className={`mx-pk-head ${stacked ? 'is-stacked' : ''}`}>
      <h2 className={`mx-h mx-h--${size}`}>
        <MaskLines lines={lines} />
      </h2>
      {lead && (
        <Reveal>
          <p className="mx-lead">{lead}</p>
        </Reveal>
      )}
    </div>
  </>
)

// Riquadro di chiusura sezione (titolo + testo)
export const Highlight = ({ icon: Icon, title, children, className = '' }) => (
  <Reveal className={`mx-pk-hl ${className}`}>
    {Icon && (
      <span className="mx-pk-hl__icon" aria-hidden="true">
        <Icon size={26} />
      </span>
    )}
    <div>
      <h3 className="mx-h mx-h--md">{title}</h3>
      <p className="mx-lead">{children}</p>
    </div>
  </Reveal>
)

// Card in vetro con icona
export const GlassCard = ({ icon: Icon, title, children, delay = 0, className = '', tag }) => (
  <Reveal delay={delay} className={`mx-card ${className}`} onMouseMove={trackSpotlight}>
    {tag && <span className="mx-pk-tag">{tag}</span>}
    {Icon && (
      <span className="mx-card__icon">
        <Icon size={24} />
      </span>
    )}
    <h3 className="mx-h mx-h--sm">{title}</h3>
    <p className="mx-body">{children}</p>
  </Reveal>
)

// Elenco numerato nome/descrizione (valori, punti di forza)
export const NamedList = ({ items }) => (
  <ul className="mx-list">
    {items.map((v, i) => (
      <li key={v.name}>
        <span className="mx-list__n">{String(i + 1).padStart(2, '0')}</span>
        <span>
          <span className="mx-list__t">{v.name}</span>
          <span className="mx-list__d">{v.desc}</span>
        </span>
      </li>
    ))}
  </ul>
)
