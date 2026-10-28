import React, { useEffect } from 'react'

const Contatti = () => {
  // SEO metadata for Contatti page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Contatti | Studio Osteopatico Mobilitas Torino – Prenota Visita Osteopata'

    const ensureMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureMetaByProperty = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    const description = 'Contatta lo Studio Osteopatico Mobilitas a Torino. Prenota la tua visita osteopatica: telefono, email, indirizzi Via Peyron 54 e Via Lamarmora 35. Orari di apertura e come raggiungerci.'
    const pageUrl = `${window.location.origin}/contatti`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'contatti mobilitas, prenota visita osteopata torino, telefono osteopata, indirizzo studio osteopatico torino, orari mobilitas')

    // Open Graph
    ensureMetaByProperty('og:title', 'Contatti | Studio Osteopatico Mobilitas Torino')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

    // Canonical
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-blue-dark mb-8 font-montserrat">
          Contatti e Dove Siamo
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-dark mb-4 font-montserrat">
                Informazioni di Contatto
              </h2>
              <p className="text-blue-dark/80 mb-4 font-montserrat">
                Siamo qui per aiutarti. Contattaci per prenotare una visita o per qualsiasi domanda.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-dark mb-4 font-montserrat">
                Le Nostre Sedi
              </h2>
              <p className="text-blue-dark/80 mb-4 font-montserrat">
                Vieni a trovarci in uno dei nostri due studi a Torino: Via Peyron 54 (San Donato) e Via Lamarmora 35 (Crocetta).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contatti
