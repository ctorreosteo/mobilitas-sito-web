# Integrazioni

## Gestionale (mobilitas-hq)

È l'unico backend del sito. L'API è pubblica, senza credenziali.

| Ambiente | Indirizzo |
|----------|-----------|
| Produzione | `VITE_API_BASE`, altrimenti `https://hq.studiomobilitas.it` |
| Sviluppo | `/api` su `localhost:5173`, inoltrato dal proxy di Vite a `localhost:8080` |
| Sviluppo, solo recensioni | `VITE_API_BASE`, così il carosello funziona senza gestionale locale |

`VITE_API_BASE` viene letta durante la build: il valore del `.env` della macchina che fa il deploy finisce nel bundle.

| Metodo | Endpoint | Uso |
|--------|----------|-----|
| POST | `/api/richieste` | Crea la richiesta (lead) |
| GET | `/api/sito/prenotazione/disponibilita?studio=<id>` | Giorni e orari liberi |
| POST | `/api/sito/prenotazione` | Prenota: `{ richiestaId, token, studio, data, ora }`. 409 se l'orario è stato preso |
| GET | `/api/sito/video/codice/<codice>` | Video per codice: `cloudflareUid`, `anteprimaUrl`. 404 se non esiste |
| GET | `/api/sito/recensioni?tag=<tag>&limite=<n>` | Recensioni per tag, `tag` ripetibile |
| GET | `/api/sito/recensioni/totali` | Totale recensioni Google |

Le risposte hanno la forma `{ success, data, message }`.

### Campi di `/api/richieste`

| Campo | Contenuto |
|-------|-----------|
| `nome`, `cognome` | Normalizzati con le iniziali maiuscole |
| `prefissoCellulare`, `cellulare` | Da `parseCellulare` in `utils/phone.js` |
| `statusRichiesta` | Sempre `LEAD` |
| `leadMagnetString` | Offerta, es. `COUPON49` o `LISTA_ATTESA_YT_POSTURA` |
| `leadMagnetRequestedString` | Sulle landing dei dolori: `COUPON49` o `CT_GRATUITA` (consulto) |
| `fonteString` | `YOUTUBE`, `SOCIAL_ADS`, `GOOGLE_ADS` o assente |
| `tags` | Chiavi `TAG_DOLORE_*` |
| `tag` | Vecchio campo testuale, per le landing senza chiave dolore |
| ID annunci | Vedi sotto |
| `note` | Orario preferito per la chiamata |

### ID degli annunci

`BookingPopup` legge gli ID dall'URL della landing, tiene solo quelli numerici e ne ricava la fonte.

| Campo | Parametro URL | Da impostare in |
|-------|---------------|-----------------|
| `metaAdCampaignId` | `campaign_id={{campaign.id}}` | Parametri URL dell'inserzione Meta |
| `metaAdsetCampaignId` | `adset_id={{adset.id}}` | Parametri URL dell'inserzione Meta |
| `metaAdId` | `ad_id={{ad.id}}` | Parametri URL dell'inserzione Meta |
| `googleAdCampaignId` | `campaignid={campaignid}` o `gad_campaignid` | Suffisso URL finale Google (il secondo arriva dal tagging automatico) |
| `googleAdsetCampaignId` | `adgroupid={adgroupid}` | Suffisso URL finale Google |
| `googleAdId` | `creative={creative}` | Suffisso URL finale Google |

## Dalla landing alla visita

1. L'utente apre il popup con la CTA "Prima visita" o "Consulto gratuito".
2. `BookingPopup` invia `POST /api/richieste`.
3. Il gestionale risponde con `id` e `tokenPrenotazione`.
4. Il popup salva `pageContext`, `id`, `token`, `tipo` e `nome` in `sessionStorage` (`richiestaSalvata.js`) e porta a `/conferma-richiesta`. L'URL è uguale per tutte le landing: è lo storage a dire da dove arriva l'utente.
5. `ThankYouRichiesta` parte con testi e recensioni del dolore e, se ha `id` e `token`, mostra il calendario `PrenotaVisita`.
6. L'utente sceglie studio, giorno e ora. L'osteopata lo assegna il gestionale.

Senza dati in `sessionStorage` (storage bloccato, pagina aperta direttamente) la conferma resta generica e senza calendario. Lista d'attesa e pacchetti non salvano la richiesta.

## Dove vanno i form

| Form | Destinazione | Dopo l'invio |
|------|--------------|--------------|
| `BookingPopup`: landing prima visita, `/yt-postura`, `/first-walk` | Gestionale | `/conferma-richiesta` |
| `yt-postura-v2/richiesta.js` | Gestionale | `/conferma-richiesta` |
| `GpadelInfortuniPopup` | Gestionale | `/lm-gpadel-infortuni-grazie` |
| `OffertaInfluencer` | Gestionale | `/offerta-influencer-conferma` |
| `OffertaYT` | Zapier | `/conferma-richiesta` |
| `gravidanza-sections/BookingPopup` | Zapier | Messaggio nel popup, che si chiude dopo 3 secondi |

## Tracciamento

Gli script sono in `index.html`.

| Servizio | ID | Note |
|----------|----|------|
| Google Ads | `AW-16532564533` | |
| Meta Pixel | `983687211094705` | `/mentorship` usa anche `751362634658136` |
| Microsoft Clarity | `umgujv253c` | Disattivato su localhost e reti locali |

| Evento | Quando |
|--------|--------|
| Meta `PageView` | Solo al primo caricamento del sito, non ai cambi di route |
| Meta `Lead` | Apertura di `/conferma-richiesta` |
| Meta `Schedule` | Prenotazione dal calendario |
| Conversione Google Ads | `/conferma-richiesta`, solo per le landing in `CONVERSIONI_GOOGLE_ADS` |
| Conversione Google Ads | `/offerta-influencer-conferma` |

## Altri servizi

| Servizio | Uso | Dove |
|----------|-----|------|
| Cloudflare Stream | Video delle landing, codice dal gestionale | `condition-landing/heroVideo.js` |
| Cloudflare Stream | Video di `/cervicalgia`, ID fisso più `VITE_CLOUDFLARE_STREAM_CUSTOMER_CODE` | `Cervicalgia.jsx` |
| Vimeo | Video di `/mal-di-schiena` | `mal-di-schiena-sections/VSLSection.jsx` |
| Wistia | Video di `/gravidanza` | `gravidanza-sections/VSLSection.jsx` |
| Stripe Payment Links | Pagamento di `/mal-di-schiena` | `mal-di-schiena-sections/OfferSection.jsx` |
| OpenFreeMap | Tile della mappa | `studi-map/mapStyle.js` |
| Iubenda | Privacy e cookie policy | Footer e form |
| WhatsApp | Contatto, numero +39 351 819 8457 | Footer, header, FAB, conferma |
| Google Fonts | Montserrat | `index.html`, `index.css` |
