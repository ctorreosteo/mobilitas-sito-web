# Architettura

Single page application React servita come file statici. Non c'è un backend in questo repository: i dati dinamici arrivano dal gestionale (`mobilitas-hq`), vedi [integrazioni.md](integrazioni.md).

## Stack

| Ambito | Tecnologia |
|--------|------------|
| UI | React 19, React Router 7 |
| Build | Vite 7 |
| Stili | CSS per pagina + Tailwind 4 |
| Animazioni | Framer Motion |
| Mappe | MapLibre GL + OpenFreeMap |
| Icone | lucide-react |
| Hosting | Firebase Hosting |

Il progetto è in JavaScript (niente TypeScript) e non ha test automatici né CI: il deploy è manuale.

## Struttura

```text
index.html            Meta di default, font, Google Ads, Clarity, Meta Pixel
src/
  main.jsx            Avvio di React
  App.jsx             Tutte le route
  index.css           Stili globali e classi colore
  pages/
    sito-web/         Pagine del sito (con posizioni/ e partnership/)
    landing-prima-visita/  Landing di campagna della prima visita a 49€
    landing-pages/    Altre landing e pagine di conferma
    yt-postura-v2/    Parti della landing /yt-postura-v2
  components/
    Layout, Header, Footer, Sidebar   Guscio del sito
    BookingPopup.jsx  Form di richiesta condiviso
    landing/          Template PrimaVisitaLanding e CTA
    condition-landing/  Template ConditionLanding, video, SEO
    prenota-visita/   Calendario nella pagina di conferma
    recensioni-tag/   Recensioni dal gestionale filtrate per dolore
    studi-map/        Mappa dei due studi
    home-sections/    Sezioni della home e kit di animazione
    site/             PageShell e blocchi delle pagine interne
    *-sections/       Sezioni delle singole landing
    ui/Dialog.jsx     Guscio comune dei popup
  data/               Contenuti condivisi (vedi sotto)
  styles/             mx.css e CSS delle pagine in pages/
  utils/phone.js      Divide il cellulare in prefisso e numero
public/               Immagini e media serviti così come sono
```

## Routing

Tutte le route sono in [src/App.jsx](../src/App.jsx) e sono importate staticamente, senza lazy loading: il bundle è unico. L'elenco è in [pagine.md](pagine.md).

`Layout` aggiunge header, footer e bottone WhatsApp. Accetta due prop:

- `hideWhatsApp`: niente bottone WhatsApp (home e landing con CTA proprie).
- `hideFooterCta`: niente CTA nel footer (pagine di conferma).

Le landing senza `Layout` hanno header e footer propri. Firebase riscrive ogni URL su `index.html`, quindi un indirizzo inesistente risponde 200 e mostra `NotFound`.

## Dati condivisi

| File | Contenuto |
|------|-----------|
| `data/studi.js` | Sedi, coordinate, link Google, totale recensioni mostrato |
| `data/dolori.js` | Per ogni landing: testi della conferma, tag e parole delle recensioni |
| `data/faqPrimaVisita.jsx` | FAQ comuni della prima visita |
| `data/fotoTrattamenti.js` | Foto disponibili e scelta senza ripetizioni per landing |
| `data/fuocoFoto.js` | Punto di interesse di ogni foto per il ritaglio |
| `data/recensioni.js` | Immagini delle recensioni |

## SEO

`index.html` contiene i meta di default. `useConditionSeo` imposta lato client title, meta, Open Graph e JSON-LD delle landing. Alcune altre pagine lo fanno con un proprio `useEffect`. Non c'è prerendering: l'HTML iniziale è lo stesso per tutti gli URL.

## Stili

Vedi [design-system.md](design-system.md).

## Problemi noti

Rilevati il 31/10/2026 leggendo il codice.

**Da sistemare per primi**

- **`/login` è finta.** Non chiama nessun servizio, stampa la password digitata in console, ha un'email precompilata nel sorgente ed è linkata dal menu.
- **In locale alcuni form scrivono in produzione.** `GpadelInfortuniPopup` e `OffertaInfluencer` usano direttamente `VITE_API_BASE` senza proxy; `OffertaYT` e il popup di `/gravidanza` chiamano Zapier. Il proxy di Vite protegge solo i form che usano `API_BASE` vuoto in sviluppo.
- **Ogni visita scarica i video di tutte le landing.** Almeno 18 pagine avviano il fetch del video a livello di modulo e `App.jsx` importa tutto staticamente: le richieste partono a ogni apertura del sito, su qualsiasi pagina.
- **Conversioni Google Ads solo per tre landing.** `CONVERSIONI_GOOGLE_ADS` copre `cervicalgia`, `osteopata-torino` e `offerta-yt`. Le altre landing mandano solo il `Lead` di Meta: va verificato se è voluto.

**Debito tecnico**

- **Lint.** `npm run lint` dà 301 errori: 205 vengono da `.vite/`, che è tracciata in Git e andrebbe esclusa, 95 da `src/`.
- **`tailwind.config.js` non viene caricato.** Manca `@config` in `index.css`, quindi le classi `from-blue-dark` e simili (15 usi) non generano CSS.
- **Peso.** `public/` occupa 298 MB e 14 file superano i 5 MB (175 MB in totale). Originali come `gpadel1.png`, `calcio.png` e `firma.png` non sono usati dal codice ma vengono pubblicati.
- **Bundle unico** da oltre 500 kB, senza code splitting.
- **Niente `robots.txt` né `sitemap.xml`.**
- **`API_BASE` duplicato** in nove file, con due fallback diversi (`hq.studiomobilitas.it` e l'URL Cloud Run).
- **`yt-postura-v2/richiesta.js`** è una copia della logica di `BookingPopup` per il contesto `yt-postura`: le modifiche vanno riportate a mano.
- **Il `Lead` di Meta riparte** a ogni apertura di `/conferma-richiesta`, ricarica compresa.
- **Variabili inutili.** `VITE_HQ_USERNAME` e `VITE_HQ_PASSWORD` sono nel `.env` locale ma il codice non le usa: si possono eliminare.

**Codice non raggiungibile**

- `pages/landing-pages/Emicrania.jsx`, tutta `components/emicrania-sections/` e `WhatsAppButtonEmicrania.jsx`: sostituiti dalla landing in `landing-prima-visita`.
- `pages/sito-web/partnership/Abylsen.jsx`: oscurata di proposito, la route è commentata in `App.jsx` e `firebase.json` esclude le sue immagini.
- `HealthAreasCarousel.jsx`, `SectionDivider.jsx`, `site/PageHero.jsx`.
