import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Check, CreditCard, FlaskConical, Loader2, Lock } from 'lucide-react'
import { caricaPayPal } from './paypalSdk'
import { confermaOrdine, creaOrdine } from './checkoutApi'

// Scelta del metodo e bottone di pagamento. Tre metodi, sempre gli stessi: carta (il form della carta di PayPal,
// senza conto PayPal), PayPal e PayPal in 3 rate. Con ambiente LIVE o SANDBOX i bottoni sono quelli di PayPal
// (fundingSource fisso, così sappiamo quale metodo ha scelto la persona); con SIMULATO (gestionale locale senza
// credenziali sandbox) li simula la pagina, con anche il pagamento rifiutato da provare.
// Ogni clic sul bottone crea un ordine nel gestionale con i dati del form (getDati) e lo conferma dopo PayPal.

const EASE = [0.23, 1, 0.32, 1]

const euro = (n) => `${Number(n).toLocaleString('it-IT', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })}€`

const METODI = [
  { id: 'CARTA', funding: 'card', titolo: 'Carta di credito o debito', con: 'con carta', nota: 'Visa, Mastercard, American Express. Senza conto PayPal.' },
  { id: 'PAYPAL', funding: 'paypal', titolo: 'PayPal', con: 'con PayPal', nota: 'Paghi con il tuo conto PayPal.' },
  { id: 'PAYPAL_RATE', funding: 'paylater', titolo: 'PayPal in 3 rate', con: 'in 3 rate con PayPal', nota: null },
]

function IconaMetodo({ id }) {
  if (id === 'CARTA') return <CreditCard size={20} strokeWidth={1.8} aria-hidden="true" />
  return (
    <span className="ckx-pp" aria-hidden="true">
      P{id === 'PAYPAL_RATE' ? <small>3</small> : null}
    </span>
  )
}

// Bottone PayPal per un metodo solo. Si rimonta quando cambia il metodo.
function BottonePayPal({ paypal, metodo, onCreate, onApprove, onErrore, onAnnulla, onNonDisponibile }) {
  const ref = useRef(null)
  const cb = useRef({ onCreate, onApprove, onErrore, onAnnulla, onNonDisponibile })
  cb.current = { onCreate, onApprove, onErrore, onAnnulla, onNonDisponibile }

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const fundingSource = paypal.FUNDING[metodo.funding.toUpperCase()]
    const bottone = paypal.Buttons({
      fundingSource,
      style: { shape: 'pill', height: 52, label: 'pay', ...(metodo.funding === 'paypal' ? { color: 'gold' } : {}) },
      createOrder: () => cb.current.onCreate(),
      onApprove: (data, actions) => cb.current.onApprove(data, actions),
      onError: (err) => cb.current.onErrore(err),
      onCancel: () => cb.current.onAnnulla(),
    })
    if (!bottone.isEligible()) {
      cb.current.onNonDisponibile(metodo.id)
      return undefined
    }
    bottone.render(el).catch(() => {})
    return () => {
      bottone.close?.().catch?.(() => {})
      el.innerHTML = ''
    }
  }, [paypal, metodo])

  return <div ref={ref} className="ckx-ppbtn" />
}

export default function MetodiPagamento({ offerta, getDati, onFatto, disabilitato }) {
  const simulato = offerta.ambiente === 'SIMULATO'
  const [metodo, setMetodo] = useState(METODI[0])
  const [paypal, setPaypal] = useState(null)
  const [statoSdk, setStatoSdk] = useState(simulato ? 'pronto' : 'carica')
  const [nonDisponibili, setNonDisponibili] = useState([])
  const [errore, setErrore] = useState(null)
  const [lavoro, setLavoro] = useState(null) // null | 'crea' | 'conferma'
  const ordineRef = useRef(null)

  useEffect(() => {
    if (simulato) return undefined
    let vivo = true
    caricaPayPal(offerta.paypalClientId, offerta.ambiente === 'SANDBOX').then(
      (pp) => {
        if (!vivo) return
        setPaypal(pp)
        setStatoSdk('pronto')
      },
      () => vivo && setStatoSdk('errore'),
    )
    return () => {
      vivo = false
    }
  }, [simulato, offerta.paypalClientId, offerta.ambiente])

  // Crea l'ordine nel gestionale: torna l'id dell'ordine PayPal da approvare
  const crea = async (id) => {
    setErrore(null)
    const dati = getDati()
    if (!dati) throw new Error('dati')
    setLavoro('crea')
    try {
      const r = await creaOrdine({ ...dati, offerta: offerta.codice, pagatoCon: id })
      ordineRef.current = r.ordine
      return r.paypalOrderId
    } catch (e) {
      setErrore(e.message)
      throw e
    } finally {
      setLavoro(null)
    }
  }

  const conferma = async (paypalOrderId, simulaRifiuto, actions) => {
    setLavoro('conferma')
    setErrore(null)
    try {
      const ricevuta = await confermaOrdine(ordineRef.current, paypalOrderId, simulaRifiuto)
      onFatto(ricevuta)
    } catch (e) {
      // Carta rifiutata: PayPal riapre la finestra per scegliere un'altra carta o un altro conto
      if (e.rifiutato && actions?.restart) {
        setErrore(e.message)
        return actions.restart()
      }
      setErrore(e.message)
    } finally {
      setLavoro(null)
    }
    return undefined
  }

  const paga = async (simulaRifiuto) => {
    try {
      const id = await crea(metodo.id)
      await conferma(id, simulaRifiuto)
    } catch {
      // errore già mostrato
    }
  }

  const rata = Math.round((offerta.importo / 3) * 100) / 100

  return (
    <div className={`ckx-pay ${disabilitato ? 'is-off' : ''}`}>
      <div className="ckx-methods" role="radiogroup" aria-label="Come vuoi pagare">
        {METODI.map((m) => {
          const off = nonDisponibili.includes(m.id)
          const attivo = metodo.id === m.id
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={attivo}
              disabled={off || disabilitato}
              className={`ckx-method ${attivo ? 'is-on' : ''}`}
              onClick={() => {
                setMetodo(m)
                setErrore(null)
              }}
            >
              <span className="ckx-method__radio" aria-hidden="true">{attivo ? <Check size={14} strokeWidth={3} /> : null}</span>
              <span className="ckx-method__ico"><IconaMetodo id={m.id} /></span>
              <span className="ckx-method__txt">
                <b>{m.titolo}</b>
                <small>
                  {off
                    ? 'Non disponibile in questo momento'
                    : m.id === 'PAYPAL_RATE'
                      ? `3 rate da ${euro(rata)} senza interessi, soggetto ad approvazione di PayPal.`
                      : m.nota}
                </small>
              </span>
            </button>
          )
        })}
      </div>

      <div className="ckx-paybox">
        {statoSdk === 'carica' ? (
          <p className="ckx-paybox__wait"><Loader2 className="ckx-spin" size={18} aria-hidden="true" /> Carico il pagamento sicuro…</p>
        ) : statoSdk === 'errore' ? (
          <p className="ckx-alert" role="alert">
            <AlertTriangle size={18} aria-hidden="true" />
            Non riusciamo a raggiungere PayPal. Ricarica la pagina o riprova tra poco.
          </p>
        ) : simulato ? (
          <div className="ckx-sim">
            <p className="ckx-sim__tag"><FlaskConical size={14} aria-hidden="true" /> Pagamento simulato · nessun addebito</p>
            <button type="button" className="ckx-cta" disabled={disabilitato || lavoro != null} onClick={() => paga(false)}>
              {lavoro ? <Loader2 className="ckx-spin" size={18} aria-hidden="true" /> : <Lock size={16} aria-hidden="true" />}
              Paga {euro(offerta.importo)} {metodo.con}
            </button>
            <button type="button" className="ckx-sim__ko" disabled={disabilitato || lavoro != null} onClick={() => paga(true)}>
              Prova un pagamento rifiutato
            </button>
          </div>
        ) : paypal && !disabilitato ? (
          <BottonePayPal
            key={metodo.id}
            paypal={paypal}
            metodo={metodo}
            onCreate={() => crea(metodo.id)}
            onApprove={(data, actions) => conferma(data.orderID, false, actions)}
            onErrore={() => setErrore((e) => e || 'Il pagamento non è partito. Riprova o scegli un altro metodo.')}
            onAnnulla={() => setErrore('Pagamento annullato: quando vuoi, riprova.')}
            onNonDisponibile={(id) => {
              setNonDisponibili((l) => (l.includes(id) ? l : [...l, id]))
              setMetodo((m) => (m.id === id ? METODI.find((x) => x.id !== id) : m))
            }}
          />
        ) : (
          <p className="ckx-paybox__wait">Compila i tuoi dati per scegliere come pagare.</p>
        )}

        <AnimatePresence>
          {lavoro === 'conferma' ? (
            <motion.p
              className="ckx-paybox__wait"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <Loader2 className="ckx-spin" size={18} aria-hidden="true" /> Confermo il pagamento, non chiudere la pagina…
            </motion.p>
          ) : null}
        </AnimatePresence>

        {errore ? (
          <p className="ckx-alert" role="alert">
            <AlertTriangle size={18} aria-hidden="true" />
            {errore}
          </p>
        ) : null}
      </div>
    </div>
  )
}
