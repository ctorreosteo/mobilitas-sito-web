# Heatmap: checklist di accettazione

## A. Sito da solo, con il finto backend (si può fare già oggi)
Istruzioni in `prototipo/README.md`.
- [ ] Navigando `/black-friday-2026` e `/sciatalgia` arrivano eventi `click` e `scroll` per `desktop` e `mobile` (il terminale del finto backend stampa `+N eventi`).
- [ ] In `http://localhost:8080/` la pagina compare nell'elenco con visite e click.
- [ ] I punti cadono sui bottoni e link cliccati, sia in Mobile sia in Desktop.
- [ ] Aprendo una FAQ nell'anteprima, i punti che stanno sotto non si spostano; i click dentro una FAQ chiusa compaiono quando la si apre.
- [ ] I click su header, barra CTA mobile, WhatsApp e popup compaiono solo nella classifica, con il tag "fisso/popup".
- [ ] L'interruttore Click / Scroll / Click + scroll cambia la mappa senza ricaricare la pagina, e la legenda cambia con lui.
- [ ] In modalità Scroll la pagina si colora dal rosso (in alto) al blu, con le linee al 75 / 50 / 25% e la linea della fine del primo schermo.
- [ ] Al passaggio del mouse su una macchia compare "N click qui · su «etichetta»"; in modalità Scroll compare "Qui arriva il X% dei visitatori".
- [ ] Scorrendo l'anteprima, il riquadro del pannello "Fin dove arrivano" la segue; un clic sulla barra sposta l'anteprima.
- [ ] Un clic su una riga di "Elementi più cliccati" porta l'elemento al centro e lo evidenzia; per un elemento fisso o in una sezione chiusa compare un avviso.
- [ ] Il link della pagina conserva i filtri: aprendolo in un'altra scheda si vede la stessa vista.
- [ ] **Scarica › Report Excel** produce un .xlsx che si apre in Excel e in Numbers, con i fogli Riepilogo, Andamento, Elementi cliccati, Scroll, Sezioni e Come leggere, e il confronto con il periodo precedente della stessa durata.
- [ ] **Scarica › Dati grezzi** produce un CSV che si apre nell'Excel italiano con colonne separate e numeri con la virgola, una riga per evento, senza id di sessione.
- [ ] Nell'anteprima (`?hm_view=1`) Clarity, Meta Pixel e Google Ads non partono: in DevTools › Network non ci sono richieste a `clarity.ms`, `facebook.com/tr` o `googleadservices`.
- [ ] Nei dati (`eventi.jsonl`) non compaiono query string, `code=`, email, telefoni dei pazienti o testi dei campi.
- [ ] Con il finto backend spento il sito funziona identico e la console non mostra errori.
- [ ] Con `VITE_HEATMAP_ENABLED=false` (il default) non parte nessuna chiamata a `/api/sito/eventi`.

## B. Backend vero in locale o UAT
- [ ] `POST /api/sito/eventi` con `Content-Type: text/plain` risponde `204` e salva le righe in `heatmap_eventi`.
- [ ] Con un pacchetto non valido (pagina con `?`, 51 eventi, body > 16 KB, JSON rotto) risponde `204` senza salvare.
- [ ] Il rate limit oltre 60 richieste al minuto dallo stesso IP scarta in silenzio.
- [ ] Con `HEATMAP_RACCOLTA_ENABLED=FALSE` non salva.
- [ ] L'endpoint non compare nei log di audit.
- [ ] `GET /api/heatmap/pagine|click|scroll` restituiscono gli stessi numeri del finto backend sugli stessi dati: si può importare `eventi.jsonl` per confrontare.
- [ ] Gli endpoint admin rispondono `403` a un utente senza ruolo marketing.
- [ ] Il job di aggregazione, lanciato due volte sullo stesso giorno, non duplica i conteggi.
- [ ] Il job di retention cancella i grezzi oltre 90 giorni.
- [ ] Un periodo che inizia oltre i 90 giorni fa restituisce dati coerenti, presi dagli aggregati.

## C. Pagina del gestionale
- [ ] La pagina Marketing › Heatmap è visibile solo ai ruoli previsti.
- [ ] Cambiando pagina, date o dispositivo la mappa si aggiorna.
- [ ] Con più versioni nel periodo compare l'avviso.
- [ ] La riga di stato mostra disegnati, nascosti, non trovati e fissi.
- [ ] La pagina riproduce tutte le funzioni del prototipo (SPEC §5, punti 1–11).
- [ ] Il pulsante Aggiorna ricarica i dati senza ricaricare l'anteprima e mostra l'ora dell'aggiornamento.
- [ ] L'origine del gestionale UAT è aggiunta a `VITE_HEATMAP_VIEWER_ORIGINS` del sito, altrimenti la mappa resta vuota.

## D. Produzione (dopo l'ok privacy)
- [ ] Il deploy del sito usa `VITE_API_BASE=<host Cloud Run>` (verificato nel bundle live) e `VITE_HEATMAP_ENABLED=true`.
- [ ] Entro 24 ore `/black-friday-2026`, o la landing attiva in quel momento, compare con visite dello stesso ordine di grandezza di Clarity.
- [ ] Nelle prime 48 ore non ci sono errori 4xx/5xx anomali su Cloud Run e il volume delle righe è in linea con la stima (10–30 per visita).
- [ ] Lighthouse prima/dopo non mostra peggioramenti apprezzabili.
