# Landing della prima visita

Pagine delle campagne Google e Meta per la prima visita scontata. Stanno in `src/pages/landing-prima-visita/`, una per problema.

## Regole sui testi

Valgono per le landing e per tutti i testi del sito.

**Mai nominare un farmaco o un integratore specifico**, né come principio attivo né come marchio: è una regola di compliance sulla pubblicità sanitaria. Si usano solo le categorie:

- FANS, antinfiammatori, antidolorifici
- cortisonici (non "cortisone")
- miorilassanti, antispastici, lassativi
- triptani, farmaci di profilassi
- integratori

Il testo della sezione `seo.faq` finisce nel JSON-LD: vanno controllati anche quelli.

## Come sono fatte

| Tipo | Pagine | Dove sta la struttura |
|------|--------|-----------------------|
| Fatte a mano | `Cervicalgia`, `OsteopataTorino` | Nel file della pagina |
| Solo contenuti | Tutte le altre 26 | `components/landing/PrimaVisitaLanding.jsx` |

`/black-friday-2026` (`pages/landing-pages/BlackFriday.jsx`) è fatta a mano: offerta per chi è già paziente, solo 10 visite a 450€ invece di 900€ da **pagare online**, scadenza 29/11/2026. Grafica propria (`styles/pages/black-friday-2026.css`, pezzi in `components/black-friday-2026-sections/`). È in `noindex`; tutti i bottoni chiamano `usePagaOnline` in cima al file, che porta alla pagina di pagamento `/black-friday-2026/pagamento` (`pages/landing-pages/CheckoutBlackFriday.jsx`, vedi [integrazioni.md](integrazioni.md#pagamento-online)). L'indirizzo provvisorio `/black-friday-2026-PX` rimanda qui.

`/black-friday-2026-amico` (`pages/landing-pages/PortaUnAmico.jsx`) è l'invito "porta un amico", rivolto all'**amico**: il paziente riceve per messaggio il suo link personale e lo inoltra. Formato del link: `/black-friday-2026-amico?code=K7P2M9QX4D`, con il codice personale del paziente. Segue la guida interna «Richieste API · Porta un amico»: la pagina legge `code` (maiuscolo, tenuto in sessionStorage e tolto dalla barra degli indirizzi), chiede al gestionale chi ha invitato (`GET /api/sito/invito/CODICE`, valido solo se `data.valido`) e mostra "Mario ti ha invitato", "Un nostro paziente ti ha invitato" (valido senza nome) o la pagina normale senza nome (codice assente, non valido o gestionale che non risponde). L'amico richiede la prima visita a 49€ con il form normale (`components/porta-un-amico/RichiestaInvito.jsx`): lead magnet `COUPON49`, tag `blackfriday` (nessuna fonte) e, solo con un invito valido, in fondo alla nota la riga «Porta un amico — invitato da Mario (codice K7P2M9QX4D)». Dopo l'invio va a `/conferma-richiesta` con il calendario della prima visita. Chi invita riceve una visita gratis per ogni amico, fino a 3 (`MAX_AMICI`). Sotto il QR del biglietto sulle scrivanie è stampato `studiomobilitas.it/amico`, che rimanda qui tenendo i parametri: il rimando in `App.jsx` va tenuto finché il biglietto è in giro. Anche questa è in `noindex`. Scadenza, prezzi, conto alla rovescia, SEO ed elenco dei problemi sono comuni alle due pagine: `components/black-friday/`.

`/yt-postura` è fatta a mano (`pages/YtPostura.jsx` e `pages/yt-postura/`). Il vecchio template `ConditionLanding` è stato tolto il 02/11/2026: di `components/condition-landing/` restano solo i pezzi che usa `PrimaVisitaLanding` (foto, video, riquadro media dell'apertura, SEO).

Una pagina "solo contenuti" è un oggetto `PAGE` passato al template:

```jsx
const heroVideo = prefetchHeroVideo('SCIATALGIA_VSL') // null se il video non c'è ancora

const PAGE = {
  slug: 'sciatalgia',
  heroVideo,
  // hero, pain, mechanism, reviews, visit, faq, images
  seo: {
    dataPage: 'sciatalgia',
    path: '/sciatalgia',
    ogImage: '/trattamenti/og/anca_flessa-supino_07_orizzontale.jpg',
    // title, description, keywords, condition, therapy, breadcrumbName, faq...
  },
}

export default function Sciatalgia() {
  return <PrimaVisitaLanding page={PAGE} />
}
```

Lo `slug` è la chiave che collega tutto: `pageContext` del popup, `dolori.js`, zona delle foto e classe CSS.

## Aggiungere una landing

1. **Pagina.** Copia una landing simile in `src/pages/landing-prima-visita/<Nome>.jsx` e sostituisci i contenuti.
2. **Route.** In `src/App.jsx` importala e aggiungi `<Route path="/<slug>" element={<Layout hideWhatsApp><Nome /></Layout>} />`.
3. **Popup.** In `src/components/BookingPopup.jsx` aggiungi lo slug a `isLandingVisita` e a `tagsByContext`. Senza il primo passaggio la pagina di conferma non mostra il calendario. Con lo slug `gravidanza` o `pediatria` il calendario mostra solo gli orari degli osteopati di quel percorso (`PERCORSI` in `PrenotaVisita.jsx`).
4. **Dolore.** In `src/data/dolori.js` aggiungi la chiave con `ilTuo`, `per`, `tags` e `parole`. Senza, conferma e recensioni restano generiche.
5. **Foto.** In `src/data/fotoTrattamenti.js` aggiungi lo slug a `ZONE`.
6. **Gestionale.** Verifica che esistano il video `<NOME>_VSL` e il tag `TAG_DOLORE_<NOME>`. Il video lo carica il marketing in Marketing → Video sito, che mostra anche codice, API e URL del player da usare. Se la VSL ha l'audio, aggiungi `videoAudio: true` al `PAGE`: vedi [Video](#video).
7. **Google Ads.** Se la campagna misura la conversione, aggiungi lo slug a `CONVERSIONI_GOOGLE_ADS` in `src/pages/landing-pages/ThankYouRichiesta.jsx`.
8. **Controllo.** Prova su telefono popup, conferma e calendario, poi ricontrolla la [regola sui farmaci](#regole-sui-testi).

## Offerta

| Dato | Valore | Dove |
|------|--------|------|
| Prezzo e durata | 49€, visita di 1h | `landing/VisitaCtas.jsx`, `PrimaVisitaLanding.jsx` |
| Prezzo pieno | 90€ | `prenota-visita/PrenotaVisita.jsx` |
| Posti al mese | 40 | `POSTI_MESE` in `PrimaVisitaLanding.jsx` |
| Totale recensioni | 1000 | `RECENSIONI_TOTALI` in `data/studi.js` |
| Studi | Via Peyron 54, Via Lamarmora 35 | `data/studi.js`, `useConditionSeo.js` |

Se cambia il prezzo, cercalo in tutto `src/`: compare anche nei testi delle singole pagine e nei dati SEO.

## Video

La VSL dell'apertura arriva dal gestionale per codice (`prefetchHeroVideo('<NOME>_VSL')`): il video si cambia dal gestionale senza toccare il sito. Caricamento: file su Cloudflare Stream, poi il responsabile del gestionale registra codice e UID nella tabella `video_sito_web`.

| Tipo | Pagine | Comportamento |
|------|--------|---------------|
| Muta | Le altre landing con video | Autoplay muto in loop, si comporta come una foto |
| Con audio (`videoAudio: true`) | `cervicalgia`, `bruxismo`, `maldischiena`, `sciatalgia` | Parte muta in loop, ben visibile, con la pillola «Tocca per ascoltare» in alto a sinistra; il tocco funziona su tutto il video e lo fa ripartire da capo con audio e controlli. Evento `vsl_audio_on` su Google e `VslAudioOn` su Meta |

I browser non permettono un autoplay con audio: per questo si parte sempre muti. Il player con audio è `condition-landing/VslPlayer.jsx`. `/cervicalgia` è fatta a mano e lo usa direttamente.

In locale il sito chiede i video al gestionale acceso sul Mac (`localhost:8080`). Il suo database parte vuoto: per vedere i video bisogna registrarli anche lì.

## Foto

- Nei config si scrive `/trattamenti/<nome senza estensione>`: `ClImg` lo trasforma nelle versioni `public/trattamenti/web/<nome>-900.jpg` e `-1600.jpg`.
- Le immagini Open Graph sono in `public/trattamenti/og/`, a 1200×630.
- `creaSceltaFoto(slug)` evita di ripetere la stessa serie nella stessa landing. I primi piani intraorali compaiono solo dove la zona è `atm`.
- Il ritaglio di ogni foto è in `data/fuocoFoto.js`.
- Gli originali ad alta risoluzione stanno in `Immagini - dolori/`, cartella locale esclusa da Git.

## Percorso dell'utente

Il flusso completo, con le chiamate al gestionale, è in [integrazioni.md](integrazioni.md#dalla-landing-alla-visita).
