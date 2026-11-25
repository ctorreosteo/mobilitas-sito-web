# Prototipo heatmap: prova in locale

Il prototipo riproduce la pagina **Marketing › Heatmap** del gestionale con un finto backend Node (nessuna dipendenza). Serve come riferimento di comportamento; le specifiche sono in `../SPEC.md`.

## Per chi lavora sul gestionale: vedere il prototipo con dati di esempio
Servono Node 20+ e il sito in locale, perché la mappa la disegna la pagina del sito.

1. Clona il sito e avvialo dal branch della heatmap:
   ```bash
   git clone https://github.com/ctorreosteo/mobilitas-sito-web.git && cd mobilitas-sito-web
   git checkout feature/heatmap
   npm install
   npm run dev            # http://localhost:5173
   ```
2. In un altro terminale, dalla stessa cartella, avvia il finto backend con i dati di esempio:
   ```bash
   HM_DATI=docs/heatmap/prototipo/eventi-esempio.jsonl node docs/heatmap/prototipo/finto-backend.mjs
   ```
   Occupa la porta 8080: il backend del gestionale in locale va spento durante la prova.
3. Apri `http://localhost:8080/`, scegli **90 g** come periodo (i dati di esempio sono del 25/11/2026), poi pagina, dispositivo e modalità.

Quando il sito con la modalità anteprima sarà online, al punto 1 basterà `SITO=https://www.studiomobilitas.it` davanti al comando del punto 2, senza avviare il sito in locale.

## Per chi lavora sul sito: generare dati propri
1. `node docs/heatmap/prototipo/finto-backend.mjs`: salva in `docs/heatmap/prototipo/eventi.jsonl`, ignorato da git.
2. `VITE_HEATMAP_ENABLED=true VITE_HEATMAP_LOCALE=true npm run dev`
3. Naviga il sito su `http://localhost:5173` (per il mobile: DevTools › modalità dispositivo), clicca, apri le FAQ, scorri. Gli eventi partono ogni ~10 secondi e quando cambi pagina o scheda.
4. Apri `http://localhost:8080/`.

Con il finto backend acceso, form, calendario e video del sito in locale rispondono 404: è normale.
