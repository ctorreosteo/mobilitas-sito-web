import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MapPin } from 'lucide-react'
import { EASE } from '../home-sections/homeMotion'
import ClImg from './ClImg'
import { heroVideoSrc } from './heroVideo'
import { BookCtas, Title } from './kit'

const fade = (delay, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

// Video VSL dal gestionale: autoplay muto in loop, si comporta come un'immagine.
// Mentre carica: riquadro blu; senza video: foto della pagina.
const HeroMedia = ({ video, loading, videoTitle, fallback, fallbackWhileLoading }) => {
  const [cover, setCover] = useState(true)

  useEffect(() => {
    if (!video) return
    setCover(true)
    const timer = window.setTimeout(() => setCover(false), 500)
    return () => window.clearTimeout(timer)
  }, [video])

  const showFallback = !video && (!loading || fallbackWhileLoading)

  return (
    <div className="mx-cl-media">
      <span className="mx-cl-media__halo" aria-hidden="true" />
      <div className={`mx-cl-media__frame ${loading && !showFallback ? 'is-loading' : ''}`}>
        {video ? (
          <>
            {video.anteprimaUrl ? (
              <img src={video.anteprimaUrl} alt="" className="mx-cl-media__fill" decoding="async" fetchPriority="high" />
            ) : null}
            <iframe
              src={heroVideoSrc(video)}
              title={video.titolo || videoTitle}
              className="mx-cl-media__fill mx-cl-media__iframe"
              style={{ backgroundColor: '#002552', colorScheme: 'normal' }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
            {/* Copre il flash nero iniziale del player con il blu aziendale */}
            <div className={`mx-cl-media__cover ${cover ? 'is-on' : ''}`} aria-hidden="true" />
            {/* Blocca interazione: il video deve comportarsi come un'immagine in loop */}
            <div className="mx-cl-media__block" aria-hidden="true" />
          </>
        ) : showFallback ? (
          <ClImg
            src={fallback.src}
            alt={fallback.alt}
            eager
            sizes="(min-width: 1024px) 600px, 100vw"
            className={`mx-cl-media__fill mx-cl-media__img ${fallback.className || ''}`}
          />
        ) : null}
      </div>
    </div>
  )
}

const Hero = ({ page, video, loading }) => {
  const { hero } = page
  const { price } = hero

  return (
    <header className="mx-cl-hero">
      <div className="mx-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="mx-wrap mx-cl-hero__grid">
        <div className="mx-cl-hero__copy">
          <motion.p className="mx-cl-hero__tag" {...fade(0.05, 10)}>
            {hero.name ? (
              <>
                <span className="mx-cl-hero__place">
                  <i aria-hidden="true" />
                  {hero.place} ·
                </span>{' '}
                <span className="mx-cl-hero__name" style={{ '--cl-chars': Math.max(8, hero.name.length) }}>
                  {hero.name}
                </span>
              </>
            ) : (
              <span className="mx-cl-hero__place">
                <i aria-hidden="true" />
                {hero.kicker}
              </span>
            )}
          </motion.p>

          <Title
            as="h1"
            title={hero.title}
            immediate
            delay={0.15}
            className={`mx-cl-hero__title ${hero.bigTitle ? 'mx-cl-hero__title--big' : ''}`}
          />

          <motion.p className="mx-lead mx-cl-hero__lead" {...fade(0.4)}>
            {hero.lead}
          </motion.p>

          <motion.div className="mx-cl-hero__benefits" {...fade(0.5)}>
            {hero.intro && (
              <p className="mx-cl-hero__intro">
                {hero.intro.main}
                <br />
                <span className="mx-accent">{hero.intro.accent}</span>
              </p>
            )}
            <ul className="mx-cl-checks mx-cl-checks--hero">
              {hero.benefits.map((b, i) => (
                <li key={i}>
                  <span className="mx-cl-checks__tick" aria-hidden="true">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="mx-cl-hero__where" {...fade(0.6)}>
            {hero.addresses.map((a) => (
              <p key={a}>
                <MapPin size={15} aria-hidden="true" />
                <span>{a}</span>
              </p>
            ))}
          </motion.div>
        </div>

        <div className="mx-cl-hero__aside">
          <motion.div className="mx-cl-hero__mediawrap" {...fade(0.25, 26)}>
            <HeroMedia
              video={video}
              loading={loading}
              videoTitle={page.videoTitle}
              fallback={hero.fallback || { src: page.images.hero, alt: '' }}
              fallbackWhileLoading={Boolean(hero.fallback)}
            />
          </motion.div>

          <motion.div className="mx-cl-offer" id="mx-cl-hero-offer" {...fade(0.35)}>
            <div className="mx-cl-offer__row">
              <p className="mx-cl-offer__price">
                {price.old && <s>{price.old}</s>}
                <b>{price.value}</b>
                <span>{price.note}</span>
              </p>
              <p className={`mx-cl-offer__tag mx-cl-offer__tag--${price.tagTone}`}>
                <i aria-hidden="true" />
                <span>{price.tag}</span>
              </p>
            </div>
            <BookCtas className="mx-cl-ctas--hero" />
            {hero.notes && (
              <div className="mx-cl-offer__notes">
                {hero.notes.map((n, i) => (
                  <p key={i}>{n}</p>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Hero
