# Mobilitas Sito Web

Sito web per Mobilitas con landing pages e sezioni informative.

## Variabili d'ambiente

In **locale**: copia `.env.example` in `.env` e compila i valori.

| Variabile | Obbligatoria | Uso |
|-----------|--------------|-----|
| `VITE_CLOUDFLARE_STREAM_CUSTOMER_CODE` | No | Video Stream |

L'API richieste (popup prenotazione/consulto) è pubblica e non richiede credenziali.

## Deploy manuale

Il comando compila il progetto e pubblica `dist/` su Firebase Hosting nel
progetto `mobilitas-sito-web`:

```bash
npm run deploy
```

Lo script usa il login di Firebase CLI. Per un deploy senza login interattivo,
salva invece la chiave del service account in
`.secrets/firebase-deploy.json`; la cartella è esclusa da Git.

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
