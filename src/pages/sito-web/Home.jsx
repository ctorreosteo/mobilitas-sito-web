import React, { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import HeroSection from '../../components/home-sections/HeroSection'
import TargetAudienceSection from '../../components/home-sections/TargetAudienceSection'
import ProblemsSection from '../../components/home-sections/ProblemsSection'
import TestimonialsSection from '../../components/home-sections/TestimonialsSection'
import ServicesOverviewSection from '../../components/home-sections/ServicesOverviewSection'
import BioSection from '../../components/home-sections/BioSection'
import TouchSpineSection from '../../components/home-sections/TouchSpineSection'
import SpineProgress from '../../components/home-sections/SpineProgress'
import MobileDock from '../../components/home-sections/MobileDock'
import WhatsAppButtonSito from '../../components/WhatsAppButtonSito'
import './Home.css'

const Home = () => {
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

  return (
    <>
      <MotionConfig reducedMotion="user">
        <div className="mx-home min-h-screen">
          <SpineProgress />
          <MobileDock />
          {/* Su mobile il dock sostituisce il bottone WhatsApp flottante */}
          <div className="mx-desk-only">
            <WhatsAppButtonSito />
          </div>
          <HeroSection />
          <TargetAudienceSection />
          <ProblemsSection />
          <TouchSpineSection />
          <div id="testimonianze">
            <TestimonialsSection />
          </div>
          <div id="servizi">
            <ServicesOverviewSection />
          </div>
          <div id="bio">
            <BioSection />
          </div>
        </div>
      </MotionConfig>
    </>
  )
}

export default Home
