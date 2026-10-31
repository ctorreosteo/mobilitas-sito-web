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

`ConditionLanding` è il template più vecchio e oggi lo usa solo `/yt-postura`. Condivide con `PrimaVisitaLanding` il formato del config e i pezzi in `components/condition-landing/`.

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
3. **Popup.** In `src/components/BookingPopup.jsx` aggiungi lo slug a `isLandingVisita` e a `tagsByContext`. Senza il primo passaggio la pagina di conferma non mostra il calendario.
4. **Dolore.** In `src/data/dolori.js` aggiungi la chiave con `ilTuo`, `per`, `tags` e `parole`. Senza, conferma e recensioni restano generiche.
5. **Foto.** In `src/data/fotoTrattamenti.js` aggiungi lo slug a `ZONE`.
6. **Gestionale.** Verifica che esistano il video `<NOME>_VSL` e il tag `TAG_DOLORE_<NOME>`.
7. **Google Ads.** Se la campagna misura la conversione, aggiungi lo slug a `CONVERSIONI_GOOGLE_ADS` in `src/pages/landing-pages/ThankYouRichiesta.jsx`.
8. **Controllo.** Prova su telefono popup, conferma e calendario, poi ricontrolla la [regola sui farmaci](#regole-sui-testi).

## Offerta

| Dato | Valore | Dove |
|------|--------|------|
| Prezzo e durata | 49€, visita di 1h | `condition-landing/defaults.jsx` |
| Prezzo pieno | 90€ | `prenota-visita/PrenotaVisita.jsx` |
| Posti al mese | 40 | `defaults.jsx`, `POSTI_MESE` in `PrimaVisitaLanding.jsx` |
| Totale recensioni | 1000 | `RECENSIONI_TOTALI` in `data/studi.js` |
| Studi | Via Peyron 54, Via Lamarmora 35 | `data/studi.js`, `defaults.jsx`, `useConditionSeo.js` |

Se cambia il prezzo, cercalo in tutto `src/`: compare anche nei testi delle singole pagine e nei dati SEO.

## Foto

- Nei config si scrive `/trattamenti/<nome senza estensione>`: `ClImg` lo trasforma nelle versioni `public/trattamenti/web/<nome>-900.jpg` e `-1600.jpg`.
- Le immagini Open Graph sono in `public/trattamenti/og/`, a 1200×630.
- `creaSceltaFoto(slug)` evita di ripetere la stessa serie nella stessa landing. I primi piani intraorali compaiono solo dove la zona è `atm`.
- Il ritaglio di ogni foto è in `data/fuocoFoto.js`.
- Gli originali ad alta risoluzione stanno in `Immagini - dolori/`, cartella locale esclusa da Git.

## Percorso dell'utente

Il flusso completo, con le chiamate al gestionale, è in [integrazioni.md](integrazioni.md#dalla-landing-alla-visita).
