import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Linkedin,
  Instagram,
  Upload,
  MessageCircle,
  User,
  Baby,
  Play,
  Facebook,
  Share2,
  Copy,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
} from 'lucide-react'
import './Links.css'

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const studioLinks = [
  {
    id: 'new-patients',
    title: 'Coupon esclusivo per nuovi clienti',
    url: 'https://www.studiomobilitas.it/osteopata-torino',
    icon: <User className="w-5 h-5" />,
  },
  {
    id: 'pregnant-women',
    title: 'Coupon per Donne in Gravidanza',
    url: 'https://www.studiomobilitas.it/gravidanza',
    icon: <Baby className="w-5 h-5" />,
  },
  {
    id: 'website',
    title: 'Sito web ufficiale',
    url: 'https://www.studiomobilitas.it/',
    icon: <Globe className="w-5 h-5" />,
  },
]

const socialLinks = [
  {
    id: 'youtube',
    title: 'Youtube',
    url: 'https://www.youtube.com/@Studio_Mobilitas',
    icon: <Play className="w-5 h-5" />,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    url: 'https://www.instagram.com/studio_mobilitas',
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    id: 'facebook',
    title: 'Facebook',
    url: 'https://www.facebook.com/studiomobilitas',
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/company/studio-mobilitas/?viewAsMember=true',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    url: 'https://www.tiktok.com/@studio_mobilitas',
    icon: <TikTokIcon className="w-5 h-5" />,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const menuVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -10,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

const ShareMenu = ({ isOpen, onClose, url, title, position, onCopyConfirm }) => {
  const shareOptions = [
    {
      name: 'Copia Link',
      icon: <Copy className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText(url)
        onCopyConfirm()
        onClose()
      },
    },
    {
      name: 'Condividi',
      icon: <Share2 className="w-4 h-4" />,
      action: () => {
        if (navigator.share) {
          navigator
            .share({
              title,
              url,
            })
            .catch((error) => {
              console.log('Errore durante la condivisione:', error)
            })
        } else {
          navigator.clipboard.writeText(url)
        }
        onClose()
      },
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="links-share-menu fixed z-50 min-w-[200px] rounded-lg py-2"
            style={{ left: position.x, top: position.y }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {shareOptions.map((option) => (
              <button
                key={option.name}
                className="links-share-menu-item flex w-full items-center space-x-3 px-4 py-3 text-left transition-colors duration-200"
                onClick={option.action}
              >
                <div className="links-share-menu-icon">{option.icon}</div>
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Links() {
  const [shareMenu, setShareMenu] = useState({
    isOpen: false,
    url: '',
    title: '',
    position: { x: 0, y: 0 },
  })
  const [showCopyToast, setShowCopyToast] = useState(false)

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleShareClick = (event, url, title) => {
    event.stopPropagation()
    const menuWidth = 200
    const menuHeight = 120
    let x = event.clientX - menuWidth / 2
    let y = event.clientY + 10

    if (x < 10) x = 10
    if (x + menuWidth > window.innerWidth - 10) x = window.innerWidth - menuWidth - 10
    if (y + menuHeight > window.innerHeight - 10) y = event.clientY - menuHeight - 10

    setShareMenu({ isOpen: true, url, title, position: { x, y } })
  }

  const closeShareMenu = () => setShareMenu((prev) => ({ ...prev, isOpen: false }))
  const showCopyConfirmation = () => {
    setShowCopyToast(true)
    setTimeout(() => setShowCopyToast(false), 2000)
  }

  return (
    <div className="links-page-bg min-h-screen w-full font-montserrat">
      <div className="mx-auto absolute inset-x-0 top-0 z-20 flex w-full max-w-5xl items-center justify-end px-4 pt-6">
        <button className="links-share-btn rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, window.location.href, 'Studio Mobilitas - Link')}>
          <Upload className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-center px-4 pb-16 pt-6">
        <motion.div className="links-shell relative w-full max-w-md" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="links-section-block text-center" variants={itemVariants}>
            <h2 className="links-title-primary mb-2 mt-2 text-left text-2xl font-semibold">Il tuo Studio Osteopatico di riferimento</h2>
            <p className="links-muted-text text-left text-sm">
              Una vita libera da dolori e limitazioni, per invecchiare in salute nonostante lo stile di vita moderno esagerato in tutto.
            </p>
          </motion.div>

          <motion.div className="links-section-block" variants={itemVariants}>
            <div className="links-panel rounded-xl p-6">
              <h3 className="links-section-title mb-4 text-left text-lg font-semibold">I Nostri Contatti</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-start space-x-2"><Phone className="links-icon-accent h-4 w-4" /><span className="links-muted-text text-sm">351 819 8457</span></div>
                <div className="flex items-center justify-start space-x-2"><Mail className="links-icon-accent h-4 w-4" /><span className="links-muted-text text-sm">studio@studiomobilitas.it</span></div>
                <div className="flex items-center justify-start space-x-2"><MapPin className="links-icon-accent h-4 w-4" /><span className="links-muted-text text-sm">Via Peyron 54 (Comodo con la metro)</span></div>
                <div className="flex items-center justify-start space-x-2"><MapPin className="links-icon-accent h-4 w-4" /><span className="links-muted-text text-sm">Via Lamarmora 35 (Crocetta)</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div className="links-section-block space-y-3" variants={containerVariants}>
            <motion.div className="mb-4" variants={itemVariants}><h3 className="links-section-title text-left text-base font-semibold">Prenota una prima visita scontata</h3></motion.div>
            {studioLinks.map((link) => (
              <motion.button key={link.id} className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick(link.url)} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <div className="flex items-center space-x-3"><div className="links-icon-accent">{link.icon}</div><span className="links-dark-text text-left text-sm font-semibold">{link.title}</span></div>
                <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, link.url, link.title)}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="links-section-block space-y-3" variants={containerVariants}>
            <motion.div className="mb-4" variants={itemVariants}><h3 className="links-section-title text-left text-base font-semibold">Indicazioni Studio</h3></motion.div>
            <motion.button className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick('https://www.google.com/maps/place/Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m6!3m5!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!16s%2Fg%2F11kqfhtyvd?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D')} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center space-x-3"><MapPin className="links-icon-accent h-5 w-5" /><span className="links-dark-text text-sm font-semibold">Peyron54 - Indicazioni studio</span></div>
              <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, 'https://www.google.com/maps/place/Studio+Osteopatico+-+OsteoTouch+SRL+-+Osteopata+Torino/@45.0802312,7.6577188,17z/data=!4m6!3m5!1s0xfe2e29f381fdc93:0x97eee174cab07ada!8m2!3d45.0802312!4d7.6577188!16s%2Fg%2F11kqfhtyvd?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D', 'Peyron54 - Indicazioni studio')}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
            </motion.button>
            <motion.button className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick('https://maps.app.goo.gl/PLiHZfBwBj4DqkL69')} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center space-x-3"><MapPin className="links-icon-accent h-5 w-5" /><span className="links-dark-text text-sm font-semibold">Lamarmora35 - Indicazioni studio</span></div>
              <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, 'https://maps.app.goo.gl/PLiHZfBwBj4DqkL69', 'Lamarmora35 - Indicazioni studio')}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
            </motion.button>
          </motion.div>

          <motion.div className="links-section-block space-y-3" variants={containerVariants}>
            <motion.div className="mb-4" variants={itemVariants}><h3 className="links-section-title text-left text-base font-semibold">Scrivi una recensione</h3></motion.div>
            <motion.button className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick('https://g.page/r/Cdp6sMp04e6XEBM/review')} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center space-x-3"><MessageCircle className="links-icon-accent h-5 w-5" /><span className="links-dark-text text-sm font-semibold">Peyron54 - Scrivi una recensione</span></div>
              <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, 'https://g.page/r/Cdp6sMp04e6XEBM/review', 'Peyron54 - Scrivi una recensione')}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
            </motion.button>
            <motion.button className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick('https://g.page/r/CZivuP4ENA5REBM/review')} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center space-x-3"><MessageCircle className="links-icon-accent h-5 w-5" /><span className="links-dark-text text-sm font-semibold">Lamarmora35 - Scrivi una recensione</span></div>
              <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, 'https://g.page/r/CZivuP4ENA5REBM/review', 'Lamarmora35 - Scrivi una recensione')}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
            </motion.button>
          </motion.div>

          <motion.div className="links-section-block space-y-3" variants={containerVariants}>
            <motion.div className="mb-4" variants={itemVariants}><h3 className="links-section-title text-left text-base font-semibold">Contattaci</h3></motion.div>
            <motion.button className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick('https://wa.me/393518198457')} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center space-x-3"><MessageSquare className="links-icon-accent h-5 w-5" /><span className="links-dark-text text-sm font-semibold">WhatsApp</span></div>
              <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, 'https://wa.me/393518198457', 'WhatsApp')}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
            </motion.button>
            <motion.button className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick('mailto:studio@studiomobilitas.it')} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center space-x-3"><Mail className="links-icon-accent h-5 w-5" /><span className="links-dark-text text-sm font-semibold">Email</span></div>
              <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, 'mailto:studio@studiomobilitas.it', 'Email')}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
            </motion.button>
          </motion.div>

          <motion.div className="space-y-3" variants={containerVariants}>
            <motion.div className="mb-4" variants={itemVariants}><h3 className="links-section-title text-left text-base font-semibold">Seguici sui Social Media</h3></motion.div>
            {socialLinks.map((link) => (
              <motion.button key={link.id} className="links-action-btn relative flex w-full items-center justify-between rounded-xl p-4 font-medium transition-all duration-300" onClick={() => handleLinkClick(link.url)} variants={itemVariants} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <div className="flex items-center space-x-3"><div className="links-icon-accent">{link.icon}</div><span className="links-dark-text text-sm font-semibold">{link.title}</span></div>
                <button className="links-more-btn flex space-x-1 rounded p-1 transition-colors duration-200" onClick={(e) => handleShareClick(e, link.url, link.title)}><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /><div className="links-more-dot h-1 w-1 rounded-full" /></button>
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="links-section-block" variants={itemVariants}>
            <div className="links-quote-card rounded-2xl p-8 text-left">
              <div className="mb-6">
                <div className="links-highlight-bar mb-4 h-0.5 w-12" />
                <blockquote className="links-muted-text text-lg leading-relaxed font-light italic">"La salute non è tutto, ma senza salute tutto è niente."</blockquote>
                <div className="links-highlight-bar mt-4 h-0.5 w-12" />
              </div>
              <div className="space-y-4">
                <h3 className="links-dark-text text-xl font-semibold">Non vediamo l'ora di accoglierti in studio 😁</h3>
                <p className="links-muted-text text-sm leading-relaxed">Il tuo benessere è la nostra priorità. Iniziamo insieme questo percorso verso una vita più sana e libera.</p>
              </div>
            </div>
          </motion.div>

          <ShareMenu isOpen={shareMenu.isOpen} onClose={closeShareMenu} url={shareMenu.url} title={shareMenu.title} position={shareMenu.position} onCopyConfirm={showCopyConfirmation} />

          <AnimatePresence>
            {showCopyToast && (
              <motion.div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform" initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.8 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
                <div className="links-copy-toast flex items-center space-x-2 rounded-full px-6 py-3">
                  <Copy className="h-4 w-4" />
                  <span className="text-sm font-medium">Link copiato negli appunti!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  )
}

export default Links
