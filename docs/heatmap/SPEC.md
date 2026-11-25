# Heatmap interna — specifiche per il gestionale

Destinatari: responsabile del gestionale (`mobilitas-backend`, `mobilitas-frontend`).
Lato sito è già tutto pronto sul branch `feature/heatmap` di `mobilitas-sito-web`; il tracker è **spento** finché backend e ok privacy non ci sono.

Cartella:
- `SPEC.md`: questo documento
- `V622__heatmap_sito.sql`: bozza della migration (da rinumerare se nel frattempo escono altre migration)
- `TEST.md`: checklist di accettazione
- `prototipo/`: un finto backend Node e un prototipo della pagina "Marketing › Heatmap", funzionanti in locale. Le aggregazioni in `finto-backend.mjs` sono l'**implementazione di riferimento** degli endpoint admin.

---

## 1. Flusso
```
Sito (tracker) ──POST /api/sito/eventi (text/plain, sendBeacon)──▶ backend ──▶ heatmap_eventi
                                                                          └─ job notturni ─▶ heatmap_click_giorno / heatmap_scroll_giorno
Gestionale › Marketing › Heatmap ──GET /api/heatmap/*──▶ backend
        └─ iframe https://www.studiomobilitas.it/<pagina>?hm_view=1 ◀─postMessage(dati)─┘
           (la mappa la disegna il sito dentro la propria pagina)
```

La pagina del gestionale **non disegna la heatmap**. Carica la landing in un iframe con `?hm_view=1` e le manda i punti aggregati via `postMessage`. Il sito li posiziona sugli elementi reali e li disegna. Così la mappa resta allineata anche con FAQ aperte, colonne sticky e layout diversi tra mobile e desktop. Il gestionale deve solo fare filtri, KPI, tabella e passaggio dei dati (vedi §5).

## 2. Endpoint pubblico `POST /api/sito/eventi`

### Richiesta
- `Content-Type: text/plain;charset=UTF-8`. Il body è JSON: `sendBeacon` lo invia così per evitare il preflight CORS. **Il JSON va letto dal body come stringa** (`@RequestBody String`), perché `@RequestBody Dto` con `text/plain` fallisce.
- Body massimo 16 KB, al massimo 50 eventi.

```json
{
  "v": 1,
  "sessione": "61bb954c-6caf-43c7-8015-b8ceed0678a9",
  "pv": "1d5f18b7",
  "pagina": "/black-friday-2026",
  "dispositivo": "desktop",
  "viewport_w": 1440,
  "viewport_h": 900,
  "doc_h": 5234,
  "versione": "2026-11-25-82d3c6d",
  "eventi": [
    { "t": "click", "ts": 1764087382040, "x_pct": 41.9, "y_px": 2159,
      "sel": "#root > div > main > div > section:nth-of-type(1) > … > p > a",
      "el_x_pct": 50, "el_y_pct": 62.2, "label": "351 819 8457" },
    { "t": "click", "ts": 1764087390000, "x_pct": 90.1, "y_px": 812,
      "sel": "#root > div > div:nth-of-type(3) > button", "el_x_pct": 40, "el_y_pct": 55,
      "label": "Rispondi su WhatsApp", "fisso": true },
    { "t": "scroll", "ts": 1764087420000, "max_pct": 72, "durata_ms": 41000 }
  ]
}
```

| Campo | Regola | Note |
|---|---|---|
| `v` | `= 1` | versione del formato |
| `sessione` | UUID | casuale, in `sessionStorage`, nessun cookie |
| `pv` | stringa ≤ 16 | id della singola visita di pagina |
| `pagina` | `^/[a-z0-9\-/]*$`, ≤ 255 | solo il percorso, mai la query string |
| `dispositivo` | `mobile` \| `tablet` \| `desktop` | <640, 640–1023, ≥1024 px |
| `viewport_w` | 200–8000 | |
| `viewport_h` | 200–8000 | altezza dello schermo: serve a disegnare la "fine del primo schermo" |
| `doc_h` | 0–200000 | altezza pagina al momento dell'invio |
| `versione` | stringa ≤ 40 | data di build + commit; cambia a ogni deploy del sito |
| click `x_pct` | 0–100, obbligatorio | % della larghezza |
| click `y_px` | 0–200000, obbligatorio | px dall'inizio pagina |
| click `sel` | ≤ 500, opzionale | selettore CSS dell'elemento cliccato |
| click `el_x_pct`, `el_y_pct` | 0–100, opzionali | posizione dentro l'elemento |
| click `label` | ≤ 80, opzionale | testo di bottoni e link, mai il contenuto dei campi |
| click `fisso` | boolean, opzionale | click su header, barra CTA, WhatsApp o popup: va solo nella classifica, non sulla mappa |
| scroll `max_pct` | 0–100 | profondità massima raggiunta |
| scroll `durata_ms` | 0–86 400 000 | tempo con la scheda visibile |

### Comportamento
- **Risposta sempre `204`**, anche quando la validazione fallisce: si scartano gli eventi non validi (o tutto il pacchetto, se è il contesto a non essere valido). `avvenuto_il` è l'ora del server, non `ts` del browser.
- **Per la stessa visita possono arrivare più eventi `scroll`** (scheda nascosta, poi uscita). Si salvano tutti; nelle aggregazioni conta il **massimo per (`sessione`, `pv`)**.
- **Sicurezza**:
  - aggiungere `/api/sito/eventi` ai `permitAll` di `SecurityConfig.java`;
  - CORS solo sui domini del sito. Le beacon partono comunque, ma conviene restare coerenti con gli altri `/api/sito/**`;
  - rate limit con `MailingRateLimiter`, es. `consenti("heatmap", ip, 60)` al minuto (IP da `X-Forwarded-For` come in `MailingPubblicoController.ip`). **L'IP non si salva**;
  - escludere la route dall'audit in `ApiActivityAuditSupport.shouldSkipPath`: l'endpoint è ad alto volume.
- **Spegnimento**: flag `config` `HEATMAP_RACCOLTA_ENABLED`. Se è spento, risponde `204` e non salva niente.

## 3. Database
Vedi `V622__heatmap_sito.sql`. In sintesi:
- `heatmap_eventi`: dati grezzi, 90 giorni.
- `heatmap_click_giorno`: click aggregati per giorno, pagina, dispositivo, versione e posizione, 24 mesi.
- `heatmap_scroll_giorno`: visite per fascia di scroll (0, 10 … 100), 24 mesi.
- `heatmap_visite_giorno`: visite, tempo totale e scroll totale per giorno; servono le KPI dei periodi vecchi.

Prod gira con `ddl-auto=validate`: le entity devono coincidere con la migration. Ricordarsi `DATABASE_DOCUMENTATION.md` (`CONVENTIONS.md`).

Stima di volume: 10–30 righe per visita; a 1.000 visite al giorno sono circa 2,7 milioni di righe nei 90 giorni.

## 4. Endpoint admin
Autenticati, ruoli marketing + ADMIN (stesso modello di Video sito, `VideoSitoWebAccessService`). Risposta `{ success, data, message }`.
Parametri comuni: `dal`, `al` (`YYYY-MM-DD`, inclusivi, giorni in Europe/Rome), `dispositivo`, `versione` (opzionale).
Fino a 90 giorni fa si legge da `heatmap_eventi`; per i giorni più vecchi dagli aggregati. Per un periodo a cavallo si sommano le due parti.

### `GET /api/heatmap/pagine?dal&al`
Tutte le pagine del sito con dati nel periodo, su qualunque dispositivo. Le schede del dispositivo mostrano il conteggio accanto al nome.
```json
[{ "pagina": "/black-friday-2026", "visite": 16, "click": 41,
   "per_dispositivo": { "mobile": { "visite": 8, "click": 19 }, "tablet": { "visite": 0, "click": 0 }, "desktop": { "visite": 8, "click": 22 } },
   "versioni": ["2026-11-25-82d3c6d"] }]
```
Ordinate per visite, poi per click. Una visita è una coppia distinta (`sessione`, `pv`) con almeno un evento scroll.

### `GET /api/heatmap/click?pagina&dal&al&dispositivo[&versione]`
```json
{
  "visite": 5, "click": 12, "sessioni": 5, "visite_con_click": 4,
  "altezza_tipica": 5234, "schermo_tipico": 844,
  "versioni": ["2026-11-25-82d3c6d"],
  "punti": [
    { "sel": "#root > … > a", "ex": 50, "ey": 60, "x": 41.9, "y": 2159, "n": 3, "etichetta": "351 819 8457" },
    { "sel": null, "x": 42, "y": 2160, "n": 1 },
    { "sel": "#root > … > button", "ex": 40, "ey": 55, "x": 90.1, "y": 812, "n": 2, "fisso": true }
  ],
  "elementi": [{ "sel": "#root > … > a", "etichetta": "351 819 8457", "n": 3, "fisso": false }]
}
```
Raggruppamento dei `punti`:
- con selettore: per (`sel`, `ex` = `el_x_pct` arrotondato al 5, `ey` = `el_y_pct` arrotondato al 5, `fisso`);
- senza selettore: per (`x` = `x_pct` arrotondato all'unità, `y` = `y_px` arrotondato a 20 px).

`x` e `y` nei gruppi con selettore sono quelli del primo click e servono solo come riserva. `etichetta` serve al tooltip. `elementi` contiene i primi 20 per numero di click.
- `sessioni`: sessioni distinte con almeno un click.
- `visite_con_click`: coppie (`sessione`, `pv`) distinte con almeno un click.
- `altezza_tipica` e `schermo_tipico`: mediana di `doc_h` e `viewport_h`.

### `GET /api/heatmap/scroll?pagina&dal&al&dispositivo[&versione]`
```json
{ "visite": 5, "scroll_medio": 88, "durata_media_ms": 34000,
  "fasce": [{ "fascia": 0, "pct": 100 }, { "fascia": 10, "pct": 100 }, …, { "fascia": 100, "pct": 40 }] }
```
`pct` = % di visite con scroll massimo ≥ fascia.

## 5. Pagina del gestionale "Marketing › Heatmap"
Va costruita come Video sito:
- `src/pages/HeatmapSito.tsx` e `src/services/heatmap-service.ts`;
- route `/marketing/heatmap` in `App.tsx`, più la voce nella `nameMap`;
- guard e helper dei ruoli;
- voce nel gruppo Marketing di `app-sidebar.tsx`.

Il prototipo funzionante, da usare come riferimento di comportamento (non di stile), è `prototipo/visualizzatore.html`.

Contenuto della pagina. Il prototipo li ha tutti, da copiare come comportamento; lo stile (minimale, una barra sola in alto, indicatori in riga) è un riferimento, adattabile ai componenti shadcn del gestionale:
1. **Filtri**, in una barra fissa in alto:
   - pagina, in un menu con **ricerca** (tasto `/`) e le visite del periodo;
   - periodi rapidi (Oggi / 7 / 30 / 90 giorni) più date dal/al;
   - schede iPhone / iPad / Mac (= mobile, tablet, desktop), ciascuna con le sue visite;
   - versione del sito, solo se nel periodo ce n'è più di una;
   - pulsante **Aggiorna** con l'ora dell'ultimo aggiornamento. I dati arrivano di continuo; la pagina li ricarica a richiesta senza ricaricare l'anteprima.
2. **Filtri nel link** (`#pagina=…&dal=…&al=…&d=…&modo=…`), così una vista si può mandare a un collega.
3. **KPI** con una spiegazione al passaggio del mouse:
   - visite;
   - click (e click per visita);
   - visite con almeno un click (%);
   - scroll medio;
   - quota che arriva in fondo (`fasce[100]`);
   - tempo medio.
4. **Avviso** se nel periodo ci sono più versioni del sito.
5. **Interruttore "Click / Scroll / Click + scroll"** e una **legenda** che cambia con la modalità:
   - scala dei colori dei click: pochi → tanti;
   - scala dello scroll: la vedono tutti → pochi;
   - linee tratteggiate al 75 / 50 / 25%;
   - linea a puntini della fine del primo schermo.
6. **Anteprima** dentro la forma del dispositivo, disegnata in CSS, senza loghi né marchi:
   - **iPhone**: Dynamic Island, barra di stato, tasti laterali;
   - **iPad**: cornice uniforme;
   - **Mac**: schermo con notch, finestra del browser con l'indirizzo della pagina, base in alluminio;
   - azioni sopra l'anteprima: zoom «adatta / dimensione reale», torna all'inizio, copia il link della vista, apri la pagina online;
   - iframe di `https://www.studiomobilitas.it<pagina>?hm_view=1`;
   - largo 390 / 820 / 1440 px secondo il dispositivo, con `transform: scale()` per farlo stare nella colonna;
   - indicatore di caricamento finché non arriva il primo `stato`.
7. **Chip di stato** sotto la legenda, dal messaggio `stato`: click sulla mappa, in sezioni chiuse, su elementi non presenti, su elementi fissi o popup.
8. **Pannello "Fin dove arrivano"**:
   - una barra verticale che rappresenta tutta la pagina, colorata secondo `fasce`;
   - le percentuali a inizio, 25%, 50%, 75% e fine;
   - un riquadro che segue la parte visibile nell'anteprima (messaggio `posizione`) e la frase "qui arriva il X% dei visitatori";
   - un clic sulla barra sposta l'anteprima (messaggio `vai`).
9. **Elementi più cliccati**:
   - etichetta, numero, % sul totale, barra proporzionale, tag "fisso/popup";
   - senza etichetta, il nome si ricava dall'ultimo tag del selettore (funzione `nomeElemento` nel prototipo):
     - elementi cliccabili, senza aggiunte: `a` → Link, `button` → Bottone, `input`/`select`/`textarea` → Campo del modulo, `summary` → Apertura FAQ;
     - tutto il resto con "· non cliccabile": `p`/`span`/`b` → Testo, `h1`–`h6` → Titolo, `img` → Immagine, `svg` → Icona, `li` → Voce di elenco, `section` → Sezione, `div` → Area della pagina. Sono spesso il segnale più utile: il visitatore si aspettava un link;
     - senza selettore → Punto della pagina;
   - il clic su una riga lo trova e lo evidenzia nella pagina (messaggio `evidenzia`);
   - se l'elemento non è visibile, un avviso breve.
10. **Aiuto** (icona ?): guida breve «Come si legge» e scorciatoie da tastiera: `1` `2` `3` modalità, `M` `T` `D` dispositivo, `/` cerca pagina, `R` aggiorna, `Z` zoom, `Esc` chiude.
11. **Stato vuoto** ("Nessun dato nel periodo scelto") e **stato di errore**.

Nella pagina del sito, durante l'anteprima, il passaggio del mouse mostra un tooltip: "N click qui · su «etichetta»" sopra una macchia, "Qui arriva il X% dei visitatori" in modalità scroll. Il tooltip lo disegna il sito: il gestionale non deve fare niente.

### Protocollo `postMessage` con il sito
| Direzione | `type` | Contenuto |
|---|---|---|
| sito → gestionale | `mobilitas-heatmap:pronto` | `{ pagina, larghezza }`: la pagina è caricata, si possono mandare i dati |
| gestionale → sito | `mobilitas-heatmap:dati` | `{ click: punti[], scroll: fasce[], schermo: schermo_tipico, opzioni: { modo: 'click' \| 'scroll' \| 'entrambi', raggio?, opacita? } }` |
| gestionale → sito | `mobilitas-heatmap:modo` | `{ modo }`: cambia la modalità senza rimandare i dati |
| gestionale → sito | `mobilitas-heatmap:evidenzia` | `{ sel }`: porta l'elemento al centro e lo evidenzia per qualche secondo |
| gestionale → sito | `mobilitas-heatmap:vai` | `{ pct }`: scorre l'anteprima a quella altezza della pagina (0–100) |
| gestionale → sito | `mobilitas-heatmap:ridisegna` | nessuno |
| sito → gestionale | `mobilitas-heatmap:stato` | `{ modo, disegnati, nascosti, nonTrovati, fissi, larghezza, altezza }`, dopo ogni disegno |
| sito → gestionale | `mobilitas-heatmap:posizione` | `{ inizio, fine, raggiungono }`: tratto visibile (% della pagina) e % di visitatori che ci arriva, a ogni scroll |
| sito → gestionale | `mobilitas-heatmap:evidenziato` | `{ sel, trovato }`: `false` se l'elemento ora non è visibile |

- Il gestionale deve inviare a `targetOrigin` = origine del sito e accettare i messaggi solo da `iframe.contentWindow` con quell'origine.
- Il sito accetta i dati solo da `https://hq.studiomobilitas.it`, `https://app.studiomobilitas.it` e `localhost`. Per altri domini (es. il frontend UAT) si aggiunge l'origine in `VITE_HEATMAP_VIEWER_ORIGINS` del sito e si fa un nuovo deploy: **va comunicato il dominio UAT**.
- `nascosti`: click su elementi che ora sono chiusi (FAQ). Se l'utente le apre nell'anteprima, la mappa si ridisegna da sola.
- `nonTrovati`: elementi che non esistono in questa versione o che si aprono solo dopo un'azione.

In modalità `hm_view` il sito:
- non registra niente;
- non carica Clarity, Meta Pixel e Google Ads, quindi aprire una pagina di conferma non fa partire conversioni finte;
- nasconde gli elementi fissi;
- blocca link e invio dei moduli.

L'iframe funziona perché `firebase.json` del sito non manda `X-Frame-Options`. Se in futuro si aggiunge una CSP, deve contenere `frame-ancestors https://hq.studiomobilitas.it`.

## 5-bis. Scarico dei dati
Pulsante **Scarica** nella barra in alto (tasto `E`), sempre per la pagina e il periodo scelti, **tutti i dispositivi insieme**. Il prototipo genera i file nel browser, ma nel gestionale vanno generati dal backend, che già crea Excel con Apache POI (es. `FinanceAccontiExportService`).

### Report Excel — `POST /api/heatmap/export.xlsx`
Body: `{ pagina, dal, al, dispositivo_anteprima, sezioni: [...], visibilita: [...] }`. Le sezioni e il «visto dal» li misura la pagina del sito nell'anteprima, quindi li manda il frontend; il backend non conosce il layout. Risposta: il file, con nome `heatmap_<pagina>_<dal>_<al>.xlsx`.

| Foglio | Contenuto |
|---|---|
| Riepilogo | Pagina, periodo, **periodo di confronto** (stessa durata, subito prima), versioni del sito, data dello scarico. Indicatori per Mobile / Tablet / Desktop, ciascuno con la colonna «rispetto a prima»: variazione % per conteggi e tempi, punti (pt) per le quote |
| Andamento | Giorno × dispositivo: visite, click, scroll medio, quota che arriva in fondo (endpoint `GET /api/heatmap/giorni`) |
| Elementi cliccati | Dispositivo, posizione, elemento, tipo (cliccabile / non cliccabile / fisso o popup), click, % dei click, visto dal % (solo per il dispositivo in anteprima), selettore |
| Scroll | Altezza della pagina 0–100% a passi di 10 × % di visitatori che ci arrivano, per dispositivo |
| Sezioni (dispositivo) | Titolo della sezione, posizione nella pagina, % di visitatori che la vede. Presente solo se l'anteprima ha misurato le sezioni |
| Come leggere | Definizioni di dispositivi, visita, scroll medio, arriva in fondo, visto dal, non cliccabile, fisso |

Intestazioni in grassetto con la prima riga bloccata, numeri come numeri (non testo), così si possono filtrare e mettere in grafico.

### Dati grezzi — `GET /api/heatmap/eventi.csv?pagina&dal&al`
Una riga per evento, su tutti i dispositivi. Il file va generato in streaming, con un limite di sicurezza (es. 500.000 righe e un avviso se viene superato), separatore `;`, virgola decimale, BOM UTF-8: si apre direttamente nell'Excel italiano.

Colonne: Data e ora · Giorno · Dispositivo · Tipo evento · Visita · Elemento · Etichetta · Tipo elemento · X (% larghezza) · Y (px dall'alto) · Scroll massimo (%) · Tempo sulla pagina (s) · Larghezza schermo (px) · Versione del sito · Selettore.

**Privacy:** nel CSV **non va l'id di sessione**, solo il codice della visita (`pv`), che basta a raggruppare gli eventi di una stessa apertura. Niente IP, niente altro.

### Endpoint di supporto (anche per la pagina)
- `GET /api/heatmap/giorni?pagina&dal&al` → `[{ giorno, dispositivo, visite, click, scroll_medio, in_fondo_pct }]`
- `GET /api/heatmap/eventi?pagina&dal&al` → stessi campi del CSV in JSON (riferimento: `finto-backend.mjs`)

Gli scarichi rispettano i ruoli della pagina (marketing + ADMIN). Conviene registrarli nell'audit, perché sono un'esportazione di dati.

## 6. Job
Sul modello di `PurgeAuditRetentionJob`: ShedLock e flag in `config`. Su Cloud Run con scale-to-zero vanno chiamati da Cloud Scheduler (`docs/reference/JOBS.md`).
- `HeatmapAggregazioneJob`, ogni notte alle 03:30 Europe/Rome:
  - aggrega il giorno precedente in `heatmap_click_giorno`, `heatmap_scroll_giorno` e `heatmap_visite_giorno`;
  - è idempotente: cancella e reinserisce il giorno.
  - Flag: `JOB_HEATMAP_AGGREGA_ENABLED`.
- `HeatmapRetentionJob`, ogni notte:
  - `DELETE FROM heatmap_eventi WHERE avvenuto_il < now() - interval '90 days'`;
  - aggregati più vecchi di 24 mesi.
  - Flag: `JOB_HEATMAP_RETENTION_ENABLED`.

## 7. Privacy (in sospeso)
- Il tracker non usa cookie, non salva l'IP e non legge il testo digitato.
- La sessione è un id casuale che sparisce alla chiusura della scheda.
- Rispetta `Global Privacy Control`.
- **Prima di accendere il tracker in produzione serve l'ok del referente privacy**, con:
  - la decisione su banner e consenso;
  - la nuova voce in `docs/privacy/02-registro-trattamenti.md`;
  - l'aggiornamento della cookie policy.

## 8. Ordine di rilascio
1. **Sito con il tracker spento** (deploy a cura di Riccardo, si può fare subito). Porta online la modalità anteprima `?hm_view=1`, che serve alla pagina del gestionale per mostrare le landing, e il blocco dei tracker esterni nell'anteprima. Per i visitatori non cambia niente.
2. Backend in UAT, poi in produzione (migration, endpoint, job), con la raccolta già accesa lato backend.
3. Frontend del gestionale (pagina Heatmap). Per provarla in UAT serve che il dominio UAT sia tra le origini ammesse del sito (`VITE_HEATMAP_VIEWER_ORIGINS`): comunicarlo a Riccardo.
4. Solo dopo l'ok privacy, il sito con `VITE_HEATMAP_ENABLED=true` (deploy a cura di Riccardo).

## 9. Cosa si vede e quando
- **Pagine**: compaiono nell'elenco tutte le pagine del sito (landing e non) che hanno ricevuto visite nel periodo. Una landing nuova compare da sola alla prima visita, senza configurazione.
- **Aggiornamento**: il tracker invia ogni ~10 secondi e all'uscita dalla pagina, quindi una visita è nel database dopo pochi secondi. La pagina del gestionale mostra i dati al momento del caricamento o del pulsante Aggiorna. Gli aggregati notturni servono solo per i periodi oltre i 90 giorni.
- **Anteprima**: è sempre la pagina online in quel momento.
