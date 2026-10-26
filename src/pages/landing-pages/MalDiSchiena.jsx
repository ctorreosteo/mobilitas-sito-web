import React from 'react'
import { MotionConfig } from 'framer-motion'
import AnnouncementBar from '../../components/mal-di-schiena-sections/AnnouncementBar'
import VSLSection from '../../components/mal-di-schiena-sections/VSLSection'
import PainPointsSection from '../../components/mal-di-schiena-sections/PainPointsSection'
import OfferSection from '../../components/mal-di-schiena-sections/OfferSection'
import FAQSection from '../../components/mal-di-schiena-sections/FAQSection'
import FooterSection from '../../components/mal-di-schiena-sections/FooterSection'
import StickyBuyBar from '../../components/mal-di-schiena-sections/StickyBuyBar'
import WhatsAppButton from '../../components/WhatsAppButton'
import '../../styles/mx.css'
import '../../styles/pages/mal-di-schiena.css'

// Concetto: "dal rosso al verde". Il dolore è rosso, il sollievo verde: la colonna dei
// cinque problemi (L1–L5) si accende vertebra per vertebra quando arriva la soluzione.
function MalDiSchiena() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-page mx-mds">
        <AnnouncementBar />
        <VSLSection />
        <PainPointsSection />
        <OfferSection />
        <FAQSection />
        <FooterSection />
        <StickyBuyBar />
        <WhatsAppButton />
      </div>
    </MotionConfig>
  )
}

export default MalDiSchiena
