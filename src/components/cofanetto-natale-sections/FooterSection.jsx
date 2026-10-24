import { Mail, FileText, Shield, MapPin, Phone, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="mx-xmas-foot">
      <div className="mx-wrap">
        <div className="mx-xmas-foot__grid">
          <div>
            <h3 className="mx-h mx-xmas-foot__brand">Studio Mobilitas</h3>
            <p className="mx-xmas-foot__about">
              Trattamenti osteopatici specializzati per ogni esigenza specifica.
              La tua salute e il tuo benessere sono la nostra priorità.
              Offriamo percorsi personalizzati per ogni persona.
            </p>
            <ul className="mx-xmas-foot__list">
              <li><MapPin size={18} /><span>Via Peyron 54, Torino (comodo con la metro)</span></li>
              <li><Phone size={18} /><a href="tel:+393518198457">+39 3518198457</a></li>
              <li><Mail size={18} /><a href="mailto:studio@studiomobilitas.it">studio@studiomobilitas.it</a></li>
              <li><Clock size={18} /><span>Lun-Ven: 8:00-21:00 | Sab: 9:00-18:00</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mx-xmas-foot__h">I Nostri Servizi</h4>
            <p className="mx-xmas-foot__p">Trattamenti osteopatici specifici</p>
            <p className="mx-xmas-foot__p">Percorsi benessere multidisciplinari</p>
          </div>

          <div>
            <h4 className="mx-xmas-foot__h">Informazioni</h4>
            <ul className="mx-xmas-foot__list">
              <li><FileText size={18} /><span>P.IVA: 13020400019</span></li>
              <li><Shield size={18} /><a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><Shield size={18} /><a href="https://www.iubenda.com/privacy-policy/67925714/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</a></li>
            </ul>
            <h5 className="mx-xmas-foot__h mx-xmas-foot__h--social">Seguici</h5>
            <div className="mx-xmas-foot__social">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>

        <div className="mx-xmas-foot__bottom">
          <p>© 2024 Studio Mobilitas. Tutti i diritti riservati.</p>
          <p>Trattamento osteopatico specializzato a Torino</p>
        </div>
      </div>
    </footer>
  )
}
