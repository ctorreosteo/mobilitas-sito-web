import { Link } from 'react-router-dom'
import { ArrowLeft, FlaskConical, Lock } from 'lucide-react'
import '../../styles/pages/black-friday-2026.css'
import '../../styles/pages/checkout.css'

export const PRIVACY = 'https://www.iubenda.com/privacy-policy/67925714'

// Cornice comune di pagamento e conferma del Black Friday: sfondo con gli aloni, intestazione col logo, striscia di
// prova (ambiente SANDBOX o SIMULATO), piè di pagina. Stile in styles/pages/checkout.css (prefisso ckx-).
export default function CheckoutShell({ ambiente, dock = false, children, after }) {
  return (
    <div className={`bfx ckx ${dock ? 'has-dock' : ''}`}>
      <div className="ckx-bg" aria-hidden="true">
        <span className="ckx-bg__glow is-a" />
        <span className="ckx-bg__glow is-b" />
        <span className="ckx-bg__grid" />
      </div>

      <header className="ckx-top">
        <div className="ckx-wrap ckx-top__in">
          <Link to="/black-friday-2026" className="ckx-link ckx-top__back"><ArrowLeft size={16} aria-hidden="true" /> <span>Torna all'offerta</span></Link>
          <Link to="/" className="ckx-logo" aria-label="Studio Mobilitas">
            <img src="/logo_verde.png" alt="Studio Mobilitas" />
          </Link>
          <span className="ckx-secure"><Lock size={14} aria-hidden="true" /> <span>Pagamento sicuro</span></span>
        </div>
      </header>

      {ambiente && ambiente !== 'LIVE' ? (
        <div className="ckx-test" role="note">
          <FlaskConical size={16} aria-hidden="true" />
          {ambiente === 'SANDBOX'
            ? 'Ambiente di prova PayPal (sandbox): usa le carte e i conti di prova, nessun pagamento è reale.'
            : 'Pagamento simulato dal gestionale locale: nessun pagamento è reale.'}
        </div>
      ) : null}

      <main className="ckx-wrap ckx-main">{children}</main>

      {after}

      <footer className="ckx-foot">
        <div className="ckx-wrap">
          Studio Mobilitas · Via Peyron 54 e Via Lamarmora 35, Torino ·{' '}
          <a href={PRIVACY} target="_blank" rel="noopener noreferrer">Privacy</a>
        </div>
      </footer>
    </div>
  )
}
