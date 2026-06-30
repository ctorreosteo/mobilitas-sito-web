import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Phone, Mail, Star } from 'lucide-react'
import { RECENSIONI_IMAGES } from '../../data/recensioni'

const CARD_WIDTH = 320
const GAP = 16
const RECENSIONI_COUNT = RECENSIONI_IMAGES.length
const RECENSIONI_SEGMENTS = 6
const RECENSIONI_SEGMENT_SIZE = Math.ceil(RECENSIONI_COUNT / RECENSIONI_SEGMENTS)

const BRAND_GREEN = '#72fa93'

export default function ThankYouCervicalgia() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [activeRecensioneIndex, setActiveRecensioneIndex] = useState(0)
  const [recensioniCarouselHeight, setRecensioniCarouselHeight] = useState(null)
  const carouselRef = useRef(null)
  const activeRecensioneIndexRef = useRef(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead')
    }
  }, [])

  // Google Ads conversion tracking (lead on confirmation page)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16532564533/0OVwCJWk4oscELXUq8s9',
      })
      console.log('Conversion tracked: LEAD - Cervicalgia')
    }
  }, [])

  const goToSlide = (segmentIndex) => {
    setCarouselIndex(segmentIndex)
    if (carouselRef.current) {
      const scrollLeft = segmentIndex * RECENSIONI_SEGMENT_SIZE * (CARD_WIDTH + GAP)
      carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  const handleRecensioneImgLoad = (index) => {
    if (index !== activeRecensioneIndexRef.current) return
    if (!carouselRef.current) return
    const cardEl = carouselRef.current.querySelector(`[data-recensione-card="${index}"]`)
    if (!cardEl) return
    const h = cardEl.offsetHeight
    if (h > 0) setRecensioniCarouselHeight(h)
  }

  useEffect(() => {
    const root = carouselRef.current
    if (!root) return
    const cardEl = root.querySelector(`[data-recensione-card="${activeRecensioneIndex}"]`)
    if (!cardEl) return
    const measure = () => {
      const h = cardEl.offsetHeight
      if (h > 0) setRecensioniCarouselHeight(h)
    }
    measure()
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure)
      ro.observe(cardEl)
      return () => ro.disconnect()
    }
  }, [activeRecensioneIndex])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const segmentWidth = RECENSIONI_SEGMENT_SIZE * (CARD_WIDTH + GAP)
    const getClosestCardIndexToCenter = () => {
      const centerX = el.scrollLeft + el.clientWidth / 2
      const approx = Math.round((centerX - CARD_WIDTH / 2) / (CARD_WIDTH + GAP))
      return Math.min(RECENSIONI_COUNT - 1, Math.max(0, approx))
    }
    const onScroll = () => {
      const index = getClosestCardIndexToCenter()
      activeRecensioneIndexRef.current = index
      setActiveRecensioneIndex(index)
      const segment = Math.min(RECENSIONI_SEGMENTS - 1, Math.max(0, Math.floor(el.scrollLeft / segmentWidth)))
      setCarouselIndex(segment)
    }
    el.addEventListener('scroll', onScroll)
    requestAnimationFrame(() => {
      const index = getClosestCardIndexToCenter()
      activeRecensioneIndexRef.current = index
      setActiveRecensioneIndex(index)
    })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-blue-dark text-cream font-montserrat overflow-x-hidden">
      {/* Background come pagina Cervicalgia */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-dark via-[#001a3d] to-blue-dark" />
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(114,250,147,0.05)' }} />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(114,250,147,0.05)' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icona successo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[#72fa93]" style={{ backgroundColor: BRAND_GREEN, boxShadow: '0 20px 40px rgba(114,250,147,0.35)' }}>
              <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-blue-dark" />
            </div>
          </motion.div>

          {/* Titolo */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: BRAND_GREEN }}
          >
            Richiesta ricevuta!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-cream/90 mb-8"
          >
            La tua <strong>richiesta</strong> è stata <strong className="text-[#72fa93]">registrata</strong>. Ti contatteremo al <strong>numero</strong> che ci hai indicato.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm sm:text-base mb-8"
          >
              <a
                href="tel:+393518198457"
                className="inline-flex items-center gap-2 font-semibold hover:text-cream transition-colors text-[#72fa93]"
              >
                <Phone className="w-5 h-5" />
                +39 351 819 8457
              </a>
              <a
                href="mailto:studio@studiomobilitas.it"
                className="inline-flex items-center gap-2 font-semibold hover:text-cream transition-colors text-[#72fa93]"
              >
                <Mail className="w-5 h-5" />
                studio@studiomobilitas.it
              </a>
            </motion.div>

          {/* CTA WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <motion.a
              href="https://wa.me/393518198457?text=Ciao%2C%20ho%20appena%20inviato%20la%20richiesta%20per%20la%20prima%20visita%20%2F%20consulto%20cervicale.%20Quando%20mi%20richiamate%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-blue-dark font-bold py-3 px-6 rounded-2xl transition-colors shadow-lg"
              style={{ backgroundColor: BRAND_GREEN }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Scrivici su WhatsApp per saltare la lista d'attesa
            </motion.a>
          </motion.div>

          {/* Carosello recensioni */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 pt-10 border-t w-full max-w-5xl mx-auto"
            style={{ borderTopColor: 'rgba(114,250,147,0.25)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 flex-shrink-0" style={{ color: BRAND_GREEN }} />
              <h2 className="text-xl font-bold text-cream">
                Siamo lo studio osteopatico con <span style={{ color: BRAND_GREEN }}>più recensioni d'Italia</span>
              </h2>
            </div>
            <div className="relative">
              <div
                className="transition-[height] duration-300 ease-out overflow-hidden"
                style={{ height: recensioniCarouselHeight ? `${recensioniCarouselHeight}px` : 'auto', minHeight: '200px' }}
              >
                <div
                  ref={carouselRef}
                  className="flex items-start overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>{`
                    .thankyou-recensioni-carousel::-webkit-scrollbar { display: none; }
                  `}</style>
                  {RECENSIONI_IMAGES.map((src, i) => (
                    <div
                      key={i}
                      className="thankyou-recensioni-carousel flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
                      data-recensione-card={i}
                    >
                      <div className="rounded-2xl overflow-hidden bg-blue-dark/80 shadow-xl" style={{ border: '1px solid rgba(114,250,147,0.25)' }}>
                        <img
                          src={src}
                          alt={`Recensione ${i + 1}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          onLoad={() => handleRecensioneImgLoad(i)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: RECENSIONI_SEGMENTS }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 w-2 ${i === carouselIndex ? 'w-6' : 'bg-cream/40 hover:bg-cream/60'}`}
                    style={i === carouselIndex ? { backgroundColor: BRAND_GREEN } : undefined}
                    aria-label={`Vai a segmento ${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-cream/60 text-sm text-center mt-2">
                Scorri per vedere alcune delle 700+ recensioni ufficiali
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
