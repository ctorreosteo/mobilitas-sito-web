import { useEffect, useState } from 'react'
import ClImg from './ClImg'
import { heroVideoSrc } from './heroVideo'

// Riquadro media dell'apertura, usato dalle landing di prima visita (PrimaVisitaLanding).
// Video VSL dal gestionale: autoplay muto in loop, si comporta come un'immagine.
// Mentre carica: riquadro blu; senza video: foto della pagina.
export const HeroMedia = ({ video, loading, videoTitle, fallback, fallbackWhileLoading }) => {
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
