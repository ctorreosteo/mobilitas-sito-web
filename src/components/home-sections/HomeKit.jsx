import React, { Children, useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { EASE, MSG_CONSULTO, MSG_VISITA, openWhatsApp } from './homeMotion'

// Bottone che segue leggermente il cursore
const MagneticButton = ({ className, onClick, children }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.18)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}

// inline: CTA a metà pagina, nascoste su mobile dove c'è il dock fisso
export const CtaPair = ({ className = '', inline = false }) => (
  <div className={`mx-ctas ${inline ? 'mx-ctas--inline' : ''} ${className}`}>
    <MagneticButton className="mx-btn mx-btn--primary" onClick={() => openWhatsApp(MSG_CONSULTO)}>
      <span>
        <small>Prenota un</small>
        Consulto gratuito
      </span>
      <span className="mx-btn__icon">
        <MessageCircle size={20} strokeWidth={2.4} />
      </span>
    </MagneticButton>
    <MagneticButton className="mx-btn mx-btn--ghost" onClick={() => openWhatsApp(MSG_VISITA)}>
      <span>
        <small>Prenota una</small>
        Prima visita con sconto
      </span>
      <span className="mx-btn__icon">
        <ArrowUpRight size={20} strokeWidth={2.4} />
      </span>
    </MagneticButton>
  </div>
)

export const Kicker = ({ n, children }) => (
  <p className="mx-kicker">
    {n && <span className="mx-kicker__n">{n}</span>}
    <span className="mx-kicker__bar" />
    {children}
  </p>
)

export const Reveal = ({ children, delay = 0, y = 40, className, as = 'div', ...rest }) => {
  const Tag = motion[as]
  return (
    <Tag
      {...rest}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

// Righe di titolo che salgono da una maschera, una dopo l'altra.
// Il trigger sta sulla maschera: il testo traslato è tagliato e l'IntersectionObserver non lo vedrebbe.
// immediate: anima al mount invece che all'ingresso in vista (play la tiene ferma finché è false)
export const MaskLines = ({ lines, delay = 0, immediate = false, play = true }) => {
  const trigger = immediate
    ? { animate: play ? 'show' : 'hidden' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } }

  return lines.map((line, i) => (
    <React.Fragment key={i}>
      <motion.span className="mx-mask" initial="hidden" {...trigger}>
        <motion.span
          className={line.className}
          variants={{
            hidden: { y: '110%' },
            show: { y: '0%', transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.09 } },
          }}
        >
          {line.text}
        </motion.span>
      </motion.span>
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ))
}

const ScrollWord = ({ progress, range, accent, children }) => {
  const opacity = useTransform(progress, range, [0.13, 1])
  return (
    <motion.span style={{ opacity }} className={accent ? 'mx-accent' : undefined}>
      {children}{' '}
    </motion.span>
  )
}

// Testo che si "accende" parola per parola mentre scorri.
// parts: array di stringhe o { text, accent: true }
export const ScrollWords = ({ parts, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })

  const words = parts.flatMap((part) => {
    const { text, accent } = typeof part === 'string' ? { text: part, accent: false } : part
    return text.split(' ').filter(Boolean).map((w) => ({ w, accent }))
  })

  return (
    <p ref={ref} className={className}>
      {words.map(({ w, accent }, i) => (
        <ScrollWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 2) / words.length)]}
          accent={accent}
        >
          {w}
        </ScrollWord>
      ))}
    </p>
  )
}

export const Counter = ({ to, decimals = 0, prefix = '', suffix = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 2.4, ease: EASE, onUpdate: setValue })
    return () => controls.stop()
  }, [inView, to])

  const formatted = value.toLocaleString('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref}>
      {prefix}{formatted}<em>{suffix}</em>
    </span>
  )
}

// Foto ottimizzate generate da /public/home/homeN.png
export const Photo = ({ name, alt, sizes = '100vw', eager = false, ...rest }) => (
  <img
    src={`/home/web/${name}-1600.jpg`}
    srcSet={`/home/web/${name}-900.jpg 900w, /home/web/${name}-1600.jpg 1600w`}
    sizes={sizes}
    alt={alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    {...rest}
  />
)

// Griglia su desktop, carosello a scorrimento orizzontale su mobile (vedi .mx-snap)
export const Snap = ({ as: Tag = 'div', className = '', children }) => {
  const ref = useRef(null)
  const [pos, setPos] = useState(0)
  const count = Children.count(children)

  const onScroll = () => {
    const el = ref.current
    const max = el.scrollWidth - el.clientWidth
    setPos(max > 0 ? el.scrollLeft / max : 0)
  }

  return (
    <>
      <Tag ref={ref} className={`mx-snap ${className}`} onScroll={onScroll}>
        {children}
      </Tag>
      <div className="mx-snap__bar" aria-hidden="true">
        <i style={{ width: `${100 / count}%`, transform: `translateX(${pos * (count - 1) * 100}%)` }} />
      </div>
    </>
  )
}
