import { Mail, FileText, Shield, MapPin, Phone } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="mx-mds-foot">
      <div className="mx-wrap">
        <div className="mx-mds-foot__grid">
          <div className="mx-mds-foot__brand">
            <img src="/pittogramma.png" alt="" width="44" height="44" loading="lazy" />
            <h3 className="mx-h mx-h--md">Studio Mobilitas</h3>
            <p>
              Specializzati nel trattamento osteopatico del mal di schiena e delle disfunzioni
              posturali. La tua salute è la nostra priorità.
            </p>
          </div>

          <ul className="mx-mds-foot__list">
            <li><MapPin size={18} /><span>Via Peyron 54, Torino (comodo con la metro)</span></li>
            <li><Phone size={18} /><span>+39 3518198457</span></li>
          </ul>

          <div>
            <h4 className="mx-mds-foot__h">Contatti</h4>
            <ul className="mx-mds-foot__list">
              <li>
                <Mail size={18} />
                <a href="mailto:studio@studiomobilitas.it">studio@studiomobilitas.it</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mx-mds-foot__h">Informazioni Legali</h4>
            <ul className="mx-mds-foot__list">
              <li><FileText size={18} /><span>P.IVA: 13020400019</span></li>
              <li>
                <Shield size={18} />
                <a href="https://www.iubenda.com/privacy-policy/67925714" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <Shield size={18} />
                <a href="https://www.iubenda.com/privacy-policy/67925714/cookie-policy" target="_blank" rel="noopener noreferrer">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-mds-foot__bottom">
          <p>© 2024 Studio Mobilitas. Tutti i diritti riservati.</p>
          <p>Trattamento osteopatico specializzato per mal di schiena e disfunzioni posturali</p>
        </div>
      </div>
    </footer>
  )
}
