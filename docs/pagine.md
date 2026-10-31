# Pagine

Mappa delle route definite in [src/App.jsx](../src/App.jsx). I percorsi dei file sono relativi a `src/pages/`.

## Sito

Tutte con `Layout`.

| Route | File (`sito-web/`) | Note |
|-------|--------------------|------|
| `/` | `Home` | Senza bottone WhatsApp |
| `/chi-siamo` | `ChiSiamo` | |
| `/la-nostra-storia` | `LaNostraStoria` | |
| `/testimonianze` | `Testimonianze` | |
| `/contatti` | `Contatti` | |
| `/faq` | `FAQ` | |
| `/blog` | `Blog` | |
| `/magazine` | `Magazine` | |
| `/risorse` | `Risorse` | |
| `/newsletter` | `Newsletter` | Mobilitas Insider |
| `/carta-fedelta` | `MobilitasCard` | |
| `/mobilitas-fitness` | `MobilitasFitness` | |
| `/mentorship` | `Mentorship` | Ha un Meta Pixel proprio |
| `/links` | `Links` | |
| `/lavora-con-noi` | `LavoraConNoi` | |
| `/lavora-con-noi/segretaria` | `posizioni/Segretaria` | |
| `/lavora-con-noi/video-maker` | `posizioni/VideoMaker` | |
| `/lavora-con-noi/nutrizionista` | `posizioni/Nutrizionista` | |
| `/lavora-con-noi/social-media-manager` | `posizioni/SocialMediaManager` | |
| `/influencer` | `posizioni/Influencer` | |
| `/partnership/gpadel` | `partnership/GPADEL` | |
| `/partnership/stampa-subalpina` | `partnership/StampaSubalpina` | |
| `/partnership/robogest` | `partnership/Robogest` | |
| `/partnership/edenred` | `partnership/Edenred` | |
| `/partnership/allianz` | `partnership/Allianz` | |
| `/supporto-app` | `SupportoApp` | App Mobilitas Academy |
| `/privacy-policy-applicazione` | `PrivacyPolicyApplicazione` | App Mobilitas Academy |
| `/login` | `../Login` | Finta, vedi [problemi noti](architettura.md#problemi-noti) |

## Landing della prima visita

Tutte con `Layout hideWhatsApp`, tranne `/osteopata-torino`. Dettagli in [landing.md](landing.md).

| Template | Route |
|----------|-------|
| Fatte a mano | `/cervicalgia`, `/osteopata-torino` |
| `PrimaVisitaLanding` | `/acufeni`, `/bruxismo`, `/cicatrici-cesareo`, `/cicatrici-seno`, `/ciclo-doloroso`, `/colon-irritabile`, `/dolori-mandibolari`, `/emicrania`, `/epicondilite`, `/epitrocleite`, `/ernia-del-disco`, `/fascite-plantare`, `/fibromialgia`, `/gonfiore-addominale`, `/lombalgia`, `/maldischiena`, `/menopausa`, `/pubalgia`, `/reflusso`, `/sciatalgia`, `/scoliosi`, `/sinusite-cronica`, `/stitichezza`, `/tendinite`, `/tunnel-carpale`, `/vertigini` |

`/maldischiena` e `/mal-di-schiena` sono due pagine diverse: la seconda è la vecchia landing a pagamento.

## Altre landing

| Route | File | Layout | Note |
|-------|------|--------|------|
| `/yt-postura` | `YtPostura` | Sì | Lista d'attesa YouTube, template `ConditionLanding` |
| `/yt-postura-v2` | `YtPosturaV2` | Sì | Nuova versione, richiesta in `yt-postura-v2/richiesta.js` |
| `/iter-selezione-osteopata` | `landing-pages/IterSelezioneOsteopata` | Sì | Video dal gestionale |
| `/offerta-yt` | `sito-web/OffertaYT` | Sì | Form su Zapier |
| `/offerta-influencer` | `sito-web/OffertaInfluencer` | Sì | |
| `/first-walk` | `landing-pages/FirstWalk` | No | |
| `/mal-di-schiena` | `landing-pages/MalDiSchiena` | No | Pagamento Stripe |
| `/gravidanza` | `landing-pages/Gravidanza` | No | Form su Zapier |
| `/cofanetto-natale` | `landing-pages/CofanettoNatale` | No | Stagionale |
| `/lm-gpadel-infortuni` | `landing-pages/LmGPadelInfortuni` | No | Lead magnet |
| `/lm-gpadel-sconto39-generico` | `landing-pages/LmGpadelSconto39` | No | |

## Conferme e redirect

| Route | Comportamento |
|-------|---------------|
| `/conferma-richiesta` | Conferma unica: `ThankYouRichiesta` |
| `/conferma` | Stessa pagina, l'URL resta per i link già in giro |
| `/cervicalgia/conferma` | Redirect a `/conferma-richiesta` |
| `/osteopata-torino-conferma` | Redirect a `/conferma-richiesta` |
| `/offerta-influencer-conferma` | Conferma propria, con conversione Google Ads |
| `/lm-gpadel-infortuni-grazie` | Conferma del lead magnet GPADEL |
| `*` | `NotFound` |
