import React from 'react'
import { motion } from 'framer-motion'
import { Kicker, MaskLines } from '../home-sections/HomeKit'
import { EASE } from '../home-sections/homeMotion'

// Apertura delle pagine interne.
// titleLines: come MaskLines ({ text, className: 'mx-gradient' | 'mx-outline' | 'mx-accent' }).
// image: { src, alt } facoltativa, mostrata nella cornice ad arco a destra.
const PageHero = ({ kicker, titleLines, lead, image, children }) => (
  <section className={`mx-phero ${image ? 'has-media' : ''}`}>
    <div className="mx-aurora" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <div className="mx-hero__grid-lines" aria-hidden="true" />

    <div className="mx-wrap mx-phero__layout">
      <div className="mx-phero__copy">
        {kicker && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
            <Kicker>{kicker}</Kicker>
          </motion.div>
        )}
        <h1 className="mx-h mx-h--xl">
          <MaskLines immediate delay={0.2} lines={titleLines} />
        </h1>
        {lead && (
          <motion.p
            className="mx-lead mx-phero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div
            className="mx-phero__extra"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {image && (
        <motion.div
          className="mx-arch mx-phero__media"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        >
          <div className="mx-arch__halo" aria-hidden="true" />
          <div className="mx-arch__frame">
            <img src={image.src} alt={image.alt} decoding="async" />
          </div>
        </motion.div>
      )}
    </div>
  </section>
)

export default PageHero
