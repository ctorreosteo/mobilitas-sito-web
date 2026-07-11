import React from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButtonSito from './WhatsAppButtonSito'

const Layout = ({ children, hideWhatsApp = false }) => {
  return (
    <div className="min-h-screen bg-cream w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      {!hideWhatsApp && <WhatsAppButtonSito />}
    </div>
  )
}

export default Layout
