# Integrazioni

## Gestionale (mobilitas-hq)

È l'unico backend del sito. L'API è pubblica, senza credenziali.

| Ambiente | Indirizzo |
|----------|-----------|
| Produzione | `VITE_API_BASE`, altrimenti `https://hq.studiomobilitas.it` |
| Sviluppo | `/api` su `localhost:5173`, inoltrato dal proxy di Vite a `localhost:8080` |
| Sviluppo, recensioni e video | `VITE_API_BASE`, così carosello e VSL funzionano senza gestionale locale |

`VITE_API_BASE` viene letta durante la build: il valore del `.env` della macchina che fa il deploy finisce nel bundle.

| Metodo | Endpoint | Uso |
|--------|----------|-----|
| POST | `/api/richieste` | Crea la richiesta (lead) |
| GET | `/api/sito/prenotazione/disponibilita?studio=<id>&percorso=<p>` | Giorni e orari liberi. `percorso` (`gravidanza` o `pediatria`, facoltativo): solo gli osteopati con la spunta «Prenotabile dal sito per gravidanza e pediatria» nel gestionale |
| POST | `/api/sito/prenotazione` | Prenota: `{ richiestaId, token, studio, data, ora, percorso? }`. 409 se l'orario è stato preso. Il percorso vale anche se la richiesta ha il tag `TAG_DOLORE_GRAVIDANZA` o `TAG_DOLORE_PEDIATRIA` |
| GET | `/api/sito/video/codice/<codice>` | Video per codice: `cloudflareUid`, `anteprimaUrl`. 404 se non esiste |
| GET | `/api/sito/recensioni?tag=<tag>&limite=<n>` | Recensioni per tag, `tag` ripetibile |
| GET | `/api/sito/recensioni/totali` | Totale recensioni Google |
| GET | `/api/sito/checkout/offerte/<codice>` | Offerta da pagare online: `nome`, `importo`, `validaFino`, `disponibile` (e `motivo` se no), `ambiente`, `paypalClientId`. Vedi [Pagamento online](#pagamento-online) |
| POST | `/api/sito/checkout/ordini` | Crea l'ordine con i dati di fatturazione e `pagatoCon` (`CARTA`, `PAYPAL`, `PAYPAL_RATE`) → `{ ordine, paypalOrderId, ambiente }` |
| POST | `/api/sito/checkout/ordini/<ordine>/conferma` | Incassa dopo PayPal: `{ paypalOrderId, simulaRifiuto? }` → ricevuta. 402 se il pagamento è rifiutato |

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
5. `ThankYouRichiesta` parte con testi e recensioni del dolore e, se ha `id` e `token`, mostra il calendario `PrenotaVisita`. Se `pageContext` è `gravidanza` o `pediatria`, il calendario lo manda come `percorso`.
6. L'utente sceglie studio, giorno e ora. L'osteopata lo assegna il gestionale.

Senza dati in `sessionStorage` (storage bloccato, pagina aperta direttamente) la conferma resta generica e senza calendario. Lista d'attesa e pacchetti non salvano la richiesta.

## Dove vanno i form

| Form | Destinazione | Dopo l'invio |
|------|--------------|--------------|
| `BookingPopup`: landing prima visita, `/first-walk` | Gestionale | `/conferma-richiesta` |
| `yt-postura/richiesta.js` (va sempre al gestionale pubblicato, anche in locale; `?gestionale=locale` per quello locale) | Gestionale | `/conferma-richiesta` |
| `GpadelInfortuniPopup` | Gestionale | `/lm-gpadel-infortuni-grazie` |
| `OffertaInfluencer` | Gestionale | `/offerta-influencer-conferma` |
| `OffertaYT` | Zapier | `/conferma-richiesta` |
| `gravidanza-sections/BookingPopup` | Zapier | Messaggio nel popup, che si chiude dopo 3 secondi |

## Pagamento online

`/black-friday-2026/pagamento` (`pages/landing-pages/CheckoutBlackFriday.jsx`, pezzi in `components/checkout/`, stile `styles/pages/checkout.css`, prefisso `ckx-`) vende l'offerta `BLACK_FRIDAY_2026` del gestionale. Prezzo, scadenza e disponibilità li decide il gestionale: la pagina li legge e non manda mai un importo.

1. Legge l'offerta. Se non è disponibile (scaduta o pagamenti spenti) mostra il motivo e niente form.
2. Dati di fatturazione, tutti obbligatori: nome, cognome, codice fiscale (controllato col carattere di controllo, `components/checkout/validazione.js`), email, cellulare, indirizzo, CAP, città, nazione, consenso privacy. I bottoni di pagamento compaiono solo a dati completi.
3. Come pagare: carta (form della carta di PayPal, senza conto), PayPal o PayPal in 3 rate. Il bottone scelto va al gestionale come `pagatoCon`; il metodo di pagamento dell'ordine è sempre «PayPal». Sono i bottoni di PayPal (`components/checkout/paypalSdk.js`, script `paypal.com/sdk/js` col client id che dà il gestionale), uno per metodo: il bottone crea l'ordine nel gestionale, PayPal fa approvare, la pagina conferma. Carta rifiutata: PayPal fa riprovare.
In alto i tre passi (dati, pagamento, fatto) avanzano da soli; i campi sono in tre gruppi con la spunta quando sono giusti e un contatore; su telefono il riepilogo sta in cima e una barra fissa in basso mostra il totale e porta al primo dato mancante, o al pagamento. Solo Montserrat, anche per codice fiscale e numeri. Pagamento e conferma usano la carta Black Friday nella variante blu Mobilitas (`CartaBlack variante="blu"`, stile `.bfx-card--blu` in `black-friday-2026.css`), come la landing.

4. A pagamento riuscito la pagina salva la ricevuta in `sessionStorage` (`components/checkout/ricevutaSalvata.js`, valida un giorno) e porta a `/black-friday-2026/grazie` (`ConfermaPagamentoBlackFriday.jsx`): coriandoli all'arrivo (non con «riduci movimento»), la carta Black Friday col timbro «Pagata», lo scontrino (numero, intestatario, data, metodo, totale) con «Stampa la ricevuta» che stampa solo quello, i prossimi passi e i due studi con le indicazioni. Regge il ricaricamento finché la scheda è aperta. Aperta senza ricevuta (link diretto, altro browser) mostra un ringraziamento generico, senza dati e senza conversioni. Il gestionale ha già mandato l'email di conferma e l'ordine è nella sua pagina Ordini online. Cornice comune alle due pagine: `components/checkout/CheckoutShell.jsx`, passi in `Passi.jsx`.

**In locale non si paga mai davvero**: il proxy di Vite manda le chiamate al gestionale locale, che non usa mai PayPal vero. Senza credenziali sandbox nel gestionale locale il pagamento è simulato (bottone di prova e «Prova un pagamento rifiutato»); con `PAYPAL_SANDBOX_CLIENT_ID/SECRET` nel gestionale locale ci sono i bottoni veri della sandbox PayPal, con carte e conti di prova. Una striscia azzurra in cima dice quando è una prova. Dettagli e API: `docs/features/ORDINI_ONLINE.md` del gestionale.

## Tracciamento

Gli script sono in `index.html`.

| Servizio | ID | Note |
|----------|----|------|
| Google Ads | `AW-16532564533` | |
| Meta Pixel | `983687211094705` | `/mentorship` usa anche `751362634658136` |
| Microsoft Clarity | `umgujv253c` | Disattivato su localhost e reti locali |
| Heatmap interna | — | Click e scroll verso il gestionale (`POST /api/sito/eventi`). **Spenta** (`VITE_HEATMAP_ENABLED`) finché non ci sono backend e ok privacy. Codice in `components/tracking/`, specifiche in `docs/heatmap/SPEC.md` |

Con `?hm_view=1` dentro un iframe (anteprima della heatmap nel gestionale) Google Ads, Meta Pixel e Clarity non partono, così aprire una pagina di conferma non registra conversioni finte.

| Evento | Quando |
|--------|--------|
| Meta `PageView` | Solo al primo caricamento del sito, non ai cambi di route |
| Meta `Lead` | Apertura di `/conferma-richiesta` |
| Meta `Schedule` | Prenotazione dal calendario |
| Meta `Purchase` | Apertura di `/black-friday-2026/grazie` con la ricevuta di un pagamento vero (`value`, `currency` EUR, `eventID` `ordine-<numero>`), una volta sola per ordine anche ricaricando |
| Conversione Google Ads | `/black-friday-2026/grazie`, alle stesse condizioni di Meta `Purchase` (`transaction_id` `ordine-<numero>`): parte solo quando `CONVERSIONE_GOOGLE_ADS` in `ConfermaPagamentoBlackFriday.jsx` ha l'etichetta dell'azione «Acquisto» (oggi vuota) |
| Conversione Google Ads | `/conferma-richiesta`, solo per le landing in `CONVERSIONI_GOOGLE_ADS` |
| Conversione Google Ads | `/offerta-influencer-conferma` |

## Altri servizi

| Servizio | Uso | Dove |
|----------|-----|------|
| Cloudflare Stream | Video delle landing, per codice dal gestionale (anche `/cervicalgia`: `CERVICALGIA_VSL`). Si caricano e si sostituiscono in Marketing → Video sito, dove c'è anche tutto per integrarli | `condition-landing/heroVideo.js` |
| Cloudflare Stream | VSL con audio al tocco (HLS nativo, iframe su Chrome e Firefox da computer) | `condition-landing/VslPlayer.jsx` |
| Vimeo | Video di `/mal-di-schiena` | `mal-di-schiena-sections/VSLSection.jsx` |
| Wistia | Video di `/gravidanza` | `gravidanza-sections/VSLSection.jsx` |
| Stripe Payment Links | Pagamento di `/mal-di-schiena` | `mal-di-schiena-sections/OfferSection.jsx` |
| PayPal | Pagamento di `/black-friday-2026/pagamento`: carta, PayPal, 3 rate | `components/checkout/` |
| OpenFreeMap | Tile della mappa | `studi-map/mapStyle.js` |
| Iubenda | Privacy e cookie policy | Footer e form |
| WhatsApp | Contatto, numero +39 351 819 8457 | Footer, header, FAB, conferma |
| Google Fonts | Montserrat | `index.html`, `index.css` |
