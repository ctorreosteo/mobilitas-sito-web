import { useEffect, useMemo, useState } from 'react'
import { CalendarCheck, Phone } from 'lucide-react'
import PageShell from '../site/PageShell'
import BookingPopup from '../BookingPopup'
import { CtaContext } from './ctaContext'
import { withDefaults } from './defaults'
import { useHeroVideo } from './heroVideo'
import useConditionSeo from './useConditionSeo'
import Hero from './Hero'
import { MechanismSection, PainSection } from './Story'
import { EntrySection, FaqSection, LocationsSection, ReviewsSection, VisitSection } from './Proof'
import '../../styles/pages/condition-landing.css'

// Barra fissa in basso su telefono: compare quando le CTA dell'apertura escono dallo schermo
const Dock = ({ labels, onVisit, onConsulto, hidden }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const target = document.getElementById('mx-cl-hero-offer')
    if (!target) return
    const io = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`mx-cl-dock ${show && !hidden ? 'is-on' : ''}`} aria-hidden={!show || hidden}>
      <button type="button" className="mx-cl-dock__btn mx-cl-dock__btn--primary" onClick={onVisit} tabIndex={show ? 0 : -1}>
        <CalendarCheck size={18} strokeWidth={2.4} aria-hidden="true" />
        {labels.visit.short}
      </button>
      <button type="button" className="mx-cl-dock__btn" onClick={onConsulto} tabIndex={show ? 0 : -1}>
        <Phone size={17} strokeWidth={2.4} aria-hidden="true" />
        {labels.consulto.short}
      </button>
    </div>
  )
}

// Template delle landing di patologia. `page` = config della pagina (contenuti, immagini, SEO):
// vedi per esempio src/pages/Sciatalgia.jsx e, per la variante con lista d'attesa, src/pages/YtPostura.jsx.
const ConditionLanding = ({ page: rawPage }) => {
  const page = useMemo(() => withDefaults(rawPage), [rawPage])
  useConditionSeo(page.seo)
  const { video, loading } = useHeroVideo(page.heroVideo)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingCtaType, setBookingCtaType] = useState('primaVisita')

  const cta = useMemo(
    () => ({
      labels: page.cta,
      openConsulto: () => {
        setBookingCtaType('consulto')
        setShowBooking(true)
      },
      openPrimaVisita: () => {
        setBookingCtaType('primaVisita')
        setShowBooking(true)
      },
    }),
    [page.cta]
  )

  return (
    <>
      <CtaContext.Provider value={cta}>
        <PageShell className={`mx-cl mx-cl--${page.slug}`}>
          <Hero page={page} video={video} loading={loading} />
          <PainSection page={page} />
          <MechanismSection page={page} />
          <ReviewsSection page={page} />
          {page.entry ? <EntrySection page={page} /> : <VisitSection page={page} />}
          <LocationsSection page={page} />
          <FaqSection page={page} />
          <div className="mx-cl-dock-space" aria-hidden="true" />
          <Dock labels={page.cta} onVisit={cta.openPrimaVisita} onConsulto={cta.openConsulto} hidden={showBooking} />
        </PageShell>
      </CtaContext.Provider>
      <BookingPopup
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        pageContext={page.slug}
        ctaType={bookingCtaType}
      />
    </>
  )
}

export default ConditionLanding
