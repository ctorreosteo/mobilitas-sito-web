import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  UserX,
  Wallet,
  GraduationCap,
  Briefcase,
  Users,
  TrendingUp,
  Rocket,
  HeartHandshake,
  Sparkles,
  Zap,
  MessageCircle,
  Stethoscope,
  Handshake,
  Play,
} from 'lucide-react'

// In dev: '' così la chiamata va a /api/... e il proxy Vite la inoltra al backend locale.
// In prod: base completa del backend HQ (CORS pubblico abilitato per studiomobilitas.it).
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')

// Codice del video nel gestionale: mai hardcodare l'UID Cloudflare,
// così il video si può sostituire dal gestionale senza deploy del sito.
const VIDEO_CODICE = 'ITER_SELEZIONE_VSL'

// Recupera l'UID Cloudflare del video dal backend tramite codice.
// Ritorna null se il video non esiste o è disattivato (404): in quel caso il player mostra il placeholder.
function useVideoIterSelezione() {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_BASE}/api/sito/video/codice/${VIDEO_CODICE}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.success && json?.data?.cloudflareUid) setVideo(json.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return { video, loading }
}

const painPoints = [
  {
    icon: Building2,
    title: 'Un muro, tante stanze',
    description: (
      <>
        Spesso &quot;studio&quot; significa solo <strong>condividere un muro</strong>: ognuno nella
        propria stanza, ognuno per conto suo. Nessuna direzione comune, nessun reparto che ti
        sostiene: <em>solo affitti e silenzi</em>.
      </>
    ),
  },
  {
    icon: UserX,
    title: 'Il dubbio che resta dentro',
    description: (
      <>
        Hai un caso difficile e <strong>non hai nessuno a cui chiedere</strong>. Nessun collega
        che ti guardi lavorare, nessuno con cui confrontarti dopo la visita. La solitudine{' '}
        <em>non è solo emotiva</em>: è anche clinica.
      </>
    ),
  },
  {
    icon: Wallet,
    title: 'Paghi per lavorare',
    description: (
      <>
        Affitti la stanza o cedi una <strong>percentuale su ogni paziente</strong> prima ancora di
        guadagnare. Il rischio economico è tutto tuo,{' '}
        <em>mentre lo studio incassa comunque</em>.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: 'Anni per sentirti pronto',
    description: (
      <>
        Dopo la laurea <strong>ricostruisci tutto da capo</strong>: pochi casi, pochi feedback,
        tanta incertezza. Quando finalmente ti senti competente,{' '}
        <em>sono passati anni che non tornano indietro</em>.
      </>
    ),
  },
  {
    icon: Briefcase,
    title: 'Osteopata solo a metà',
    description: (
      <>
        <strong>Fatture, agenda, disdette, post sui social…</strong> La giornata si riempie di
        compiti che <em>non c&apos;entrano con le mani</em>, e il tempo per i pazienti si
        assottiglia sempre di più.
      </>
    ),
  },
  {
    icon: Users,
    title: 'Colleghi, non compagni',
    description: (
      <>
        Ti salutano in corridoio, ma il rapporto finisce lì. Quando serve aiuto,{' '}
        <strong>ognuno guarda il proprio carnet</strong>. Non è malizia: è il modello,{' '}
        <em>competizione mascherata da convivenza</em>.
      </>
    ),
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: 'Clinica fin dal giorno uno',
    description: (
      <>
        <strong>Pazienti in agenda</strong> già nelle prime settimane, non tra qualche anno.{' '}
        <strong>10, 20, 30 visite a settimana</strong>, casi che variano ogni giorno:{' '}
        <em>acufeni, cervicalgie, vertigini, lombalgie, pubalgie e tantissimo altro</em>. Esperienza che altrove si
        accumula in silenzio, qui <strong>la vivi subito</strong>.
      </>
    ),
  },
  {
    icon: Rocket,
    title: 'Una carriera che si vede',
    description: (
      <>
        Il percorso di crescita è <strong>concreto</strong>:{' '}
        <strong>Osteopata Senior, Team Leader, Manager, Area Manager, Direttore degli studi</strong>.
        Una possibilità di crescita <em>enorme</em> che <strong>non esiste da altre parti</strong>.{' '}
        <em>Meritocratica</em> per chi vuole acquisire{' '}
        <strong>competenza e responsabilità importanti</strong>.
      </>
    ),
  },
  {
    icon: HeartHandshake,
    title: 'Mai solo davanti al paziente',
    description: (
      <>
        Visite affiancate, discussione dei casi, cene di team, formazione continua,{' '}
        <em>clinica e umana</em>. Qui il confronto non è un optional: è{' '}
        <strong>parte del modo di lavorare</strong>, ogni giorno.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: 'Le tue idee, sul tavolo',
    description: (
      <>
        Corsi, partnership, eventi istituzionali, e soprattutto spazio per i{' '}
        <strong>tuoi progetti</strong>. Se hai un&apos;idea concreta,{' '}
        <em>non resta nel cassetto</em>: la portiamo in azienda e la valutiamo insieme.
      </>
    ),
  },
  {
    icon: Zap,
    title: 'Tu curi, noi organizziamo',
    description: (
      <>
        Gestionale dedicato, processi automatizzati, segreteria e amministrazione che girano{' '}
        <strong>senza rubarti tempo</strong>. La tua energia va ai pazienti,{' '}
        <em>non alla burocrazia</em>.
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: 'Un posto dove restare',
    description: (
      <>
        Lavoriamo ogni giorno perché ti senta <strong>ascoltato, rispettato e a tuo agio</strong>.
        È un clima che si capisce <em>dal primo colloquio</em>, e che fa la differenza nel
        lungo periodo.
      </>
    ),
  },
]

const iterSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Primo colloquio',
    subtitle: 'Chi sei, cosa cerchi',
    description: (
      <>
        Ci incontriamo <strong>dal vivo o in videochiamata</strong>. Vogliamo capire{' '}
        <em>chi sei al di là del curriculum</em>: obiettivi, carattere, cosa ti motiva e che
        valore puoi portare in azienda. È un momento di <strong>reciproca scoperta</strong>, per
        entrambi.
      </>
    ),
  },
  {
    step: 2,
    icon: Stethoscope,
    title: 'Secondo colloquio',
    subtitle: 'Le mani sul campo',
    description: (
      <>
        <strong>Visita osteopatica reale</strong> con un paziente, sotto supervisione del manager,
        team leader o direttore. Guardiamo <em>ragionamento clinico</em>,{' '}
        <em>competenza manuale</em> e <em>rapporto con il paziente</em>. Se non c&apos;è un
        paziente disponibile, procediamo con simulazioni o ragionamento clinico: tieniti pronto/a
        con <strong>camice, ciabatte, computer, carta e penna</strong>.
      </>
    ),
  },
  {
    step: 3,
    icon: Handshake,
    title: 'Terzo colloquio',
    subtitle: 'La proposta',
    description: (
      <>
        Ti presentiamo l&apos;<strong>offerta definitiva</strong>e scegliamo insieme orari e condizioni. È il
        momento di fare <strong>tutte le domande</strong> che ti sei tenuto/a dentro:{' '}
        <em>nessun dubbio resta senza risposta</em>.
      </>
    ),
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true, margin: '-60px' },
}

function SectionBadge({ children, variant = 'green' }) {
  const styles =
    variant === 'red'
      ? {
          border: '2px solid rgba(255, 107, 105, 0.35)',
          backgroundColor: 'rgba(255, 107, 105, 0.12)',
          color: '#FF6869',
        }
      : {
          border: '2px solid rgba(114, 250, 147, 0.35)',
          backgroundColor: 'rgba(114, 250, 147, 0.12)',
          color: '#72fa93',
        }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '50px',
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        marginBottom: '20px',
        ...styles,
      }}
    >
      {children}
    </div>
  )
}

function SectionDivider() {
  return (
    <div className="max-w-[200px] mx-auto py-4">
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(114, 250, 147, 0.6), transparent)',
        }}
      />
    </div>
  )
}

const PAIN_CARD_WIDTH = 300
const PAIN_CARD_GAP = 20

export default function IterSelezioneOsteopata() {
  const { video, loading } = useVideoIterSelezione()
  const painCarouselRef = useRef(null)
  const [painIndex, setPainIndex] = useState(0)

  const videoEmbedUrl = video
    ? `https://iframe.videodelivery.net/${video.cloudflareUid}?preload=metadata&poster=${encodeURIComponent(video.anteprimaUrl ?? '')}`
    : ''

  // Durante il caricamento mostriamo il placeholder; se il backend risponde 404
  // (video inesistente o disattivato) nascondiamo del tutto la sezione video.
  const showVideoFrame = loading || Boolean(video)

  useEffect(() => {
    const el = painCarouselRef.current
    if (!el) return
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / (PAIN_CARD_WIDTH + PAIN_CARD_GAP))
      setPainIndex(Math.min(Math.max(index, 0), painPoints.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToPain = (index) => {
    if (painCarouselRef.current) {
      painCarouselRef.current.scrollTo({
        left: index * (PAIN_CARD_WIDTH + PAIN_CARD_GAP),
        behavior: 'smooth',
      })
    }
    setPainIndex(index)
  }

  return (
    <div
      className="relative min-h-screen font-montserrat"
      style={{
        background: 'linear-gradient(180deg, #002552 0%, #001433 50%, #002552 100%)',
        color: '#F4F4F4',
      }}
    >
      {/* Decorative background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(114, 250, 147, 0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto text-left md:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <SectionBadge>Iter di selezione</SectionBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ color: '#F4F4F4' }}
          >
            <span className="block">Cari osteopati 👋</span>
            <span className="block" style={{ color: '#72fa93' }}>
              Ecco cosa vi aspetta
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl max-w-2xl md:mx-auto leading-relaxed mb-12"
            style={{ color: 'rgba(244, 244, 244, 0.85)' }}
          >
            {showVideoFrame
              ? 'Prima dei colloqui, guarda questo video: ti raccontiamo chi siamo, come selezioniamo e perché da noi le cose funzionano diversamente 👇🏼'
              : 'Prima dei colloqui, ecco tutto quello che devi sapere: chi siamo, come selezioniamo e perché da noi le cose funzionano diversamente 📋'}
          </motion.p>

          {/* Video frame: nascosto se il video non esiste o è disattivato dal gestionale */}
          {showVideoFrame && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(114, 250, 147, 0.5), rgba(14, 165, 233, 0.3), rgba(114, 250, 147, 0.2))',
                filter: 'blur(1px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(114, 250, 147, 0.25)',
                background: '#001433',
              }}
            >
              <div
                style={{
                  width: '100%',
                  paddingBottom: '56.25%',
                  position: 'relative',
                }}
              >
                {videoEmbedUrl ? (
                  <iframe
                    src={videoEmbedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    title={video?.titolo || 'Iter di selezione Mobilitas'}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #001433 0%, #002552 100%)',
                      gap: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(114, 250, 147, 0.15)',
                        border: '2px solid rgba(114, 250, 147, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Play style={{ width: 32, height: 32, color: '#72fa93', marginLeft: 4 }} />
                    </div>
                    <p style={{ color: 'rgba(244,244,244,0.6)', fontSize: '15px' }}>
                      Caricamento video…
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          )}
        </div>
      </section>

      <SectionDivider />

      {/* PAIN SECTION */}
      <section className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-left md:text-center mb-14 md:mb-20">
            <SectionBadge variant="red">Prima di noi</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              Gli altri studi sono così.{' '}
              <span style={{ color: '#72fa93' }}>Noi no.</span>
            </h2>
            <p
              className="text-lg md:text-xl max-w-3xl md:mx-auto leading-relaxed"
              style={{ color: 'rgba(244, 244, 244, 0.75)' }}
            >
              Se hai già lavorato in studio, riconoscerai almeno uno di questi scenari. Sono
              esattamente ciò che abbiamo scelto di non replicare 😔
            </p>
          </motion.div>

          <div className="relative -mx-4 md:mx-0 overflow-y-hidden">
            <div
              ref={painCarouselRef}
              className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-5 pb-2 scroll-smooth px-4 md:px-0 touch-pan-x"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x',
                overscrollBehaviorY: 'none',
              }}
            >
              <style>{`
                .iter-pain-carousel::-webkit-scrollbar { display: none; }
              `}</style>
              {painPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="iter-pain-carousel flex-shrink-0 snap-start h-full"
                  style={{
                    width: PAIN_CARD_WIDTH,
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 107, 105, 0.25)',
                    borderRadius: '20px',
                    padding: '28px',
                  }}
                  whileHover={{
                    borderColor: 'rgba(255, 107, 105, 0.5)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(255, 107, 105, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <point.icon style={{ width: 24, height: 24, color: '#FF6869' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 mt-0" style={{ color: '#F4F4F4' }}>
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-0 [&_strong]:font-semibold [&_strong]:text-[#F4F4F4] [&_em]:italic [&_em]:text-[rgba(244,244,244,0.85)]" style={{ color: 'rgba(244, 244, 244, 0.7)' }}>
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {painPoints.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToPain(index)}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: index === painIndex ? '24px' : '10px',
                    backgroundColor:
                      index === painIndex ? '#FF6869' : 'rgba(255, 107, 105, 0.35)',
                  }}
                  aria-label={`Vai al punto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* BENEFITS SECTION */}
      <section className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-left md:text-center mb-14 md:mb-20">
            <SectionBadge>Il lato Mobilitas</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              Stesso mestiere,{' '}
              <span style={{ color: '#72fa93' }}>mondo opposto</span>
            </h2>
            <p
              className="text-lg md:text-xl max-w-3xl md:mx-auto leading-relaxed"
              style={{ color: 'rgba(244, 244, 244, 0.75)' }}
            >
              Non promesse generiche: ecco cosa cambia concretamente quando entri in azienda con
              noi ✨
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(114, 250, 147, 0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(114, 250, 147, 0.25)',
                  borderRadius: '20px',
                  padding: '32px',
                }}
                whileHover={{ borderColor: 'rgba(114, 250, 147, 0.5)', y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'rgba(114, 250, 147, 0.15)',
                      border: '1px solid rgba(114, 250, 147, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <benefit.icon style={{ width: 26, height: 26, color: '#72fa93' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mt-0 mb-2" style={{ color: '#72fa93' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#F4F4F4] [&_em]:italic [&_em]:text-[rgba(244,244,244,0.9)]" style={{ color: 'rgba(244, 244, 244, 0.8)' }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ITER SECTION */}
      <section className="relative z-10 px-4 py-20 md:py-28 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-left md:text-center mb-14 md:mb-20">
            <SectionBadge>Il percorso di selezione</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              Tre colloqui,{' '}
              <span style={{ color: '#72fa93' }}>zero sorprese 🤝</span>
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl md:mx-auto leading-relaxed"
              style={{ color: 'rgba(244, 244, 244, 0.75)' }}
            >
              Ogni step ha uno scopo preciso: capirci, vederti all&apos;opera, chiudere con
              chiarezza. Ecco cosa succede in ciascuno.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(180deg, rgba(114, 250, 147, 0.6), rgba(114, 250, 147, 0.1))',
              }}
            />

            <div className="space-y-8">
              {iterSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative md:pl-20"
                >
                  {/* Step number */}
                  <div
                    className="hidden md:flex absolute left-0 top-6 w-16 h-16 items-center justify-center"
                    style={{
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #72fa93, #4ade80)',
                      boxShadow: '0 8px 30px rgba(114, 250, 147, 0.35)',
                    }}
                  >
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#002552' }}>
                      {step.step}
                    </span>
                  </div>

                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(114, 250, 147, 0.2)',
                      borderRadius: '24px',
                      padding: '32px',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div className="mb-4">
                      <div className="md:hidden">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <step.icon style={{ width: 28, height: 28, color: '#72fa93', flexShrink: 0 }} />
                            <h3 className="text-2xl font-black mt-0 mb-0" style={{ color: '#F4F4F4' }}>
                              {step.title}
                            </h3>
                          </div>
                          <div
                            className="flex w-10 h-10 items-center justify-center flex-shrink-0"
                            style={{
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #72fa93, #4ade80)',
                            }}
                          >
                            <span style={{ fontSize: '16px', fontWeight: 900, color: '#002552' }}>
                              {step.step}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-sm font-semibold uppercase tracking-wider block mt-2 pl-10"
                          style={{ color: '#72fa93' }}
                        >
                          {step.subtitle}
                        </span>
                      </div>

                      <div className="hidden md:flex items-center gap-3">
                        <step.icon style={{ width: 28, height: 28, color: '#72fa93', flexShrink: 0 }} />
                        <div>
                          <h3 className="text-2xl font-black mt-0 mb-0" style={{ color: '#F4F4F4' }}>
                            {step.title}
                          </h3>
                          <span
                            className="text-sm font-semibold uppercase tracking-wider"
                            style={{ color: '#72fa93' }}
                          >
                            {step.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#F4F4F4] [&_em]:italic [&_em]:text-[rgba(244,244,244,0.9)]" style={{ color: 'rgba(244, 244, 244, 0.8)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <motion.div
            {...fadeUp}
            className="mt-16 text-left md:text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(114, 250, 147, 0.12), rgba(14, 165, 233, 0.08))',
              border: '2px solid rgba(114, 250, 147, 0.3)',
              borderRadius: '24px',
              padding: '40px 32px',
            }}
          >
            <h3 className="text-2xl md:text-3xl font-black mb-4">
              Arriva con curiosità, non con ansia
            </h3>
            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl md:mx-auto mb-0"
              style={{ color: 'rgba(244, 244, 244, 0.8)' }}
            >
              I colloqui servono a capire se siamo la scelta giusta per entrambi. Porta le tue
              domande, mostra chi sei sul serio: se c&apos;è match, il resto viene da sé.
            </p>
            <p
              className="text-lg md:text-xl font-bold mt-6 mb-0"
              style={{ color: '#72fa93' }}
            >
              A presto in studio! 👋
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
