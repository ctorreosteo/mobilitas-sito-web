import { Mail, FileText, Shield, MapPin, Phone, Heart } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="mx-grav-foot">
      <div className="mx-wrap">
        <div className="mx-grav-foot__grid">
          <div>
            <h3 className="mx-h mx-grav-foot__brand">Studio Mobilitas</h3>
            <p className="mx-grav-foot__about">
              Specializzati nel trattamento osteopatico per la gravidanza e le disfunzioni
              posturali. Il benessere di mamma e bambino è la nostra priorità.
            </p>
            <ul className="mx-grav-foot__list">
              <li><MapPin size={18} /><span>Via Peyron 54, Torino (comodo con la metro)</span></li>
              <li><Phone size={18} /><span>+39 3518198457</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mx-grav-foot__h">Contatti</h4>
            <ul className="mx-grav-foot__list">
              <li><Mail size={18} /><a href="mailto:studio@studiomobilitas.it">studio@studiomobilitas.it</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mx-grav-foot__h">Informazioni Legali</h4>
            <ul className="mx-grav-foot__list">
              <li><FileText size={18} /><span>P.IVA: 13020400019</span></li>
              <li>
                <Shield size={18} />
                <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </li>
              <li>
                <Shield size={18} />
                <a href="https://www.iubenda.com/privacy-policy/67925714/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-grav-foot__bottom">
          <p>© 2024 Studio Mobilitas. Tutti i diritti riservati.</p>
          <p>Trattamento osteopatico specializzato per la gravidanza e il benessere di mamma e bambino</p>
          <p className="mx-grav-foot__love"><Heart size={14} /> <span>Fatto con amore per le mamme</span></p>
        </div>
      </div>
    </footer>
  )
}
