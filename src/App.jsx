import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

// Main website pages
import Home from './pages/sito-web/Home'
import Contatti from './pages/sito-web/Contatti'
import LavoraConNoi from './pages/sito-web/LavoraConNoi'
import ChiSiamo from './pages/sito-web/ChiSiamo'
import FAQ from './pages/sito-web/FAQ'
import Blog from './pages/sito-web/Blog'
import Risorse from './pages/sito-web/Risorse'
import Testimonianze from './pages/sito-web/Testimonianze'
import LaNostraStoria from './pages/sito-web/LaNostraStoria'
import MobilitasCard from './pages/sito-web/MobilitasCard'
import Newsletter from './pages/sito-web/Newsletter'
import Magazine from './pages/sito-web/Magazine'
import MobilitasFitness from './pages/sito-web/MobilitasFitness'
import OsteopataTorino from './pages/sito-web/OsteopataTorino'
import OsteopataTorinoConferma from './pages/sito-web/OsteopataTorinoConferma'
import OffertaYT from './pages/sito-web/OffertaYT'
import OffertaInfluencer from './pages/sito-web/OffertaInfluencer'
import OffertaInfluencerConferma from './pages/sito-web/OffertaInfluencerConferma'
import Mentorship from './pages/sito-web/Mentorship'
import Links from './pages/sito-web/Links'

// Job position pages
import Segretaria from './pages/sito-web/posizioni/Segretaria'
import VideoMaker from './pages/sito-web/posizioni/VideoMaker'
import Nutrizionista from './pages/sito-web/posizioni/Nutrizionista'
import SocialMediaManager from './pages/sito-web/posizioni/SocialMediaManager'
import Influencer from './pages/sito-web/posizioni/Influencer'

// Partnership pages
import GPADEL from './pages/sito-web/partnership/GPADEL'
import Abylsen from './pages/sito-web/partnership/Abylsen'
import StampaSubalpina from './pages/sito-web/partnership/StampaSubalpina'
import Robogest from './pages/sito-web/partnership/Robogest'
import Edenred from './pages/sito-web/partnership/Edenred'
import Allianz from './pages/sito-web/partnership/Allianz'

// Landing pages
import FirstWalk from './pages/landing-pages/FirstWalk'
import Emicrania from './pages/landing-pages/Emicrania'
import MalDiSchiena from './pages/landing-pages/MalDiSchiena'
import Gravidanza from './pages/landing-pages/Gravidanza'
import ThankYou from './pages/landing-pages/ThankYou'
import ThankYouCervicalgia from './pages/landing-pages/ThankYouCervicalgia'
import LmGPadelInfortuni from './pages/landing-pages/LmGPadelInfortuni'
import GpadelInfortuniThankYou from './pages/landing-pages/GpadelInfortuniThankYou'
import LmGpadelSconto39 from './pages/landing-pages/LmGpadelSconto39'
import CofanettoNatale from './pages/landing-pages/CofanettoNatale'
import Cervicalgia from './pages/Cervicalgia'

// 404 Page
import NotFound from './pages/NotFound'

// Login Page
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main website routes with layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/chi-siamo" element={<Layout><ChiSiamo /></Layout>} />
        <Route path="/contatti" element={<Layout><Contatti /></Layout>} />
        <Route path="/lavora-con-noi" element={<Layout><LavoraConNoi /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/risorse" element={<Layout><Risorse /></Layout>} />
        <Route path="/testimonianze" element={<Layout><Testimonianze /></Layout>} />
        <Route path="/la-nostra-storia" element={<Layout><LaNostraStoria /></Layout>} />
        <Route path="/carta-fedelta" element={<Layout><MobilitasCard /></Layout>} />
        <Route path="/newsletter" element={<Layout><Newsletter /></Layout>} />
        <Route path="/magazine" element={<Layout><Magazine /></Layout>} />
        <Route path="/mobilitas-fitness" element={<Layout><MobilitasFitness /></Layout>} />
        <Route path="/osteopata-torino" element={<Layout><OsteopataTorino /></Layout>} />
        <Route path="/osteopata-torino-conferma" element={<Layout><OsteopataTorinoConferma /></Layout>} />
        <Route path="/offerta-yt" element={<Layout><OffertaYT /></Layout>} />
        <Route path="/offerta-influencer" element={<Layout><OffertaInfluencer /></Layout>} />
        <Route path="/offerta-influencer-conferma" element={<Layout><OffertaInfluencerConferma /></Layout>} />
        <Route path="/mentorship" element={<Layout><Mentorship /></Layout>} />
        <Route path="/links" element={<Layout><Links /></Layout>} />
        <Route path="/cervicalgia" element={<Layout><Cervicalgia /></Layout>} />
        <Route path="/cervicalgia/conferma" element={<Layout><ThankYouCervicalgia /></Layout>} />
        
        {/* Job position routes with layout */}
        <Route path="/lavora-con-noi/segretaria" element={<Layout><Segretaria /></Layout>} />
        <Route path="/lavora-con-noi/video-maker" element={<Layout><VideoMaker /></Layout>} />
        <Route path="/lavora-con-noi/nutrizionista" element={<Layout><Nutrizionista /></Layout>} />
        <Route path="/lavora-con-noi/social-media-manager" element={<Layout><SocialMediaManager /></Layout>} />
        
        {/* Influencer page - direct menu item */}
        <Route path="/influencer" element={<Layout><Influencer /></Layout>} />
        
        {/* Partnership pages with layout */}
        <Route path="/partnership/gpadel" element={<Layout><GPADEL /></Layout>} />
        <Route path="/partnership/abylsen" element={<Layout><Abylsen /></Layout>} />
        <Route path="/partnership/stampa-subalpina" element={<Layout><StampaSubalpina /></Layout>} />
        <Route path="/partnership/robogest" element={<Layout><Robogest /></Layout>} />
        <Route path="/partnership/edenred" element={<Layout><Edenred /></Layout>} />
        <Route path="/partnership/allianz" element={<Layout><Allianz /></Layout>} />
        
        {/* Landing pages without main layout */}
        <Route path="/first-walk" element={<FirstWalk />} />
        <Route path="/emicrania" element={<Emicrania />} />
        <Route path="/mal-di-schiena" element={<MalDiSchiena />} />
        <Route path="/gravidanza" element={<Gravidanza />} />
        <Route path="/conferma" element={<ThankYou />} />
        <Route path="/lm-gpadel-infortuni" element={<LmGPadelInfortuni />} />
        <Route path="/lm-gpadel-infortuni-grazie" element={<GpadelInfortuniThankYou />} />
        <Route path="/lm-gpadel-sconto39-generico" element={<LmGpadelSconto39 />} />
        <Route path="/cofanetto-natale" element={<CofanettoNatale />} />
        
        {/* Login Page */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App