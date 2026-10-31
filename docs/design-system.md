# Design system

## Colori

| Nome | Valore | Uso |
|------|--------|-----|
| Blu scuro | `#002552` | Colore aziendale, sfondi scuri, testo su chiaro |
| Verde | `#72fa93` | CTA e accenti su blu |
| Panna | `#F4F4F4` | Sfondi chiari, testo su blu |
| Rosso | `#FF6869` | Errori e avvisi |
| Azzurro | `#0ea5e9` | Accento secondario |

Lo stile `mx` aggiunge `--ink` `#000f2b`, `--navy-2` `#00346f` e `--sky` `#38bdf8`.

## Regole

- **Su blu:** testo panna, accenti verdi.
- **Su chiaro:** testo blu scuro. Mai verde su panna o bianco: non si legge.
- **CTA principale:** sfondo verde con testo blu scuro.
- **Testo secondario:** lo stesso colore con trasparenza, non un grigio.
- **Colori fuori palette:** da evitare.

## Font

Solo **Montserrat**, da Google Fonts, con pesi da 300 a 900.

## Stili: i due livelli

**`src/styles/mx.css`** è il linguaggio attuale, da usare per il lavoro nuovo. Vale per home e pagine interne, sotto `.mx-home` o `.mx-page` (aggiunta da `components/site/PageShell`). Definisce variabili proprie (`--navy`, `--green`, `--cream`, `--muted`, `--line`, `--ease`) e componenti come `.mx-btn`, `.mx-wrap`, `.mx-h`.

**`src/index.css`** è la base globale, usata soprattutto dalle pagine meno recenti. Definisce le variabili `--color-*` e `--font-primary`, oltre alle classi colore scritte a mano:

```css
.bg-blue-dark  .bg-green  .bg-cream  .bg-red  .bg-azure-dark
.text-blue-dark  .text-green  .text-cream  .text-red  .text-azure-dark
.border-blue-dark  .border-green  .border-cream  .border-red  .border-azure-dark
.font-montserrat  .gradient-text
```

Su mobile `index.css` forza la dimensione dei titoli con `!important`: per superarla le regole di `mx.css` stanno in `@layer base` con specificità più alta.

## Convenzioni CSS

- Il CSS di una pagina sta in `src/styles/pages/<pagina>.css` ed è importato dalla pagina o dal suo template.
- Le classi hanno il prefisso `mx-`, con uno specifico per ambito: `mx-cl-` per `ConditionLanding`, `mx-cerv-` per lo stile cervicalgia, `mx-pv__` per il calendario.
- Le utility standard di Tailwind funzionano. Quelle basate sui colori del brand no: `tailwind.config.js` non è caricato, quindi esistono solo le classi di `index.css`. Forme come `text-blue-dark/80` o `from-blue-dark` non generano CSS: in quei casi serve CSS proprio.

## Movimento

Curva standard `cubic-bezier(0.16, 1, 0.3, 1)`, in `--ease` e in `EASE` (`home-sections/homeMotion.js`). I componenti di animazione riutilizzabili sono in `home-sections/HomeKit.jsx`.
