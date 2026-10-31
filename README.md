# Mobilitas Sito Web

Sito di Mobilitas, studio osteopatico di Torino, online su [studiomobilitas.it](https://www.studiomobilitas.it): pagine istituzionali e landing delle campagne. È una single page application React pubblicata su Firebase Hosting; i dati dinamici arrivano dal gestionale (`mobilitas-hq`).

## Documentazione

| Documento | Contenuto |
|-----------|-----------|
| [Architettura](docs/architettura.md) | Stack, struttura del codice, problemi noti |
| [Pagine](docs/pagine.md) | Mappa di tutte le route |
| [Landing](docs/landing.md) | Regole sui testi, come aggiungere una landing |
| [Integrazioni](docs/integrazioni.md) | API del gestionale, form, tracciamento, servizi esterni |
| [Design system](docs/design-system.md) | Colori, font, convenzioni CSS |

> **Regola sui testi:** mai nomi di farmaci o integratori specifici, solo categorie generiche. Vedi [Landing](docs/landing.md#regole-sui-testi).

## Avvio in locale

Serve Node.js: il repository non fissa una versione, la build è verificata con la 22.

```bash
npm install
cp .env.example .env
npm run dev
```

Il sito è su `http://localhost:5173`. Senza gestionale locale su `localhost:8080` non funzionano form, calendario e video delle landing; le recensioni funzionano se `VITE_API_BASE` è impostata.

**Attenzione:** alcuni form scrivono in produzione anche da locale, vedi i [problemi noti](docs/architettura.md#problemi-noti).

| Comando | Azione |
|---------|--------|
| `npm run dev` | Server di sviluppo |
| `npm run build` | Build in `dist/` |
| `npm run preview` | Serve la build |
| `npm run lint` | ESLint |
| `npm run deploy` | Build e pubblicazione |

## Variabili d'ambiente

Vanno in `.env`, escluso da Git. Sono lette durante la build.

| Variabile | Obbligatoria | Uso |
|-----------|--------------|-----|
| `VITE_API_BASE` | No | Indirizzo del gestionale. Se vuota: `https://hq.studiomobilitas.it` |
| `VITE_CLOUDFLARE_STREAM_CUSTOMER_CODE` | No | Video di `/cervicalgia` |

## Deploy

Il deploy è manuale, dalla cartella principale. La prima volta installa la Firebase CLI:

```bash
npm install -g firebase-tools
```

Poi pubblica:

```bash
./deploy.sh
```

Lo script compila il sito e lo pubblica sul progetto Firebase `mobilitas-sito-web`. Per l'accesso usa, in ordine, `GOOGLE_APPLICATION_CREDENTIALS`, la chiave `.secrets/firebase-deploy.json` (esclusa da Git) e infine il login della Firebase CLI.

Prima di pubblicare controlla `VITE_API_BASE` nel tuo `.env`: finisce nel bundle.
