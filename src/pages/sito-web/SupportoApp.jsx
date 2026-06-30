import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SupportoApp = () => {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Supporto App Mobilitas Academy | Mobilitas'

    const ensureMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    const description =
      "Pagina di supporto dell'app Mobilitas Academy: contatti, FAQ, privacy, eliminazione account e requisiti di sistema."
    const pageUrl = `${window.location.origin}/supporto-app`

    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureCanonical(pageUrl)

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <article className="max-w-4xl mx-auto font-montserrat text-blue-dark/90 leading-relaxed space-y-6">
          <header className="space-y-3 border-b border-blue-dark/10 pb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-dark">
              Supporto - Mobilitas Academy
            </h1>
            <p>
              Benvenuto nella pagina di supporto di <strong>Mobilitas Academy</strong>,
              l&apos;applicazione ufficiale di OsteoTouch S.r.l. - Mobilitas, dedicata a pazienti,
              allievi e professionisti dei nostri studi osteopatici di Torino.
            </p>
            <p>
              In questa pagina trovi i nostri canali di contatto, le risposte alle domande più
              frequenti e le indicazioni per gestire al meglio la tua esperienza con l&apos;App.
            </p>
          </header>

          <section className="space-y-4 rounded-lg border border-red-700/20 bg-red-50/70 p-5">
            <h2 className="text-2xl font-bold text-red-800">Avviso importante prima di tutto</h2>
            <p>
              <strong>L&apos;App Mobilitas Academy non è uno strumento di emergenza medica.</strong>
            </p>
            <p>
              Se stai vivendo un&apos;emergenza sanitaria, <strong>non utilizzare l&apos;App</strong>:
              contatta immediatamente il numero unico di emergenza <strong>112</strong> o recati al
              Pronto Soccorso più vicino.
            </p>
            <p>
              L&apos;App è uno strumento di supporto per la gestione delle visite e l&apos;accesso ai
              contenuti formativi, ma <strong>non sostituisce in alcun modo il consulto con un
              professionista sanitario</strong>. Qualsiasi sintomo, dubbio clinico o necessità
              terapeutica deve essere sempre valutato di persona da un osteopata o da un medico
              abilitato.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Come contattarci</h2>
            <p>
              Per offrirti la risposta più rapida, ti chiediamo di scegliere il canale corretto in
              base al tipo di richiesta.
            </p>

            <div className="space-y-5">
              <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2">
                <h3 className="text-xl font-semibold text-blue-dark">Supporto tecnico sull&apos;App</h3>
                <p>
                  Per problemi di accesso, malfunzionamenti, errori, notifiche, recupero password.
                </p>
                <p>
                  <strong>Email:</strong> studio@studiomobilitas.it
                </p>
                <p>
                  <strong>Orari risposta:</strong> lunedì-venerdì, 9:00-18:00
                </p>
                <p>
                  <strong>Tempi medi di risposta:</strong> entro 2 giorni lavorativi
                </p>
              </div>

              <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2">
                <h3 className="text-xl font-semibold text-blue-dark">
                  Prenotazioni, modifiche e informazioni cliniche
                </h3>
                <p>
                  Per prenotare una visita, modificare un appuntamento, richiedere informazioni sulle
                  prestazioni osteopatiche o sui percorsi.
                </p>
                <p>
                  <strong>Email:</strong> studio@studiomobilitas.it
                </p>
                <p>
                  <strong>Telefono:</strong> +39 3518198457
                </p>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a
                    href="https://wa.me/393518198457"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azure-dark underline underline-offset-2"
                  >
                    +39 3518198457
                  </a>
                </p>
              </div>

              <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-3">
                <h3 className="text-xl font-semibold text-blue-dark">Studi Mobilitas</h3>
                <div>
                  <p className="font-semibold">Studio Mobilitas Via Peyron</p>
                  <p>Via Peyron 54 - 10143 Torino (TO)</p>
                  <p>
                    Tel.: +39 3518198457
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Studio Mobilitas Via Lamarmora</p>
                  <p>Via Lamarmora 35 - 10128 Torino (TO)</p>
                  <p>
                    Tel.: +39 3518198457
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2">
                <h3 className="text-xl font-semibold text-blue-dark">
                  Questioni amministrative, fatturazione e privacy
                </h3>
                <p>
                  Per richieste relative a fatture, pagamenti, trattamento dei dati personali,
                  esercizio dei diritti previsti dal GDPR.
                </p>
                <p>
                  <strong>Email privacy:</strong> studio@studiomobilitas.it
                </p>
                <p>
                  <strong>PEC:</strong> osteotouch@pec.it
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Cosa puoi fare con Mobilitas Academy</h2>
            <p>L&apos;App ti permette di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Consultare lo storico delle tue visite osteopatiche</strong> presso gli studi
                Mobilitas
              </li>
              <li>
                <strong>Visualizzare i percorsi e i servizi acquistati</strong> e il loro stato di
                utilizzo
              </li>
              <li>
                <strong>Accedere ai contenuti formativi</strong> dedicati alla salute, al movimento e
                alla prevenzione
              </li>
              <li>
                <strong>Prenotare e gestire sessioni fitness</strong> disponibili presso le nostre sedi
              </li>
              <li>
                <strong>Ricevere reminder e comunicazioni di servizio</strong> relative ai tuoi
                appuntamenti
              </li>
            </ul>
            <p>
              Se hai un ruolo professionale presso Mobilitas (osteopata, amministrativo), l&apos;App
              ti offre inoltre strumenti dedicati alla gestione dei pazienti e dell&apos;attività
              clinica.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Domande frequenti</h2>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">Account e accesso</h3>
            <div className="space-y-3">
              <p>
                <strong>Come creo un account?</strong>
                <br />
                Per accedere all&apos;App come paziente, è necessario essere già registrato presso uno
                dei nostri studi. Al momento della tua prima visita ti forniremo le credenziali di
                accesso. Se non le hai ricevute, contatta il supporto tecnico.
              </p>
              <p>
                <strong>Ho dimenticato la password. Come la recupero?</strong>
                <br />
                Dalla schermata di login, tocca &quot;Hai dimenticato la password?&quot; e segui la
                procedura. Riceverai un&apos;email con le istruzioni per impostare una nuova password.
              </p>
              <p>
                <strong>Non ricevo l&apos;email di recupero password. Cosa posso fare?</strong>
                <br />
                Controlla la cartella spam/posta indesiderata. Se non trovi l&apos;email, verifica che
                l&apos;indirizzo registrato sia quello corretto contattando il supporto tecnico.
              </p>
              <p>
                <strong>Posso modificare la mia email o il mio numero di telefono?</strong>
                <br />
                Sì. Accedi alla sezione &quot;Profilo&quot; dell&apos;App per aggiornare i tuoi dati di
                contatto, oppure scrivici a studio@studiomobilitas.it.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">Visite e prenotazioni</h3>
            <div className="space-y-3">
              <p>
                <strong>Come prenoto una visita osteopatica?</strong>
                <br />
                Dall&apos;App è possibile prenotare autonomamente una visita. In alternativa, puoi
                anche contattarci ai numeri indicati sopra o chiedere informazioni alla reception
                durante una visita. L&apos;App ti permette inoltre di consultare la cronologia delle
                visite e i percorsi attivi.
              </p>
              <p>
                <strong>Come modifico o annullo una visita prenotata?</strong>
                <br />
                Per modifiche o annullamenti, contatta direttamente lo studio presso cui hai
                prenotato. Ti chiediamo cortesemente di comunicare l&apos;annullamento con almeno 24
                ore di anticipo.
              </p>
              <p>
                <strong>Posso prenotare visite per i miei figli?</strong>
                <br />
                Sì. Le visite osteopatiche pediatriche vengono prenotate dal genitore o esercente la
                responsabilità genitoriale per conto del minore. I dati clinici del minore sono
                trattati in una cartella autonoma intestata al bambino.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">Notifiche</h3>
            <div className="space-y-3">
              <p>
                <strong>Non ricevo le notifiche push (reminder visite, conferme).</strong>
                <br />
                Verifica che le notifiche siano attivate nelle impostazioni del tuo dispositivo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>iPhone:</strong> Impostazioni - Notifiche - Mobilitas Academy - Consenti
                  notifiche
                </li>
                <li>
                  <strong>Android:</strong> Impostazioni - App - Mobilitas Academy - Notifiche
                </li>
              </ul>
              <p>
                <strong>Come disattivo le notifiche?</strong>
                <br />
                Dalle stesse impostazioni del sistema operativo indicate sopra. Disattivare le
                notifiche non pregiudica le altre funzionalità dell&apos;App, ma non riceverai più
                reminder degli appuntamenti.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">Contenuti e corsi</h3>
            <div className="space-y-3">
              <p>
                <strong>Non riesco a riprodurre i video formativi.</strong>
                <br />
                Verifica di avere una connessione internet stabile (preferibilmente Wi-Fi). Se il
                problema persiste, prova a chiudere e riaprire l&apos;App. Se non si risolve, contatta
                il supporto tecnico indicando il titolo del corso e il dispositivo che stai
                utilizzando.
              </p>
              <p>
                <strong>Posso scaricare i contenuti per vederli offline?</strong>
                <br />
                Al momento la fruizione dei contenuti video richiede una connessione internet attiva.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">Problemi tecnici</h3>
            <div className="space-y-3">
              <p>
                <strong>L&apos;App si chiude in modo imprevisto.</strong>
              </p>
              <p>Prova a:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Chiudere completamente l&apos;App e riaprirla</li>
                <li>Verificare di avere installato l&apos;ultima versione disponibile sull&apos;App Store</li>
                <li>Riavviare il dispositivo</li>
                <li>
                  Se il problema persiste, disinstalla e reinstalla l&apos;App (i tuoi dati restano
                  salvati sul server)
                </li>
              </ol>
              <p>
                Se nulla risolve, contattaci a studio@studiomobilitas.it indicando: modello del
                dispositivo, sistema operativo, versione dell&apos;App e una breve descrizione del
                problema.
              </p>
              <p>
                <strong>L&apos;App non si aggiorna.</strong>
                <br />
                Vai sull&apos;App Store, cerca &quot;Mobilitas Academy&quot; e tocca
                &quot;Aggiorna&quot;. Se non vedi l&apos;opzione, è probabile che tu abbia già la
                versione più recente.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Eliminazione dell&apos;account</h2>
            <p>Puoi richiedere l&apos;eliminazione del tuo account in due modi:</p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Direttamente dall&apos;App:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Apri l&apos;App e accedi</li>
                  <li>Vai nella sezione <strong>Profilo</strong></li>
                  <li>Tocca <strong>Elimina account</strong></li>
                  <li>Conferma la richiesta</li>
                </ol>
              </div>
              <p>
                <span className="font-semibold">Via email:</span>
                <br />
                Scrivi a studio@studiomobilitas.it dall&apos;indirizzo
                email registrato sul tuo account, indicando la richiesta di eliminazione.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              Cosa succede ai tuoi dati dopo l&apos;eliminazione
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                I <strong>dati del tuo profilo applicativo</strong> (login, preferenze, storico
                interazioni con l&apos;App) saranno cancellati entro 30 giorni dalla richiesta.
              </li>
              <li>
                I <strong>dati clinico-sanitari</strong> relativi alle visite osteopatiche effettuate
                presso le nostre strutture sono conservati per <strong>10 anni dall&apos;ultima
                prestazione</strong>, in conformità agli obblighi normativi sulla documentazione
                sanitaria (artt. 2946 e 1218 c.c.).
              </li>
              <li>
                I <strong>dati di fatturazione</strong> sono conservati per <strong>10 anni</strong> ai
                sensi dell&apos;art. 2220 c.c. e della normativa fiscale.
              </li>
            </ul>
            <p>
              Per maggiori dettagli sui tempi e le modalità di conservazione, consulta la nostra{' '}
              <Link
                to="/privacy-policy-applicazione"
                className="text-azure-dark underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Privacy e protezione dei dati</h2>
            <p>
              Mobilitas tratta i tuoi dati personali nel pieno rispetto del Regolamento (UE) 2016/679
              (GDPR) e del Codice Privacy italiano. L&apos;App tratta dati sanitari relativi alle
              visite osteopatiche con tutte le tutele rafforzate previste dalla normativa.
            </p>
            <p>
              <strong>Consulta la nostra Privacy Policy completa:</strong>{' '}
              <span className="text-blue-dark/70">
                [INSERIRE URL DELLA PRIVACY POLICY UNA VOLTA PUBBLICATA]
              </span>
            </p>
            <p>
              Per esercitare i tuoi diritti (accesso, rettifica, cancellazione, portabilità,
              opposizione, ecc.) scrivi a studio@studiomobilitas.it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Requisiti di sistema</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>iOS:</strong> versione 15.0 o successiva
              </li>
              <li>
                <strong>Android:</strong> versione 8.0 (API 26) o successiva
              </li>
              <li>
                <strong>Connessione internet:</strong> richiesta per la maggior parte delle
                funzionalità (autenticazione, sincronizzazione dati, fruizione contenuti)
              </li>
              <li>
                <strong>Spazio richiesto:</strong> circa 80 MB
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Lingue supportate</h2>
            <p>
              L&apos;App è attualmente disponibile in <strong>italiano</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Versioni e aggiornamenti</h2>
            <p>
              Manteniamo l&apos;App costantemente aggiornata per garantirti la migliore esperienza,
              correggere eventuali errori e rispettare le normative in evoluzione.
            </p>
            <p>
              Per consultare le novità dell&apos;ultima versione, visita la pagina dell&apos;App su App
              Store o Google Play e scorri fino alla sezione &quot;Novità&quot;.
            </p>
            <p>
              Ti consigliamo di <strong>mantenere sempre l&apos;App aggiornata</strong> all&apos;ultima
              versione disponibile per beneficiare delle ultime funzionalità e correzioni di sicurezza.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Risorse utili</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Sito web Mobilitas:</strong>{' '}
                <a
                  href="https://www.studiomobilitas.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2"
                >
                  https://www.studiomobilitas.it/
                </a>
              </li>
              <li>
                <strong>Privacy Policy App:</strong>{' '}
                <Link
                  to="/privacy-policy-applicazione"
                  className="text-azure-dark underline underline-offset-2"
                >
                  https://www.studiomobilitas.it/privacy-policy-applicazione
                </Link>
              </li>
              <li>
                <strong>Termini e Condizioni d&apos;uso:</strong>{' '}
                <a
                  href="https://www.iubenda.com/privacy-policy/67925714/cookie-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2"
                >
                  https://www.iubenda.com/privacy-policy/67925714/cookie-policy
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark">Chi siamo</h2>
            <p>
              <strong>Mobilitas</strong> è una catena di studi osteopatici basata a Torino, fondata
              per portare alle persone un approccio rigoroso, professionale e accessibile al benessere
              del corpo.
            </p>
            <p>
              Operiamo attraverso una squadra di osteopati qualificati nelle nostre sedi di Via Peyron
              e Via Lamarmora, e attraverso questa applicazione che estende il rapporto con i nostri
              pazienti e con chi vuole approfondire la conoscenza del corpo e del movimento.
            </p>
            <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2">
              <p className="font-bold">OsteoTouch S.r.l.</p>
              <p>Sede legale: Via Peyron 54, 10143 Torino (TO), Italia</p>
              <p>C.F. e P.IVA: 13020400019</p>
              <p>PEC: osteotouch@pec.it</p>
            </div>
          </section>

          <footer className="border-t border-blue-dark/10 pt-5">
            <p className="text-sm text-blue-dark/80">
              Pagina aggiornata al: <span className="text-blue-dark/70">13 maggio 2026</span>
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default SupportoApp
