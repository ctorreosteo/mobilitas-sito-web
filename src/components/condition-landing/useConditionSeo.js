import { useEffect } from 'react'
import { RECENSIONI_TOTALI } from '../../data/studi'

// SEO locale – metadata + JSON-LD ottimizzati per Google (Torino / San Donato / Crocetta).
// Identico per tutte le landing di patologia: cambiano solo i dati passati in `seo`.
//
// seo = {
//   dataPage, path, ogImage, title, description, keywords: [], ogImageAlt, twitterTitle, twitterImageAlt,
//   condition: { name, alternateName: [], anatomy },
//   therapy: { name, description, offer: { price, availability, name } },
//   breadcrumbName, faq: [{ name, text }],
// }
export default function useConditionSeo(seo) {
  useEffect(() => {
    const prevTitle = document.title
    const origin = window.location.origin
    const pageUrl = `${origin}${seo.path}`
    const ogImage = `${origin}${seo.ogImage}`

    const title = seo.title
    document.title = title

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

    const description = seo.description

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    ensureMetaByName('keywords', seo.keywords.join(', '))
    ensureMetaByName('author', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByName('geo.region', 'IT-TO')
    ensureMetaByName('geo.placename', 'Torino, San Donato, Crocetta')
    // Coordinate sede principale (San Donato); Crocetta è nel JSON-LD department
    ensureMetaByName('geo.position', '45.0802312;7.6577188')
    ensureMetaByName('ICBM', '45.0802312, 7.6577188')

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    ensureMetaByProperty('og:title', title)
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:image', ogImage)
    ensureMetaByProperty('og:image:alt', seo.ogImageAlt)
    ensureMetaByProperty('og:image:width', '1200')
    ensureMetaByProperty('og:image:height', '630')
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')
    ensureMetaByProperty('og:locale', 'it_IT')

    // Twitter Card
    ensureMetaByName('twitter:card', 'summary_large_image')
    ensureMetaByName('twitter:title', seo.twitterTitle)
    ensureMetaByName('twitter:description', description)
    ensureMetaByName('twitter:image', ogImage)
    ensureMetaByName('twitter:image:alt', seo.twitterImageAlt)

    ensureCanonical(pageUrl)

    const businessShared = {
      '@type': 'MedicalBusiness',
      name: 'Mobilitas – Studio Osteopatico',
      url: origin,
      telephone: '+393518198457',
      email: 'studio@studiomobilitas.it',
      image: `${origin}/logo_blu.png`,
      priceRange: '€€',
      medicalSpecialty: 'Osteopathic',
      areaServed: [
        { '@type': 'City', name: 'Torino' },
        { '@type': 'AdministrativeArea', name: 'Piemonte' },
      ],
      sameAs: [
        'https://www.facebook.com/studiomobilitas',
        'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: String(RECENSIONI_TOTALI),
        bestRating: '5',
        worstRating: '1',
      },
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: 'it-IT',
          isPartOf: { '@id': `${origin}/#website` },
          about: { '@id': `${pageUrl}#condition` },
          mainEntity: { '@id': `${pageUrl}#service` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: ogImage,
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'meta[name="description"]'],
          },
        },
        {
          '@type': 'MedicalCondition',
          '@id': `${pageUrl}#condition`,
          name: seo.condition.name,
          alternateName: seo.condition.alternateName,
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: seo.condition.anatomy,
          },
        },
        {
          '@type': 'MedicalTherapy',
          '@id': `${pageUrl}#service`,
          name: seo.therapy.name,
          description: seo.therapy.description,
          url: pageUrl,
          provider: { '@id': `${origin}/#organization` },
          offers: {
            '@type': 'Offer',
            price: seo.therapy.offer.price,
            priceCurrency: 'EUR',
            availability: seo.therapy.offer.availability,
            url: pageUrl,
            name: seo.therapy.offer.name,
          },
        },
        {
          ...businessShared,
          '@id': `${origin}/#organization`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Peyron 54',
            addressLocality: 'Torino',
            addressRegion: 'Piemonte',
            postalCode: '10143',
            addressCountry: 'IT',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 45.0802312,
            longitude: 7.6577188,
          },
          hasMap:
            'https://www.google.com/maps/place/Mobilitas+-+Studio+Osteopatico+-+Osteopata+Torino/@45.0802312,7.6577188,17z',
          department: [
            {
              '@type': 'MedicalBusiness',
              '@id': `${origin}/#sede-san-donato`,
              name: 'Mobilitas – San Donato',
              telephone: '+393518198457',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Peyron 54',
                addressLocality: 'Torino',
                addressRegion: 'Piemonte',
                postalCode: '10143',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.0802312,
                longitude: 7.6577188,
              },
            },
            {
              '@type': 'MedicalBusiness',
              '@id': `${origin}/#sede-crocetta`,
              name: 'Mobilitas – Crocetta',
              telephone: '+393518198457',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Via Lamarmora 35',
                addressLocality: 'Torino',
                addressRegion: 'Piemonte',
                postalCode: '10128',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.0593749,
                longitude: 7.6660428,
              },
            },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: seo.breadcrumbName,
              item: pageUrl,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: seo.faq.map((q) => ({
            '@type': 'Question',
            name: q.name,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.text,
            },
          })),
        },
      ],
    }

    const selector = `script[type="application/ld+json"][data-page="${seo.dataPage}"]`
    let scriptLd = document.querySelector(selector)
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.setAttribute('type', 'application/ld+json')
      scriptLd.setAttribute('data-page', seo.dataPage)
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    return () => {
      document.title = prevTitle
      const toRemove = document.querySelector(selector)
      if (toRemove) toRemove.remove()
    }
    // I dati SEO sono costanti di modulo della pagina: l'effetto gira una volta, come prima.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
