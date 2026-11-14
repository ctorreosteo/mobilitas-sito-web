import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { heroVideoSrc } from './heroVideo'
import './vsl-player.css'

// VSL con audio dal gestionale (Cloudflare Stream).
// I browser non lasciano partire un video con l'audio: parte muto e in loop, con un invito
// grande a toccarlo. Al tocco riparte dall'inizio con l'audio e i controlli, senza loop.
//
// Dove il browser legge HLS da solo (iPhone, Android, Safari) si usa un <video> della pagina:
// il tocco arriva al video stesso e l'audio si attiva sempre, anche su iOS.
// Altrove (Chrome e Firefox da computer) resta l'iframe Cloudflare; al clic lo si ricarica
// con l'audio: il clic sulla pagina basta a quei browser per lasciarlo partire.

const hlsSrc = (video) => `https://videodelivery.net/${video.cloudflareUid}/manifest/video.m3u8`

const iframeConAudio = (video) =>
  `https://iframe.videodelivery.net/${video.cloudflareUid}?autoplay=true&controls=true&preload=auto&letterboxColor=%23002552&poster=${encodeURIComponent(video.anteprimaUrl ?? '')}`

const supportaHls = () =>
  typeof document !== 'undefined' && Boolean(document.createElement('video').canPlayType('application/vnd.apple.mpegurl'))

const toccoPrincipale = () => typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches

// Quante persone attivano l'audio, per Google Ads / Analytics e Meta
const tracciaAudio = (codice) => {
  try {
    window.gtag?.('event', 'vsl_audio_on', { video: codice })
    window.fbq?.('trackCustom', 'VslAudioOn', { video: codice })
  } catch {
    // il tracciamento non deve mai rompere il video
  }
}

export default function VslPlayer({ video, title }) {
  const [nativo] = useState(supportaHls)
  const [tocco] = useState(toccoPrincipale)
  const [conAudio, setConAudio] = useState(false)
  const videoRef = useRef(null)

  // Autoplay muto: muted va impostato sull'elemento prima di play(), React non scrive l'attributo
  useEffect(() => {
    const el = videoRef.current
    if (!nativo || !el) return
    el.muted = true
    el.defaultMuted = true
    el.play().catch(() => {
      // autoplay bloccato (es. risparmio energetico su iPhone): resta l'anteprima con l'invito
    })
  }, [nativo, video.cloudflareUid])

  const attivaAudio = () => {
    setConAudio(true)
    tracciaAudio(video.codice)
    const el = videoRef.current
    if (nativo && el) {
      el.loop = false
      el.currentTime = 0
      el.muted = false
      el.controls = true
      el.play().catch(() => {})
    }
  }

  return (
    <div className={`mx-vsl ${conAudio ? 'is-audio' : ''}`}>
      {nativo ? (
        <video
          ref={videoRef}
          className="mx-vsl__media"
          src={hlsSrc(video)}
          poster={video.anteprimaUrl ?? undefined}
          title={title}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <>
          {video.anteprimaUrl ? <img src={video.anteprimaUrl} alt="" className="mx-vsl__media" decoding="async" /> : null}
          <iframe
            // key: cambiando sorgente l'iframe si ricrea e il video riparte da capo con l'audio
            key={conAudio ? 'audio' : 'muto'}
            src={conAudio ? iframeConAudio(video) : heroVideoSrc(video)}
            title={title}
            className={`mx-vsl__media mx-vsl__iframe ${conAudio ? '' : 'is-muto'}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        </>
      )}

      {!conAudio ? (
        // Tutto il video è cliccabile; l'unico invito è la pillola in alto a sinistra, così il video resta visibile
        <button type="button" className="mx-vsl__unmute" onClick={attivaAudio} aria-label="Attiva l'audio del video">
          <span className="mx-vsl__badge" aria-hidden="true">
            <span className="mx-vsl__icon">
              <VolumeX size={16} strokeWidth={2.5} className="mx-vsl__icon-off" />
              <Volume2 size={16} strokeWidth={2.5} className="mx-vsl__icon-on" />
            </span>
            {tocco ? 'Tocca per ascoltare' : 'Clicca per ascoltare'}
          </span>
        </button>
      ) : null}
    </div>
  )
}
