import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Dialog, { DialogHeader } from './ui/Dialog'
import { parseCellulare } from '../utils/phone'
import { dimenticaRichiesta, salvaRichiesta } from './prenota-visita/richiestaSalvata'

// Utility functions for data cleaning
const cleanName = (name) => {
  return name.trim().replace(/\s+/g, ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

// In dev: '' così le chiamate vanno a /api/... (stesso origin) e il proxy Vite le inoltra a hq.studiomobilitas.it/api/...
// In prod: base completa (se il backend abilita CORS per il tuo dominio, altrimenti serve proxy lato server)
// Nota: usiamo VITE_API_BASE per poter cambiare rapidamente endpoint senza toccare il codice.
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE ?? 'https://hq.studiomobilitas.it')


/** ID numerico dalla query string (il primo dei parametri presente). Toglie le graffe {{id}} / {id} se presenti. */
function readAdId(params, ...keys) {
  for (const key of keys) {
    const raw = params.get(key)?.trim()
    if (!raw) continue
    const id = raw.replace(/^\{\{?/, '').replace(/\}?\}$/, '').trim()
    if (/^\d+$/.test(id)) return id
  }
  return null
}

// Campo del gestionale → parametri dell'URL della landing. Si mandano solo quelli presenti.
// Meta: campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}} nei parametri URL dell'inserzione.
// Google: campaignid={campaignid}&adgroupid={adgroupid}&creative={creative} nel suffisso dell'URL finale
// (gad_campaignid lo aggiunge Google da solo con il tagging automatico).
const AD_ID_PARAMS = {
  metaAdCampaignId: ['campaign_id'],
  metaAdsetCampaignId: ['adset_id'],
  metaAdId: ['ad_id'],
  googleAdCampaignId: ['campaignid', 'gad_campaignid'],
  googleAdsetCampaignId: ['adgroupid'],
  googleAdId: ['creative'],
}

function adIdsFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(
    Object.entries(AD_ID_PARAMS)
      .map(([campo, keys]) => [campo, readAdId(params, ...keys)])
      .filter(([, id]) => id)
  )
}

const formatCurrentDate = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

// Contesto "visita" = prima visita / landing cliniche (senza pacchetto camminata)
const isLandingVisita = (pageContext) =>
  pageContext === 'cervicalgia' ||
  pageContext === 'reflusso' ||
  pageContext === 'vertigini' ||
  pageContext === 'bruxismo' ||
  pageContext === 'cicatrici-cesareo' ||
  pageContext === 'cicatrici-seno' ||
  pageContext === 'ciclo-doloroso' ||
  pageContext === 'fibromialgia' ||
  pageContext === 'menopausa' ||
  pageContext === 'maldischiena' ||
  pageContext === 'stitichezza' ||
  pageContext === 'gonfiore-addominale' ||
  pageContext === 'tunnel-carpale' ||
  pageContext === 'epicondilite' ||
  pageContext === 'colon-irritabile' ||
  pageContext === 'emicrania' ||
  pageContext === 'sciatalgia' ||
  pageContext === 'acufeni' ||
  pageContext === 'dolori-mandibolari' ||
  pageContext === 'sinusite-cronica' ||
  pageContext === 'epitrocleite' ||
  pageContext === 'tendinite' ||
  pageContext === 'pubalgia' ||
  pageContext === 'fascite-plantare' ||
  pageContext === 'scoliosi' ||
  pageContext === 'ernia-del-disco' ||
  pageContext === 'lombalgia' ||
  pageContext === 'osteopata-torino' ||
  pageContext === 'yt-postura'

const isVisitaContext = (packageType, pageContext) =>
  !packageType || isLandingVisita(pageContext)

// ctaType: 'consulto' = consulto gratuito, 'primaVisita' = prima visita con sconto
function getPopupCopy(packageType, pageContext, ctaType) {
  const isLanding = isLandingVisita(pageContext)
  const isConsulto = isLanding && ctaType === 'consulto'
  const isPrimaVisita = isLanding && (ctaType === 'primaVisita' || !ctaType)
  const isVisita = isVisitaContext(packageType, pageContext) && !isConsulto

  const isYtPostura = pageContext === 'yt-postura'

  if (isConsulto) {
    return {
      title: isYtPostura ? 'Hai ancora un dubbio?' : 'Richiedi consulto telefonico gratuito',
      subtitle: 'Consulenza gratuita',
      subtext: isYtPostura
        ? 'La segreteria ti richiama e ti spiega visita, 3 sedute e app. Senza impegno.'
        : 'La nostra segreteria ti chiamerà per un breve colloquio gratuito e darti tutte le informazioni.',
      cta: isYtPostura ? 'Chiamatemi' : 'Richiedi consulto gratuito',
      pacchettoLabel: isYtPostura ? 'Info percorso posturale YouTube' : 'Consulto gratuito',
    }
  }

  if (isPrimaVisita && isYtPostura) {
    return {
      title: 'Mettiti in lista',
      subtitle: 'Lista d’attesa',
      subtext: 'Non paghi ora. Lasci nome e numero. La segreteria ti richiama il prima possibile. I posti vanno a chi si iscrive prima.',
      cta: 'Mettiti in lista',
      pacchettoLabel: 'Lista d’attesa percorso posturale',
    }
  }

  if (isPrimaVisita) {
    return {
      title: 'Richiedi prima visita con sconto',
      subtitle: 'Prima visita a 49€',
      subtext: 'La nostra segreteria ti chiamerà per confermare l\'appuntamento e darti tutte le informazioni.',
      cta: 'Richiedi prima visita con sconto',
      pacchettoLabel: 'Prima visita',
    }
  }

  return {
    title: 'Prenota il tuo posto',
    subtitle: packageType === 'base' ? 'Pacchetto Base - 5€' : 'Pacchetto Premium - 39€',
    subtext: 'La nostra segreteria ti chiamerà per darti tutti i dettagli della camminata.',
    cta: 'Sì, voglio partecipare alla camminata',
    pacchettoLabel: packageType === 'base' ? 'Pacchetto Base - 5€' : packageType === 'premium' ? 'Pacchetto Premium - 39€' : 'Pacchetto non specificato',
  }
}

// Fasce orarie: il testo dell'etichetta finisce nelle note della richiesta ("Orario richiesta: …")
const ORARI = [
  { value: 'mattina', label: 'Mattina (9:00 – 12:00)' },
  { value: 'pausa-pranzo', label: 'Pausa pranzo (13:00 – 14:00)' },
  { value: 'pomeriggio', label: 'Pomeriggio (14:00 – 18:00)' },
  { value: 'sera', label: 'Sera (18:00 – 20:00)' },
  { value: 'qualsiasi', label: 'Qualsiasi orario' },
]

const EMPTY_FORM = { nome: '', cognome: '', cellulare: '', orarioChiamata: '', privacy: false }

const PRIVACY_URL = 'https://www.iubenda.com/privacy-policy/67925714'

export default function BookingPopup({ isOpen, onClose, packageType, pageContext, ctaType }) {
  const navigate = useNavigate()
  const uid = useId()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const copy = getPopupCopy(packageType, pageContext, ctaType)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const orarioText = ORARI.find((o) => o.value === formData.orarioChiamata)?.label || formData.orarioChiamata

    const { prefissoCellulare, cellulare } = parseCellulare(formData.cellulare)
    const isYtPostura = pageContext === 'yt-postura'
    const leadMagnetString =
      isLandingVisita(pageContext) && ctaType === 'consulto'
        ? 'CT_GRATUITA'
        : isYtPostura
          ? 'LISTA_ATTESA_YT_POSTURA'
          : 'COUPON49'
    const isPainLanding = isLandingVisita(pageContext) && !isYtPostura
    const leadMagnetRequestedString = ctaType === 'consulto' ? 'CT_GRATUITA' : 'COUPON49'

    // Tag dolore della richiesta: chiavi del gestionale (TAG_DOLORE_…), non il nome in italiano.
    // Epitrocleite non ha una chiave sua: è una tendinopatia del gomito
    const tagsByContext = {
      cervicalgia: ['TAG_DOLORE_CERVICALGIA'],
      reflusso: ['TAG_DOLORE_REFLUSSO'],
      vertigini: ['TAG_DOLORE_VERTIGINI'],
      bruxismo: ['TAG_DOLORE_BRUXISMO'],
      'cicatrici-cesareo': ['TAG_DOLORE_CICATRICI_CESAREO'],
      'cicatrici-seno': ['TAG_DOLORE_CICATRICI_SENO'],
      'ciclo-doloroso': ['TAG_DOLORE_CICLO_DOLOROSO'],
      fibromialgia: ['TAG_DOLORE_FIBROMIALGIA'],
      menopausa: ['TAG_DOLORE_MENOPAUSA'],
      maldischiena: ['TAG_DOLORE_MAL_DI_SCHIENA'],
      stitichezza: ['TAG_DOLORE_STITICHEZZA'],
      'gonfiore-addominale': ['TAG_DOLORE_GONFIORE_ADDOMINALE'],
      'tunnel-carpale': ['TAG_DOLORE_TUNNEL_CARPALE'],
      epicondilite: ['TAG_DOLORE_EPICONDILITE'],
      'colon-irritabile': ['TAG_DOLORE_COLON_IRRITABILE'],
      emicrania: ['TAG_DOLORE_EMICRANIA'],
      sciatalgia: ['TAG_DOLORE_SCIATALGIA'],
      acufeni: ['TAG_DOLORE_ACUFENI'],
      'dolori-mandibolari': ['TAG_DOLORE_ATM'],
      'sinusite-cronica': ['TAG_DOLORE_SINUSITE_CRONICA'],
      epitrocleite: ['TAG_DOLORE_TENDINITE'],
      tendinite: ['TAG_DOLORE_TENDINITE'],
      pubalgia: ['TAG_DOLORE_PUBALGIA'],
      'fascite-plantare': ['TAG_DOLORE_FASCITE_PLANTARE'],
      scoliosi: ['TAG_DOLORE_SCOLIOSI'],
      'ernia-del-disco': ['TAG_DOLORE_ERNIA_DEL_DISCO'],
      lombalgia: ['TAG_DOLORE_LOMBALGIA'],
    }
    // Senza una chiave dolore: restano sul vecchio campo tag (testo libero)
    const tagLegacyByContext = {
      'yt-postura': 'Lista attesa percorso YouTube',
      'osteopata-torino': 'Osteopata Torino',
    }

    // Fonte dagli ID degli annunci nell'URL: Meta → SOCIAL_ADS, Google → GOOGLE_ADS, nessuno dei due → niente fonte.
    // La campagna non si invia: la identificano gli ID degli annunci
    const adIds = adIdsFromUrl()
    const fonteString = isYtPostura
      ? 'YOUTUBE'
      : Object.keys(adIds).some((k) => k.startsWith('metaAd'))
        ? 'SOCIAL_ADS'
        : Object.keys(adIds).some((k) => k.startsWith('googleAd'))
          ? 'GOOGLE_ADS'
          : undefined

    const body = {
      nome: cleanName(formData.nome),
      cognome: cleanName(formData.cognome),
      prefissoCellulare,
      cellulare,
      statusRichiesta: 'LEAD',
      ...(fonteString && { fonteString }),
      leadMagnetString,
      ...(isPainLanding && { leadMagnetRequestedString }),
      ...adIds,
      ...(tagsByContext[pageContext] && { tags: tagsByContext[pageContext] }),
      ...(tagLegacyByContext[pageContext] && { tag: tagLegacyByContext[pageContext] }),
      note: orarioText ? `Orario richiesta: ${orarioText}` : undefined,
    }

    try {
      const response = await fetch(`${API_BASE}/api/richieste`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || json.message || `Errore ${response.status}`)
      }

      // Per la pagina di conferma (stesso URL per tutti): da quale dolore arriva, per il testo,
      // e id + token per il calendario della prima visita. Solo dalle landing dei dolori, non da pacchetti e lista d'attesa.
      if (isPainLanding) {
        salvaRichiesta({
          pageContext,
          id: json.data?.id ?? null,
          token: json.data?.tokenPrenotazione ?? null,
          tipo: ctaType === 'consulto' ? 'consulto' : 'primaVisita',
          nome: body.nome,
        })
      } else {
        dimenticaRichiesta()
      }

      setIsSubmitting(false)
      setFormData(EMPTY_FORM)
      setError(null)
      onClose()
      navigate('/conferma-richiesta')
    } catch (err) {
      console.error('API richieste:', err)
      setError(err.message || 'Si è verificato un errore. Riprova più tardi.')
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null)
      setFormData(EMPTY_FORM)
      onClose()
    }
  }

  const canSubmit =
    !isSubmitting &&
    formData.nome.trim() &&
    formData.cognome.trim() &&
    formData.cellulare.trim() &&
    formData.orarioChiamata &&
    formData.privacy
  // Tutto compilato tranne il consenso: la checkbox si illumina per far capire cosa manca
  const mancaSoloPrivacy =
    formData.nome.trim() && formData.cognome.trim() && formData.cellulare.trim() && formData.orarioChiamata && !formData.privacy

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} closeDisabled={isSubmitting} title={copy.title}>
      <DialogHeader title={copy.title} subtitle={copy.subtitle} text={copy.subtext} />

      <form className="mx-dlg-form" onSubmit={handleSubmit}>
        <div className="mx-dlg-row mx-dlg-row--2">
          <div className="mx-dlg-field">
            <label className="mx-dlg-label" htmlFor={`${uid}-nome`}>Nome *</label>
            <input
              className="mx-dlg-input"
              type="text"
              id={`${uid}-nome`}
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              autoComplete="given-name"
              placeholder="Mario"
            />
          </div>
          <div className="mx-dlg-field">
            <label className="mx-dlg-label" htmlFor={`${uid}-cognome`}>Cognome *</label>
            <input
              className="mx-dlg-input"
              type="text"
              id={`${uid}-cognome`}
              name="cognome"
              value={formData.cognome}
              onChange={handleInputChange}
              required
              autoComplete="family-name"
              placeholder="Rossi"
            />
          </div>
        </div>

        <div className="mx-dlg-field">
          <label className="mx-dlg-label" htmlFor={`${uid}-cellulare`}>Cellulare *</label>
          <input
            className="mx-dlg-input"
            type="tel"
            inputMode="tel"
            id={`${uid}-cellulare`}
            name="cellulare"
            value={formData.cellulare}
            onChange={handleInputChange}
            required
            autoComplete="tel"
            placeholder="+39 333 123 4567"
          />
        </div>

        <div className="mx-dlg-field">
          <span className="mx-dlg-label" id={`${uid}-orario`}>Orario *</span>
          <div className="mx-dlg-chips" role="radiogroup" aria-labelledby={`${uid}-orario`}>
            {ORARI.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={formData.orarioChiamata === o.value}
                className="mx-dlg-chip"
                onClick={() => setFormData((prev) => ({ ...prev, orarioChiamata: o.value }))}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="mx-dlg-error" role="alert">{error}</p>}

        {/* Consenso privacy obbligatorio: piccolo, subito prima dell'invio */}
        <label
          className={`mx-dlg-check mx-dlg-check--sm${mancaSoloPrivacy ? ' is-needed' : ''}`}
          htmlFor={`${uid}-privacy`}
        >
          <input
            type="checkbox"
            id={`${uid}-privacy`}
            name="privacy"
            checked={formData.privacy}
            onChange={handleInputChange}
            required
          />
          <span>
            Ho letto la{' '}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>{' '}
            e acconsento al trattamento dei miei dati. *
          </span>
        </label>

        <button type="submit" className="mx-dlg-submit" disabled={!canSubmit}>
          {isSubmitting ? (
            <>
              <span className="mx-dlg-spinner" aria-hidden="true" />
              Invio in corso...
            </>
          ) : (
            <>
              {copy.cta}
              <ArrowRight size={20} strokeWidth={2.6} />
            </>
          )}
        </button>
      </form>
    </Dialog>
  )
}
