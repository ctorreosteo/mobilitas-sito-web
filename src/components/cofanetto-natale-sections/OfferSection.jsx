import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { CheckCircle, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'

export default function OfferSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [posterImage, setPosterImage] = useState(null)
  const videoRef = useRef(null)
  
  const boxImages = [
    '/natale25/box1.jpg',
    '/natale25/box2.jpg'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % boxImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + boxImages.length) % boxImages.length)
  }

  const handlePurchaseClick = (type) => {
    // Redirect to Stripe checkout
    const stripeCheckoutUrl = 'https://buy.stripe.com/14A7sN3wX3HzbEX24tdIA01'
    window.open(stripeCheckoutUrl, '_blank')
  }

  // Extract first frame from video to use as poster
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      
      const extractFirstFrame = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = video.videoWidth || 1920
          canvas.height = video.videoHeight || 1080
          const ctx = canvas.getContext('2d')
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg')
          setPosterImage(dataUrl)
        } catch (error) {
          console.log('Could not extract first frame:', error)
        }
      }

      const loadFirstFrame = () => {
        if (video.readyState >= 2) {
          // Video data is loaded, seek to first frame
          video.currentTime = 0.1
          video.pause()
          // Try to extract frame after a short delay
          setTimeout(() => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              extractFirstFrame()
            }
          }, 100)
        }
      }

      video.addEventListener('loadeddata', loadFirstFrame)
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 0.1
        video.pause()
        setTimeout(() => {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            extractFirstFrame()
          }
        }, 200)
      })

      video.addEventListener('seeked', () => {
        if (video.videoWidth > 0 && video.videoHeight > 0 && !posterImage) {
          extractFirstFrame()
        }
      })

      // Force load
      video.load()

      return () => {
        video.removeEventListener('loadeddata', loadFirstFrame)
        video.removeEventListener('seeked', extractFirstFrame)
      }
    }
  }, [posterImage])

  return (
    <section id="offer-section" style={{background: 'linear-gradient(to bottom right, #002552, rgba(0, 37, 82, 0.9))', paddingTop: '64px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', position: 'relative'}} className="sm:pt-20">
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 8px'}}>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left md:text-center"
          style={{marginBottom: '24px'}}
        >
          {/* Badge "Regalo di Natale" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-3 py-1.5 md:px-6 md:py-3 mb-4 md:mb-6 mt-9 md:mt-20"
            style={{
              background: 'linear-gradient(to right, rgba(114, 250, 147, 0.1), rgba(0, 191, 255, 0.1))',
              border: '1px solid rgba(114, 250, 147, 0.2)',
              borderRadius: '50px'
            }}
          >
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-1.5 md:mr-3"
              style={{
                background: 'linear-gradient(to right, #72fa93, #00BFFF)'
              }}
            ></div>
            <span 
              className="font-semibold text-xs md:text-sm uppercase tracking-wider"
              style={{ color: '#72fa93' }}
            >
              Regalo di Natale
            </span>
          </motion.div>

          <h2 className="text-left md:text-center" style={{fontSize: '48px', fontWeight: '900', lineHeight: '1.1', marginBottom: '16px', marginTop: '0px'}}>
            <div style={{color: '#F4F4F4', display: 'block'}}>🎁 IL REGALO PERFETTO</div>
            <div style={{color: '#72fa93', display: 'block'}}>AL PREZZO PERFETTO 🎄</div>
          </h2>
          
          <p className="text-left md:text-center" style={{color: '#F4F4F4', fontSize: '20px', marginTop: '16px', opacity: 0.9}}>
            Un trattamento osteopatico è un regalo unico e originale che sarà davvero apprezzato ✨
          </p>
        </motion.div>

        {/* VSL Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-left md:text-center relative max-w-4xl md:mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <video 
              ref={videoRef}
              src="http://d3t9xqw34vp9a0.cloudfront.net/video/VSL_NATALE_01.mp4"
              poster={posterImage || undefined}
              controls
              playsInline
              webkit-playsinline="true"
              preload="auto"
              className="w-full rounded-2xl"
              style={{ maxHeight: '80vh', objectFit: 'contain', backgroundColor: '#000' }}
            >
              Il tuo browser non supporta il tag video.
            </video>
          </div>
        </motion.div>

        {/* "Ecco la nostra soluzione" Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 text-left md:text-center"
        >
          <h3 style={{
            color: '#F4F4F4',
            fontSize: '48px',
            fontWeight: '700',
            marginTop: '48px',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            Ecco la <span style={{ color: '#72fa93', fontWeight: '900' }}>soluzione</span> che desideravi 😁
          </h3>
          <p className="text-left md:text-center" style={{
            color: '#F4F4F4',
            fontSize: '20px',
            marginBottom: '24px',
            opacity: 0.9
          }}>
            Scegli l'offerta che preferisci
          </p>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 text-left md:text-center relative max-w-4xl md:mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={boxImages[currentImageIndex]} 
              alt={`Cofanetto natalizio Mobilitas ${currentImageIndex + 1}`} 
              className="w-full rounded-2xl"
              style={{ maxHeight: '80%', objectFit: 'contain' }}
            />
            
            {/* Navigation Arrows */}
            {boxImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-dark p-2 rounded-full transition-all duration-300 shadow-lg"
                  aria-label="Precedente"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-dark p-2 rounded-full transition-all duration-300 shadow-lg"
                  aria-label="Successivo"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {boxImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index 
                          ? 'bg-white w-8' 
                          : 'bg-white/50'
                      }`}
                      aria-label={`Vai all'immagine ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Two Offer Boxes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          
          {/* Single Box Offer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="py-4 px-6 sm:py-8 sm:px-6"
            style={{
              borderRadius: '20px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
              border: '3px solid rgba(114, 250, 147, 0.3)',
              backgroundColor: '#F4F4F4',
              color: '#002552',
              position: 'relative'
            }}
          >
            <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4" style={{
              fontWeight: '700',
              color: '#002552'
            }}>
              🎁 1 Cofanetto
            </h3>

            {/* Price */}
            <div className="mb-3 sm:mb-6" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px'
            }}>
              <span className="text-xl sm:text-2xl" style={{
                fontWeight: 'bold',
                textDecoration: 'line-through',
                color: 'rgba(0, 37, 82, 0.6)'
              }}>
                €90
              </span>
              <span className="text-3xl sm:text-5xl" style={{
                fontWeight: '900',
                color: '#00BFFF'
              }}>
                €29
              </span>
            </div>

            {/* Benefits */}
            <div className="mb-4 sm:mb-8" style={{textAlign: 'left'}}>
              {[
                "Regala una sensazione di leggerezza e benessere generale",
                "Riduce rigidità e tensioni nascoste",
                "Migliora postura e mobilità del corpo"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="mb-2 sm:mb-3"
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CheckCircle 
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                    style={{
                      color: '#00BFFF'
                    }} 
                  />
                  <span className="text-sm sm:text-base" style={{
                    color: '#002552',
                    fontWeight: '500'
                  }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button 
              onClick={() => handlePurchaseClick('single')}
              className="py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg"
              style={{
                backgroundColor: '#002552',
                color: '#72fa93',
                borderRadius: '50px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto',
                boxShadow: '0 10px 30px rgba(0, 37, 82, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: 'Montserrat, sans-serif',
                width: '100%'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              ACQUISTA ORA
            </motion.button>
          </motion.div>

          {/* 3 Boxes + 1 Free Offer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="py-4 px-6 sm:py-8 sm:px-6"
            style={{
              borderRadius: '20px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
              border: '3px solid rgba(114, 250, 147, 0.5)',
              backgroundColor: '#F4F4F4',
              color: '#002552',
              position: 'relative'
            }}
          >
            {/* "Il più scelto" Banner */}
            <div style={{
              position: 'absolute',
              top: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#72fa93',
              color: '#002552',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 12px rgba(114, 250, 147, 0.4)',
              whiteSpace: 'nowrap'
            }}
            className="text-xs sm:text-sm sm:px-6"
            >
              ⭐ Il più scelto
            </div>

            <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4 mt-2 sm:mt-2" style={{
              fontWeight: '700',
              color: '#002552'
            }}>
              🎁 3 Cofanetti + 1 in Omaggio
            </h3>

            {/* Price */}
            <div className="mb-2 sm:mb-4" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexDirection: 'column'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <span className="text-xl sm:text-2xl" style={{
                  fontWeight: 'bold',
                  textDecoration: 'line-through',
                  color: 'rgba(0, 37, 82, 0.6)'
                }}>
                  €360
                </span>
                <span className="text-3xl sm:text-5xl" style={{
                  fontWeight: '900',
                  color: '#00BFFF'
                }}>
                  €87
                </span>
              </div>
              <p className="text-xs sm:text-sm" style={{
                color: '#002552',
                fontWeight: '600',
                margin: 0
              }}>
                (€29 per cofanetto + 1 OMAGGIO per te)
              </p>
            </div>

            {/* Special Offer Highlight */}
            <div className="mb-3 sm:mb-6 p-2 sm:p-3" style={{
              backgroundColor: 'rgba(114, 250, 147, 0.2)',
              border: '2px solid #72fa93',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p className="text-sm sm:text-base" style={{
                fontWeight: '700',
                color: '#002552',
                margin: 0
              }}>
                🎁 Il quarto trattamento è in omaggio per te!
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-4 sm:mb-8" style={{textAlign: 'left'}}>
              {[
                "Regala benessere a 3 persone care",
                "Ottieni un trattamento gratuito per te",
                "Risparmi €273 rispetto al prezzo originale"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="mb-2 sm:mb-3"
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <CheckCircle 
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0"
                    style={{
                      color: '#00BFFF'
                    }} 
                  />
                  <span className="text-sm sm:text-base" style={{
                    color: '#002552',
                    fontWeight: '500'
                  }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button 
              onClick={() => handlePurchaseClick('triple')}
              className="py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg"
              style={{
                backgroundColor: '#002552',
                color: '#72fa93',
                borderRadius: '50px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto',
                boxShadow: '0 10px 30px rgba(0, 37, 82, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: 'Montserrat, sans-serif',
                width: '100%'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              ACQUISTA ORA
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            backgroundColor: 'rgba(114, 250, 147, 0.2)',
            border: '2px solid rgba(114, 250, 147, 0.4)',
            borderRadius: '16px',
            padding: '20px',
            maxWidth: '600px',
            margin: '48px auto 0 auto'
          }}
        >
              <p style={{
                color: '#F4F4F4',
                fontSize: '16px',
                fontWeight: '600',
                margin: 0,
                textAlign: 'center'
              }}>
                ⚡ Offerta limitata fino al 23 dicembre 🎅
                <br />
                <span style={{fontSize: '14px', fontStyle: 'italic'}}>Ritira in studio in Via Peyron 54</span>
              </p>
        </motion.div>
      </div>
    </section>
  )
}
