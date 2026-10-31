# Landing della prima visita a 49€

Le landing delle campagne (Google e Meta) per la prima visita scontata, separate dalle pagine normali del sito.

- `Cervicalgia.jsx` e `OsteopataTorino.jsx`: pagine fatte a mano, sono il modello.
- Tutte le altre (Reflusso, Sciatalgia, ...): solo contenuti, la struttura è in `src/components/landing/PrimaVisitaLanding.jsx`.

In comune: popup di prenotazione (`BookingPopup`), bottoni e barra in basso (`components/landing/VisitaCtas`),
recensioni dal gestionale sul dolore (`components/recensioni-tag`), mappa dei due studi (`components/studi-map`)
e pagina di conferma con il calendario della prima visita. Il dolore di ogni landing (parole, tag delle recensioni,
testi della conferma) è in `src/data/dolori.js`, con la stessa chiave del `pageContext`/`slug` della pagina.

Regole sui testi e passi per aggiungere una landing: [docs/landing.md](../../../docs/landing.md).
