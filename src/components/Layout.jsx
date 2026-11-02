import React from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButtonSito from './WhatsAppButtonSito'

// hideFooterCta: niente "Prenota un consulto gratuito" nel footer (pagine di conferma: l'azione è prenotare la visita)
// footerCtaEvent: il bottone grande del footer apre il modulo della pagina invece di WhatsApp (vedi Footer)
const Layout = ({ children, hideWhatsApp = false, hideFooterCta = false, footerCtaEvent }) => {
  return (
    <div className="min-h-screen bg-cream w-full max-w-full overflow-x-clip">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer hideCta={hideFooterCta} ctaEvent={footerCtaEvent} />
      
      {/* WhatsApp Button */}
      {!hideWhatsApp && <WhatsAppButtonSito />}
    </div>
  )
}

export default Layout
