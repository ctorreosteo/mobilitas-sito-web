# Prototipo heatmap: prova in locale senza il gestionale

Servono solo Node e il sito in dev. Il gestionale locale va **spento**, perché il finto backend usa la stessa porta 8080.

1. Avvia il finto backend:
   ```bash
   node docs/heatmap/prototipo/finto-backend.mjs
   ```
   I dati si salvano in `docs/heatmap/prototipo/eventi.jsonl` (ignorato da git). Si può cambiare file con `HM_DATI=/percorso/eventi.jsonl`.

2. In un altro terminale, avvia il sito con il tracker acceso anche in locale:
   ```bash
   VITE_HEATMAP_ENABLED=true VITE_HEATMAP_LOCALE=true npm run dev
   ```
   Con il finto backend acceso, form, calendario e video in locale rispondono 404: è normale.

3. Naviga il sito su `http://localhost:5173` (per il mobile usa DevTools › modalità dispositivo), clicca, apri le FAQ, scorri. Gli eventi partono ogni ~10 secondi e quando cambi pagina o scheda.

4. Apri il visualizzatore su `http://localhost:8080/`, scegli pagina, date e dispositivo.

Il visualizzatore riproduce il comportamento atteso della pagina "Marketing › Heatmap" del gestionale (SPEC §5). Lo stile non è quello del gestionale.
