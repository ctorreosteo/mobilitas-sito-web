import React, { useState, useEffect } from 'react'
import HeroSection from '../../components/home-sections/HeroSection'
import TargetAudienceSection from '../../components/home-sections/TargetAudienceSection'
import ProblemsSection from '../../components/home-sections/ProblemsSection'
import TestimonialsSection from '../../components/home-sections/TestimonialsSection'
import ServicesOverviewSection from '../../components/home-sections/ServicesOverviewSection'
import BioSection from '../../components/home-sections/BioSection'
import LoadingAnimation from '../../components/LoadingAnimation'
import SectionDivider from '../../components/SectionDivider'

const Home = () => {
  const [showContent, setShowContent] = useState(false)

  // SEO metadata for Home page
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Studio Osteopatico Mobilitas Torino | Osteopata Specializzato Mal di Schiena, Cervicale'

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

    const description = 'Studio Mobilitas Torino: osteopati specializzati in mal di schiena, cervicale, sciatalgia, emicrania e postura. Trattamenti osteopatici personalizzati per adulti, bambini e donne in gravidanza. Prenota la tua visita.'
    const pageUrl = `${window.location.origin}/`

    // Standard SEO
    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName('keywords', 'studio osteopatico torino, osteopata torino, mal di schiena torino, cervicale torino, sciatalgia torino, emicrania torino, postura torino, osteopatia gravidanza, osteopata bambini')

    // Open Graph
    ensureMetaByProperty('og:title', 'Studio Osteopatico Mobilitas Torino | Osteopata Specializzato')
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

  const handleLoadingComplete = () => {
    setShowContent(true)
    // Rimuovi la classe che nasconde il banner iubenda dopo che l'animazione è completata
    document.body.classList.remove('hide-iubenda-banner')
  }

  // Nascondi il banner iubenda all'inizio se siamo nella homepage
  useEffect(() => {
    // Aggiungi la classe per nascondere il banner all'inizio
    document.body.classList.add('hide-iubenda-banner')
    
    // Cleanup: rimuovi la classe quando il componente viene smontato
    return () => {
      document.body.classList.remove('hide-iubenda-banner')
    }
  }, [])

  return (
    <>
      {!showContent && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <div className={`min-h-screen transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <SectionDivider />
        <TargetAudienceSection />
        <SectionDivider />
        <ProblemsSection />
        <SectionDivider />
        <div id="testimonianze">
          <TestimonialsSection />
        </div>
        <SectionDivider />
        <div id="servizi">
          <ServicesOverviewSection />
        </div>
        <SectionDivider />
        <div id="bio">
          <BioSection />
        </div>
      </div>
    </>
  )
}

export default Home
