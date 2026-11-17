import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Dialog, { DialogHeader } from '../ui/Dialog'
import { PREZZO_VISITA, PRIMA_VISITA_AMICO } from '../black-friday/offerta'
import { ORARI, costruisciRichiesta, inviaRichiesta } from './invito'

// Form dell'invito "porta un amico": lo stesso form del popup di prenotazione (stessi campi, stessa grafica mx-dlg-),
// con i valori della campagna (COUPON49, tag blackfriday, chi ha invitato): vedi invito.js.

const EMPTY_FORM = { nome: '', cognome: '', cellulare: '', orarioChiamata: '', privacy: false }
const PRIVACY_URL = 'https://www.iubenda.com/privacy-policy/67925714'

export default function RichiestaInvito({ isOpen, onClose, invito }) {
  const navigate = useNavigate()
  const uid = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [invio, setInvio] = useState(false)
  const [errore, setErrore] = useState(null)

  const cambia = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const invia = async (e) => {
    e.preventDefault()
    setInvio(true)
    setErrore(null)
    try {
      await inviaRichiesta(costruisciRichiesta(form, invito))
      setInvio(false)
      setForm(EMPTY_FORM)
      onClose()
      navigate('/conferma-richiesta')
    } catch (err) {
      console.error('API richieste:', err)
      setErrore(err.message || 'Si è verificato un errore. Riprova più tardi.')
      setInvio(false)
    }
  }

  const chiudi = () => {
    if (invio) return
    setErrore(null)
    onClose()
  }

  const compilato = form.nome.trim() && form.cognome.trim() && form.cellulare.trim() && form.orarioChiamata
  const puoiInviare = !invio && compilato && form.privacy
  const titolo = `Richiedi la prima visita a ${PRIMA_VISITA_AMICO}€`

  return (
    <Dialog isOpen={isOpen} onClose={chiudi} closeDisabled={invio} title={titolo}>
      <DialogHeader
        title={titolo}
        subtitle={`Invito Black Friday · ${PRIMA_VISITA_AMICO}€ invece di ${PREZZO_VISITA}€`}
        text={
          invito.nome
            ? `L’invito di ${invito.nome} è già collegato. Lasciaci i tuoi dati: la segreteria ti chiama per fissare l’appuntamento quando ti è più comodo.`
            : 'Lasciaci i tuoi dati: la segreteria ti chiama per fissare l’appuntamento quando ti è più comodo.'
        }
      />

      <form className="mx-dlg-form" onSubmit={invia}>
        <div className="mx-dlg-row mx-dlg-row--2">
          <div className="mx-dlg-field">
            <label className="mx-dlg-label" htmlFor={`${uid}-nome`}>
              Nome *
            </label>
            <input
              className="mx-dlg-input"
              type="text"
              id={`${uid}-nome`}
              name="nome"
              value={form.nome}
              onChange={cambia}
              required
              autoComplete="given-name"
              placeholder="Mario"
            />
          </div>
          <div className="mx-dlg-field">
            <label className="mx-dlg-label" htmlFor={`${uid}-cognome`}>
              Cognome *
            </label>
            <input
              className="mx-dlg-input"
              type="text"
              id={`${uid}-cognome`}
              name="cognome"
              value={form.cognome}
              onChange={cambia}
              required
              autoComplete="family-name"
              placeholder="Rossi"
            />
          </div>
        </div>

        <div className="mx-dlg-field">
          <label className="mx-dlg-label" htmlFor={`${uid}-cellulare`}>
            Cellulare *
          </label>
          <input
            className="mx-dlg-input"
            type="tel"
            inputMode="tel"
            id={`${uid}-cellulare`}
            name="cellulare"
            value={form.cellulare}
            onChange={cambia}
            required
            autoComplete="tel"
            placeholder="+39 333 123 4567"
          />
        </div>

        <div className="mx-dlg-field">
          <span className="mx-dlg-label" id={`${uid}-orario`}>
            Quando preferisci essere chiamato? *
          </span>
          <div className="mx-dlg-chips" role="radiogroup" aria-labelledby={`${uid}-orario`}>
            {ORARI.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={form.orarioChiamata === o.value}
                className="mx-dlg-chip"
                onClick={() => setForm((prev) => ({ ...prev, orarioChiamata: o.value }))}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {errore && (
          <p className="mx-dlg-error" role="alert">
            {errore}
          </p>
        )}

        <label className={`mx-dlg-check mx-dlg-check--sm${compilato && !form.privacy ? ' is-needed' : ''}`} htmlFor={`${uid}-privacy`}>
          <input type="checkbox" id={`${uid}-privacy`} name="privacy" checked={form.privacy} onChange={cambia} required />
          <span>
            Ho letto la{' '}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{' '}
            e acconsento al trattamento dei miei dati. *
          </span>
        </label>

        <button type="submit" className="mx-dlg-submit" disabled={!puoiInviare}>
          {invio ? (
            <>
              <span className="mx-dlg-spinner" aria-hidden="true" />
              Invio in corso...
            </>
          ) : (
            <>
              Richiedi la prima visita a {PRIMA_VISITA_AMICO}€
              <ArrowRight size={20} strokeWidth={2.6} />
            </>
          )}
        </button>
      </form>
    </Dialog>
  )
}
