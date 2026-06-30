import React, { useEffect } from 'react'

const tableWrap = 'overflow-x-auto my-6 -mx-1'
const tableBase =
  'min-w-full text-sm border border-blue-dark/15 text-left [&_th]:bg-blue-dark/5 [&_th]:p-3 [&_td]:p-3 [&_th]:border-b [&_td]:border-b [&_th]:border-blue-dark/15 [&_td]:border-blue-dark/15 [&_tr:last-child_td]:border-b-0'

const PrivacyPolicyApplicazione = () => {
  useEffect(() => {
    const previousTitle = document.title
    document.title =
      'Informativa Privacy App Mobilitas | OsteoTouch S.r.l. — Mobilitas'

    const ensureMetaByName = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const ensureMetaByProperty = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
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
      'Informativa sulla privacy dell’app mobile Mobilitas (Apple App Store e Google Play): titolare OsteoTouch S.r.l., dati trattati, finalità, diritti degli interessati e contatti.'
    const pageUrl = `${window.location.origin}/privacy-policy-applicazione`

    ensureMetaByName('description', description)
    ensureMetaByName('robots', 'index, follow')
    ensureMetaByName(
      'keywords',
      'privacy mobilitas, informativa app, gdpr app sanitaria, osteotouch privacy, mobilitas app'
    )

    ensureMetaByProperty('og:title', 'Informativa Privacy — App Mobilitas')
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:type', 'website')
    ensureMetaByProperty('og:url', pageUrl)
    ensureMetaByProperty('og:site_name', 'Mobilitas – Studio Osteopatico Torino')

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
              Informativa sulla Privacy — App Mobilitas
            </h1>
            <p className="text-sm sm:text-base text-blue-dark/80">
              <strong>Ultimo aggiornamento:</strong> 12 maggio 2026
            </p>
            <p className="text-sm sm:text-base text-blue-dark/80">
              <strong>Versione:</strong> 1.0
            </p>
          </header>

          <p>
            La presente informativa descrive le modalità con cui vengono trattati i dati personali
            degli Utenti che scaricano e utilizzano l&apos;applicazione mobile{' '}
            <strong>Mobilitas</strong> (di seguito, &quot;App&quot;), disponibile su Apple
            App Store e Google Play Store.
          </p>

          <p>La presente informativa è resa ai sensi:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              del Regolamento (UE) 2016/679 (&quot;GDPR&quot;), in particolare ai sensi degli artt.
              13 e 14;
            </li>
            <li>
              del D.lgs. 30 giugno 2003, n. 196 (&quot;Codice Privacy&quot;) come modificato dal
              D.lgs. 10 agosto 2018, n. 101;
            </li>
            <li>
              delle Linee Guida e dei Provvedimenti del Garante per la protezione dei dati personali
              in materia di trattamento dei dati personali nell&apos;ambito sanitario;
            </li>
            <li>
              delle Apple App Store Review Guidelines (in particolare §5.1.1, §5.1.2) e delle Google
              Play Developer Program Policies.
            </li>
          </ul>

          <hr className="border-blue-dark/15 my-10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-2">1. Definizioni</h2>
            <p>
              Ai fini della presente informativa, i seguenti termini hanno il significato di seguito
              indicato:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>&quot;App&quot;</strong>: l&apos;applicazione mobile Mobilitas,
                distribuita tramite Apple App Store e Google Play Store, comprensiva di tutte le
                sue funzionalità e dei contenuti accessibili attraverso di essa.
              </li>
              <li>
                <strong>&quot;Titolare&quot;</strong>: OsteoTouch S.r.l., come identificata al §2
                della presente informativa.
              </li>
              <li>
                <strong>&quot;Utente&quot;</strong> o <strong>&quot;Interessato&quot;</strong>: la
                persona fisica che scarica, installa e utilizza l&apos;App, indipendentemente dal
                ruolo applicativo assegnato (paziente, osteopata, amministratore).
              </li>
              <li>
                <strong>&quot;Dati personali&quot;</strong>: qualsiasi informazione riguardante una
                persona fisica identificata o identificabile, come definita all&apos;art. 4, n. 1)
                del GDPR.
              </li>
              <li>
                <strong>&quot;Dati sanitari&quot;</strong> o{' '}
                <strong>&quot;categorie particolari di dati&quot;</strong>: i dati personali
                relativi alla salute della persona fisica, come definiti all&apos;art. 4, n. 15) e
                all&apos;art. 9 del GDPR.
              </li>
              <li>
                <strong>&quot;Trattamento&quot;</strong>: qualsiasi operazione compiuta sui dati
                personali, come definita all&apos;art. 4, n. 2) del GDPR.
              </li>
              <li>
                <strong>&quot;Responsabile del trattamento&quot;</strong>: il soggetto che tratta
                dati personali per conto del Titolare, ai sensi dell&apos;art. 28 del GDPR.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">2. Titolare del trattamento</h2>
            <p>Il Titolare del trattamento dei dati personali è:</p>
            <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2 text-blue-dark">
              <p className="font-bold">OsteoTouch S.r.l.</p>
              <p>Sede legale: Via Peyron 54, 10143 Torino (TO), Italia</p>
              <p>Codice Fiscale e Partita IVA: 13020400019</p>
              <p>
                PEC:{' '}
                <a
                  href="mailto:osteotouch@pec.it"
                  className="text-azure-dark underline underline-offset-2"
                >
                  osteotouch@pec.it
                </a>
              </p>
              <p>
                E-mail per richieste privacy:{' '}
                <a
                  href="mailto:studio@studiomobilitas.it"
                  className="text-azure-dark underline underline-offset-2"
                >
                  studio@studiomobilitas.it
                </a>{' '}
                <span className="text-blue-dark/70 text-sm">[INDIRIZZO DA ATTIVARE]</span>
              </p>
            </div>
            <p>
              OsteoTouch S.r.l. opera commercialmente con il marchio <strong>Mobilitas</strong> ed
              eroga servizi osteopatici e di formazione attraverso le proprie strutture e l&apos;App
              oggetto della presente informativa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              3. Tipologie di dati personali trattati
            </h2>
            <p>
              Il Titolare tratta i dati personali secondo il principio di minimizzazione di cui
              all&apos;art. 5, par. 1, lett. c) del GDPR, raccogliendo esclusivamente i dati necessari
              alle finalità descritte al §4. Le categorie trattate sono le seguenti.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.1 Dati di registrazione, identificazione e contatto
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Indirizzo email e/o username</li>
              <li>
                Password (memorizzata esclusivamente in forma cifrata/hash sui server di backend; non
                viene mai conservata in chiaro né sul dispositivo)
              </li>
              <li>Nome e cognome</li>
              <li>Numero di telefono / cellulare</li>
              <li>
                Codice fiscale (raccolto per finalità di fatturazione sanitaria e adempimenti
                fiscali, ove l&apos;Utente acquisti prestazioni o pacchetti tramite il Titolare)
              </li>
              <li>
                Indirizzo postale di residenza o domicilio (raccolto per finalità di fatturazione
                elettronica sanitaria)
              </li>
              <li>Data di nascita (ove necessaria all&apos;inquadramento clinico o anagrafico)</li>
              <li>Eventuali ulteriori dati di profilo forniti dall&apos;Utente</li>
              <li>Ruolo applicativo dell&apos;Utente (paziente, osteopata, amministratore)</li>
              <li>
                Token di autenticazione (bearer token e refresh token) memorizzati nello storage
                locale sicuro del dispositivo
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.2 Trattamento dei dati di terzi da parte degli Utenti con ruolo osteopata
            </h3>
            <p>
              Gli Utenti che accedono all&apos;App con ruolo di osteopata, in quanto professionisti
              collaboratori o dipendenti del Titolare, possono trattare i dati personali di altri
              Utenti (i propri pazienti) ai soli fini dell&apos;erogazione della prestazione
              sanitaria.
            </p>
            <p>
              In tale ipotesi, gli osteopati operano come{' '}
              <strong>persone autorizzate al trattamento</strong> ai sensi degli artt. 29 GDPR e
              2-quaterdecies del Codice Privacy, sotto l&apos;autorità del Titolare, nel rispetto
              delle istruzioni impartite e con vincolo di segreto professionale ex art. 9, par. 3,
              GDPR. Non agiscono in qualità di autonomi Titolari del trattamento.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.3 Dati relativi all&apos;erogazione delle prestazioni osteopatiche (categoria
              particolare ex art. 9 GDPR — dati sanitari)
            </h3>
            <p>Per gli Utenti che accedono all&apos;area &quot;Visite&quot;:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Storico delle visite osteopatiche prenotate ed effettuate</li>
              <li>Studio (sede) di riferimento e osteopata assegnato</li>
              <li>Data, orario e tipologia della prestazione</li>
              <li>Pacchetti / servizi sanitari acquistati e relativo stato di utilizzo</li>
              <li>
                Eventuali annotazioni cliniche associate alla visita (consultabili dal solo
                personale sanitario autorizzato)
              </li>
            </ul>
            <p>
              Per gli Utenti con ruolo osteopata, l&apos;App consente la visualizzazione di dati
              sanitari di pazienti loro assegnati, nell&apos;ambito dell&apos;attività professionale
              autorizzata.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.4 Dati relativi alle prenotazioni fitness
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sessioni fitness prenotate, calendario partecipazioni</li>
              <li>Storico annullamenti</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.5 Dati relativi alla formazione
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Corsi e moduli ai quali l&apos;Utente ha accesso</li>
              <li>
                Stato di avanzamento dei contenuti formativi (lezioni visualizzate, progressi)
              </li>
              <li>Metadati di fruizione dei contenuti video</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.6 Dati tecnici e di diagnostica
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identificativo del dispositivo, sistema operativo e versione</li>
              <li>Modello e tipologia del dispositivo</li>
              <li>Versione dell&apos;App</li>
              <li>
                Indirizzo IP (raccolto a livello server per finalità tecniche e di sicurezza)
              </li>
              <li>Log tecnici di accesso e di errore generati lato server</li>
            </ul>
            <p>
              Si precisa che il Titolare{' '}
              <strong>non utilizza strumenti propri di crash reporting o analytics di terze parti</strong>{' '}
              all&apos;interno dell&apos;App. Eventuali dati di crash o di diagnostica a livello di
              sistema operativo possono essere raccolti autonomamente da Apple Inc. e Google LLC come
              gestori delle rispettive piattaforme iOS e Android, secondo le impostazioni di
              condivisione attivate dall&apos;Utente sul proprio dispositivo. Tali dati non sono
              accessibili al Titolare in forma individuale.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              3.7 Dati relativi alle preferenze locali
            </h3>
            <p>
              L&apos;App memorizza nello storage locale del dispositivo (AsyncStorage) alcuni dati
              funzionali, tra cui:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Token di sessione e refresh token</li>
              <li>Snapshot del profilo Utente per fruizione offline temporanea</li>
              <li>Preferenza &quot;ricorda username&quot; (se attivata dall&apos;Utente)</li>
              <li>Eventuali flag di configurazione delle integrazioni multimediali</li>
            </ul>
            <p>
              L&apos;Utente può rimuovere tali dati in qualsiasi momento utilizzando la funzione
              &quot;Pulizia cache&quot; presente nella sezione Profilo dell&apos;App, oppure
              disinstallando l&apos;App.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">3.8 Notifiche push</h3>
            <p>
              L&apos;App utilizza il sistema di notifiche push del sistema operativo del dispositivo
              per inviare all&apos;Utente comunicazioni di servizio (in particolare reminder di
              visite, conferme di prenotazione, aggiornamenti sui contenuti formativi).
            </p>
            <p>A tal fine, vengono trattati:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                il <strong>device token push</strong> (identificativo tecnico generato da Apple Push
                Notification service per iOS e da Firebase Cloud Messaging per Android, che consente
                al server del Titolare di recapitare la notifica al dispositivo);
              </li>
              <li>
                le <strong>preferenze di notifica</strong> eventualmente espresse dall&apos;Utente
                all&apos;interno del sistema operativo o dell&apos;App;
              </li>
              <li>
                i <strong>metadati di consegna</strong> (esito tecnico di invio della notifica).
              </li>
            </ul>
            <p>
              L&apos;Utente può <strong>disattivare in qualsiasi momento le notifiche push</strong>{' '}
              dalle impostazioni del sistema operativo del proprio dispositivo (Impostazioni →
              Notifiche → Mobilitas), senza che ciò pregiudichi l&apos;utilizzo delle altre
              funzionalità dell&apos;App. La disattivazione comporta tuttavia la mancata ricezione di
              reminder e comunicazioni di servizio.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">3.9 Dati NON trattati dall&apos;App</h3>
            <p>
              A maggior chiarezza, si specifica che l&apos;App <strong>non raccoglie</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Dati biometrici (eventuali sblocchi tramite fingerprint/Face ID sono gestiti
                localmente dal sistema operativo del dispositivo e non trasmessi al Titolare)
              </li>
              <li>Dati di geolocalizzazione precisa o in background</li>
              <li>Rubrica contatti del dispositivo</li>
              <li>Foto, video o file presenti sul dispositivo</li>
              <li>
                Dati di tracciamento pubblicitario tra app o siti web di terzi (l&apos;App{' '}
                <strong>non utilizza IDFA</strong> né altri identificatori a fini di tracking ATT ai
                sensi del framework Apple App Tracking Transparency)
              </li>
              <li>Cronologia di navigazione web</li>
              <li>
                Dati di pagamento (carte di credito, IBAN); l&apos;App <strong>non gestisce pagamenti</strong>{' '}
                in-app: ogni transazione economica avviene al di fuori dell&apos;App, presso le sedi
                del Titolare o tramite canali commerciali separati
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              4. Finalità del trattamento e basi giuridiche
            </h2>
            <div className={tableWrap}>
              <table className={tableBase}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Finalità</th>
                    <th>Categorie di dati</th>
                    <th>Base giuridica</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A</td>
                    <td>Creazione account, autenticazione, gestione sessione</td>
                    <td>§3.1</td>
                    <td>Art. 6, par. 1, lett. b) GDPR — esecuzione del contratto</td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>Erogazione del servizio di prenotazione e gestione visite osteopatiche</td>
                    <td>§3.1, §3.3</td>
                    <td>
                      Art. 6, par. 1, lett. b) GDPR +{' '}
                      <strong>art. 9, par. 2, lett. h) GDPR</strong> — trattamento necessario per
                      finalità di assistenza sanitaria, da parte o sotto la responsabilità di
                      professionisti soggetti al segreto professionale
                    </td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>Gestione prenotazioni e partecipazioni a sessioni fitness</td>
                    <td>§3.1, §3.4</td>
                    <td>Art. 6, par. 1, lett. b) GDPR</td>
                  </tr>
                  <tr>
                    <td>D</td>
                    <td>Erogazione corsi e contenuti formativi, tracciamento progressi</td>
                    <td>§3.1, §3.5</td>
                    <td>Art. 6, par. 1, lett. b) GDPR</td>
                  </tr>
                  <tr>
                    <td>E</td>
                    <td>
                      Adempimenti fiscali, contabili e amministrativi connessi all&apos;acquisto di
                      pacchetti/servizi
                    </td>
                    <td>§3.1, §3.3</td>
                    <td>Art. 6, par. 1, lett. c) GDPR — obbligo di legge</td>
                  </tr>
                  <tr>
                    <td>F</td>
                    <td>Sicurezza dell&apos;applicazione, prevenzione frodi e abusi, diagnostica tecnica</td>
                    <td>§3.6</td>
                    <td>
                      Art. 6, par. 1, lett. f) GDPR — legittimo interesse del Titolare alla sicurezza
                      dei sistemi
                    </td>
                  </tr>
                  <tr>
                    <td>G</td>
                    <td>
                      Adempimento di obblighi di legge in materia sanitaria (es. tenuta documentazione
                      clinica)
                    </td>
                    <td>§3.3</td>
                    <td>
                      Art. 6, par. 1, lett. c) GDPR + art. 9, par. 2, lett. h) GDPR
                    </td>
                  </tr>
                  <tr>
                    <td>H</td>
                    <td>
                      Invio di notifiche push di servizio (reminder visita, conferme prenotazione,
                      aggiornamenti formativi)
                    </td>
                    <td>§3.1, §3.8</td>
                    <td>Art. 6, par. 1, lett. b) GDPR — esecuzione del contratto</td>
                  </tr>
                  <tr>
                    <td>I</td>
                    <td>
                      Invio di comunicazioni transazionali via email e/o SMS strettamente connesse alle
                      prestazioni richieste (conferme prenotazione, reminder appuntamento,
                      comunicazioni di servizio)
                    </td>
                    <td>§3.1</td>
                    <td>Art. 6, par. 1, lett. b) GDPR — esecuzione del contratto</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>Risposta a richieste dell&apos;autorità giudiziaria o di pubbliche autorità</td>
                    <td>Tutte le categorie</td>
                    <td>Art. 6, par. 1, lett. c) GDPR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              4.1 Trattamento dei dati sanitari — precisazione
            </h3>
            <p>Il trattamento dei dati di cui al §3.3 è effettuato:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                da osteopati e personale sanitario soggetti al segreto professionale, ai sensi
                dell&apos;art. 9, par. 3, GDPR;
              </li>
              <li>
                nel rispetto dei principi e dei Provvedimenti del Garante per la protezione dei dati
                personali in materia di trattamento dei dati nell&apos;ambito sanitario;
              </li>
              <li>
                nel rispetto delle Regole Deontologiche di cui all&apos;Allegato A.4 del Codice Privacy;
              </li>
              <li>
                senza necessità di consenso esplicito ai sensi dell&apos;art. 9, par. 2, lett. h)
                GDPR, in quanto il trattamento è necessario per finalità di assistenza sanitaria
                erogata da professionisti tenuti al segreto.
              </li>
            </ul>
            <p>
              L&apos;Utente è informato che, nel momento in cui prenota una visita tramite l&apos;App,
              conferma di voler usufruire della prestazione sanitaria presso le strutture Mobilitas, con
              conseguente trattamento dei propri dati sanitari nell&apos;ambito della cartella clinica.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              4.2 Esclusione del trattamento a fini di marketing diretto via App
            </h3>
            <p>
              L&apos;App{' '}
              <strong>
                non viene utilizzata per finalità di marketing diretto, profilazione commerciale o
                invio di comunicazioni promozionali
              </strong>
              . Eventuali comunicazioni di marketing relative ai servizi del Titolare, ove inviate
              tramite canali separati, sono soggette ad autonomo consenso e a separata informativa.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">5. Modalità del trattamento</h2>
            <p>
              I dati personali sono trattati con strumenti elettronici, secondo logiche correlate alle
              finalità sopra indicate e nel rispetto dei principi di:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>liceità, correttezza e trasparenza;</li>
              <li>limitazione delle finalità;</li>
              <li>minimizzazione dei dati;</li>
              <li>esattezza;</li>
              <li>limitazione della conservazione;</li>
              <li>integrità e riservatezza;</li>
              <li>responsabilizzazione (accountability).</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              5.1 Misure tecniche e organizzative
            </h3>
            <p>
              Il Titolare ha adottato misure tecniche e organizzative adeguate ai sensi dell&apos;art.
              32 GDPR, tra cui:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>trasmissione cifrata dei dati tra App e backend tramite protocollo HTTPS/TLS;</li>
              <li>
                conservazione delle password esclusivamente in forma cifrata mediante algoritmi di
                hashing sicuri;
              </li>
              <li>
                gestione delle sessioni tramite token bearer di durata limitata con meccanismo di
                refresh;
              </li>
              <li>controlli degli accessi basati su ruoli (Role-Based Access Control);</li>
              <li>
                vincolo di segretezza e specifiche istruzioni per il personale autorizzato al
                trattamento;
              </li>
              <li>backup periodici dei dati e procedure di ripristino;</li>
              <li>segregazione logica degli ambienti di sviluppo, test e produzione.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              5.2 Decisioni automatizzate e profilazione
            </h3>
            <p>
              Il Titolare{' '}
              <strong>non effettua processi decisionali interamente automatizzati</strong>, inclusa la
              profilazione, che producano effetti giuridici sull&apos;Utente o che incidano in modo
              analogo significativamente sulla sua persona ai sensi dell&apos;art. 22 GDPR.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              6. Soggetti destinatari dei dati e terze parti
            </h2>
            <p>
              I dati personali possono essere comunicati alle seguenti categorie di destinatari,
              ciascuno nominato Responsabile del trattamento ex art. 28 GDPR ove applicabile, o
              operante in qualità di Titolare autonomo.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              6.1 Soggetti interni e collaboratori del Titolare
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Personale dipendente e osteopati collaboratori del Titolare, autorizzati al
                trattamento ai sensi degli artt. 29 GDPR e 2-quaterdecies Codice Privacy
              </li>
              <li>Consulenti legali, fiscali e amministrativi</li>
              <li>Società di revisione, ove applicabile</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              6.2 Fornitori di servizi tecnologici (Responsabili del trattamento)
            </h3>
            <div className={tableWrap}>
              <table className={tableBase}>
                <thead>
                  <tr>
                    <th>Fornitore</th>
                    <th>Servizio</th>
                    <th>Sede dati / Trasferimento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Apple Inc.</strong>
                    </td>
                    <td>
                      Distribuzione dell&apos;App tramite App Store, infrastruttura di consegna e
                      aggiornamenti, diagnostica tecnica della piattaforma iOS, recapito notifiche push
                      tramite Apple Push Notification service (APNs)
                    </td>
                    <td>USA — adeguatezza ex EU-US Data Privacy Framework</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google LLC</strong>
                    </td>
                    <td>
                      Distribuzione dell&apos;App tramite Google Play Store, recapito notifiche push
                      tramite Firebase Cloud Messaging (FCM)
                    </td>
                    <td>USA — adeguatezza ex EU-US Data Privacy Framework</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google LLC</strong> (Google Cloud Platform)
                    </td>
                    <td>
                      Hosting dell&apos;infrastruttura backend (Spring Boot), database e API;
                      archiviazione dei dati applicativi e di backup
                    </td>
                    <td>
                      Regione UE (Europa) — laddove possibile, ai sensi del principio di
                      territorialità del trattamento; eventuali servizi residuali in USA coperti da
                      Clausole Contrattuali Standard ed EU-US DPF
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google LLC</strong> (Firebase Functions)
                    </td>
                    <td>
                      Funzioni serverless di integrazione media (proxy verso provider video, gestione
                      token)
                    </td>
                    <td>USA — Clausole Contrattuali Standard + EU-US DPF</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Cloudflare, Inc.</strong>
                    </td>
                    <td>Streaming dei contenuti video formativi (Cloudflare Stream), CDN</td>
                    <td>USA / UE — Clausole Contrattuali Standard</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Google LLC</strong> (YouTube Data API)
                    </td>
                    <td>
                      Recupero metadati e contenuti video formativi ospitati su YouTube
                    </td>
                    <td>USA — EU-US DPF</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Intuit Inc.</strong> (Mailchimp Transactional Email — ex Mandrill)
                    </td>
                    <td>
                      Invio di email transazionali (conferme prenotazione, reminder visite,
                      comunicazioni di servizio)
                    </td>
                    <td>
                      USA — adeguatezza ex EU-US Data Privacy Framework e Clausole Contrattuali Standard
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SMS Hosting S.r.l.</strong> (smshosting.it)
                    </td>
                    <td>
                      Invio di SMS transazionali (reminder visite, conferme prenotazione)
                    </td>
                    <td>Italia / UE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              6.3 Autorità pubbliche e organi di vigilanza
            </h3>
            <p>
              I dati possono essere comunicati ad autorità giudiziarie, forze dell&apos;ordine,
              autorità sanitarie e altri enti pubblici, esclusivamente nei casi previsti dalla legge e
              a seguito di formale richiesta.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              6.4 Trasferimenti di dati extra-UE
            </h3>
            <p>
              Alcuni fornitori di servizi tecnologici hanno sede o utilizzano infrastrutture al di
              fuori dello Spazio Economico Europeo. In tali casi, il Titolare garantisce che il
              trasferimento avvenga:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                verso Paesi oggetto di decisione di adeguatezza della Commissione Europea (art. 45
                GDPR); oppure
              </li>
              <li>
                sulla base di Clausole Contrattuali Standard approvate dalla Commissione Europea
                (art. 46, par. 2, lett. c) e d) GDPR); oppure
              </li>
              <li>in presenza di altre garanzie adeguate ai sensi del Capo V del GDPR.</li>
            </ul>
            <p>
              L&apos;Interessato ha diritto di <strong>ottenere copia delle Clausole Contrattuali Standard</strong>{' '}
              e delle ulteriori garanzie adottate, ovvero indicazione del luogo in cui sono rese
              disponibili, ai sensi dell&apos;art. 13, par. 1, lett. f) e dell&apos;art. 46, par. 1
              GDPR, scrivendo agli indirizzi indicati al §2.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">6.5 Non vendita dei dati</h3>
            <p>
              Il Titolare{' '}
              <strong>non vende, non affitta e non cede a terzi a fini commerciali</strong> i dati
              personali degli Utenti. I dati non sono utilizzati per pubblicità mirata di terzi né per
              attività di tracciamento pubblicitario cross-app.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              6.6 Policy autonome dei provider di servizi tecnologici
            </h3>
            <p>
              L&apos;Utente prende atto che, nel momento in cui fruisce di contenuti veicolati tramite
              servizi tecnologici di terzi (in particolare contenuti video erogati tramite Cloudflare
              Stream, YouTube o Firebase, e l&apos;utilizzo stesso dell&apos;App scaricata da Apple App
              Store o Google Play Store), tali provider possono raccogliere e trattare autonomamente
              dati personali ai sensi delle proprie politiche sulla privacy, in qualità di Titolari
              autonomi del trattamento. Il Titolare non risponde delle modalità di trattamento adottate
              da tali soggetti terzi.
            </p>
            <p>L&apos;Utente è invitato a consultare le rispettive informative:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Apple —{' '}
                <a
                  href="https://www.apple.com/legal/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2 break-all"
                >
                  https://www.apple.com/legal/privacy/
                </a>
              </li>
              <li>
                Google (Google Cloud, Firebase, YouTube, Google Play, Firebase Cloud Messaging) —{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2 break-all"
                >
                  https://policies.google.com/privacy
                </a>
              </li>
              <li>
                Cloudflare —{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2 break-all"
                >
                  https://www.cloudflare.com/privacypolicy/
                </a>
              </li>
              <li>
                Mailchimp (Intuit Inc.) —{' '}
                <a
                  href="https://www.intuit.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2 break-all"
                >
                  https://www.intuit.com/privacy/
                </a>{' '}
                e{' '}
                <a
                  href="https://mailchimp.com/legal/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2 break-all"
                >
                  https://mailchimp.com/legal/privacy/
                </a>
              </li>
              <li>
                SMS Hosting —{' '}
                <a
                  href="https://www.smshosting.it/privacy.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2 break-all"
                >
                  https://www.smshosting.it/privacy.php
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              7. Periodo di conservazione dei dati
            </h2>
            <p>
              I dati personali sono conservati per il tempo strettamente necessario al perseguimento
              delle finalità per le quali sono stati raccolti, e in particolare:
            </p>
            <div className={tableWrap}>
              <table className={tableBase}>
                <thead>
                  <tr>
                    <th>Categoria di dati</th>
                    <th>Periodo di conservazione</th>
                    <th>Riferimento normativo / Motivazione</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dati account e profilo (Utente paziente)</td>
                    <td>
                      Per tutta la durata dell&apos;utilizzo dell&apos;App, e fino alla richiesta di
                      cancellazione o disattivazione dell&apos;account
                    </td>
                    <td>Esecuzione del contratto</td>
                  </tr>
                  <tr>
                    <td>Dati relativi a visite osteopatiche e documentazione clinica</td>
                    <td>
                      <strong>10 anni dalla data dell&apos;ultima prestazione</strong>, fatti salvi
                      termini di legge superiori
                    </td>
                    <td>
                      Termine di prescrizione decennale della responsabilità professionale sanitaria
                      (artt. 2946 e 1218 c.c.); obblighi di conservazione della documentazione sanitaria
                    </td>
                  </tr>
                  <tr>
                    <td>Dati di fatturazione, acquisti, scritture contabili</td>
                    <td>
                      <strong>10 anni dalla data del documento</strong>
                    </td>
                    <td>
                      Art. 2220 c.c. e art. 22 D.P.R. 600/1973 (obblighi di conservazione contabile e
                      fiscale)
                    </td>
                  </tr>
                  <tr>
                    <td>Dati di prenotazione fitness (storico)</td>
                    <td>
                      Fino alla richiesta di cancellazione o disattivazione dell&apos;account
                    </td>
                    <td>Esecuzione del contratto; eventuali esigenze di gestione contenziosi</td>
                  </tr>
                  <tr>
                    <td>Dati di formazione e progressi corsi</td>
                    <td>
                      Per tutta la durata dell&apos;accesso al servizio formativo e fino alla
                      cessazione dello stesso
                    </td>
                    <td>Esecuzione del contratto</td>
                  </tr>
                  <tr>
                    <td>Log tecnici, di sicurezza e diagnostici</td>
                    <td>
                      Di norma 12 mesi, salvo esigenze investigative o di sicurezza che giustifichino
                      una conservazione superiore
                    </td>
                    <td>Legittimo interesse del Titolare alla sicurezza dei sistemi</td>
                  </tr>
                  <tr>
                    <td>Token di sessione memorizzati localmente sul dispositivo</td>
                    <td>
                      Fino al logout, alla scadenza del token, alla pulizia cache da parte
                      dell&apos;Utente o alla disinstallazione dell&apos;App
                    </td>
                    <td>Funzionamento tecnico dell&apos;autenticazione</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Decorsi i predetti termini, i dati saranno cancellati o anonimizzati in modo
              irreversibile.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">8. Diritti degli interessati</h2>
            <p>
              L&apos;Utente, in qualità di interessato, può esercitare in qualsiasi momento i diritti
              previsti dagli artt. 15-22 del GDPR e segnatamente:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Diritto di accesso</strong> (art. 15): ottenere conferma dell&apos;esistenza
                di dati che lo riguardano e accedere agli stessi;
              </li>
              <li>
                <strong>Diritto di rettifica</strong> (art. 16): chiedere la correzione di dati
                inesatti o l&apos;integrazione di dati incompleti;
              </li>
              <li>
                <strong>Diritto alla cancellazione</strong> (&quot;diritto all&apos;oblio&quot;, art.
                17): chiedere la cancellazione dei propri dati, ferme restando le ipotesi di
                conservazione obbligatoria per legge (in particolare, i dati sanitari sono soggetti a
                obblighi di conservazione decennale);
              </li>
              <li>
                <strong>Diritto di limitazione del trattamento</strong> (art. 18);
              </li>
              <li>
                <strong>Diritto alla portabilità dei dati</strong> (art. 20): ricevere i propri dati in
                formato strutturato, di uso comune e leggibile da dispositivo automatico;
              </li>
              <li>
                <strong>Diritto di opposizione</strong> (art. 21) al trattamento basato su legittimo
                interesse;
              </li>
              <li>
                <strong>Diritto di non essere sottoposto a decisioni automatizzate</strong> (art. 22);
              </li>
              <li>
                <strong>Diritto di revocare il consenso</strong> in qualsiasi momento, ove il
                trattamento sia basato sul consenso, senza pregiudicare la liceità del trattamento
                basato sul consenso prestato prima della revoca.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              8.1 Modalità di esercizio dei diritti
            </h3>
            <p>Per esercitare i predetti diritti, l&apos;Utente può scrivere a:</p>
            <p>
              <strong>
                <a
                  href="mailto:studio@studiomobilitas.itt"
                  className="text-azure-dark underline underline-offset-2"
                >
                  studio@studiomobilitas.it
                </a>
              </strong>{' '}
              <span className="text-blue-dark/70 text-sm">[INDIRIZZO DA ATTIVARE]</span>
            </p>
            <p>oppure ai recapiti del Titolare indicati al §2.</p>
            <p>
              Il Titolare fornirà riscontro senza ingiustificato ritardo e, comunque,{' '}
              <strong>entro un mese</strong> dalla ricezione della richiesta, salvo proroga di ulteriori
              due mesi tenuto conto della complessità e del numero delle richieste, ai sensi
              dell&apos;art. 12, par. 3, GDPR.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              8.2 Diritto di reclamo e ricorso giurisdizionale
            </h3>
            <p>
              L&apos;Utente ha diritto di proporre{' '}
              <strong>reclamo all&apos;autorità di controllo competente</strong>, individuata in Italia
              nel:
            </p>
            <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2">
              <p className="font-bold">Garante per la protezione dei dati personali</p>
              <p>Piazza Venezia 11 — 00187 Roma</p>
              <p>
                Sito web:{' '}
                <a
                  href="https://www.gpdp.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2"
                >
                  www.gpdp.it
                </a>{' '}
                /{' '}
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azure-dark underline underline-offset-2"
                >
                  www.garanteprivacy.it
                </a>
              </p>
              <p>
                E-mail:{' '}
                <a
                  href="mailto:protocollo@gpdp.it"
                  className="text-azure-dark underline underline-offset-2"
                >
                  protocollo@gpdp.it
                </a>
              </p>
            </div>
            <p>
              In alternativa, l&apos;Utente può proporre <strong>ricorso giurisdizionale</strong>{' '}
              all&apos;autorità giudiziaria ordinaria ai sensi dell&apos;art. 79 GDPR e dell&apos;art.
              152 del Codice Privacy, dinanzi al Tribunale del luogo di residenza dell&apos;Utente o
              presso il quale ha sede il Titolare.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">8.3 Eliminazione dell&apos;account</h3>
            <p>
              L&apos;Utente può richiedere l&apos;eliminazione del proprio account utilizzando
              l&apos;apposita funzionalità presente nella sezione Profilo dell&apos;App, oppure
              scrivendo a{' '}
              <a
                href="mailto:studio@studiomobilitas.it"
                className="text-azure-dark underline underline-offset-2"
              >
                studio@studiomobilitas.it
              </a>{' '}
              <span className="text-blue-dark/70 text-sm">[INDIRIZZO DA ATTIVARE]</span>.
            </p>
            <p>
              La cancellazione dei dati di profilo sarà completata entro un mese dalla richiesta, fatta
              salva la necessità di conservare i dati clinico-sanitari e fiscali per i termini di legge
              indicati al §7.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              8.4 Dati relativi a persone decedute
            </h3>
            <p>
              Ai sensi dell&apos;<strong>art. 2-terdecies del Codice Privacy</strong>, i diritti di cui
              agli artt. 15-22 GDPR riferiti ai dati personali di persone decedute possono essere
              esercitati da chi ha un <strong>interesse proprio</strong>, o agisce a tutela
              dell&apos;interessato in qualità di <strong>mandatario</strong>, o per{' '}
              <strong>ragioni familiari meritevoli di protezione</strong>.
            </p>
            <p>
              In ambito sanitario, ciò assume particolare rilievo: i parenti del paziente deceduto
              possono richiedere accesso alla documentazione clinica per finalità di tutela
              giuridica, valutazione di eventuale responsabilità professionale, esecuzione di volontà
              dell&apos;interessato o documentazione assicurativa.
            </p>
            <p>
              L&apos;esercizio di tali diritti potrà essere <strong>vietato espressamente dall&apos;Utente quando ancora in vita</strong>{' '}
              mediante dichiarazione scritta consegnata al Titolare. Tale divieto è revocabile in
              qualsiasi momento dall&apos;Utente stesso, ma non può comunque produrre effetti
              pregiudizievoli per l&apos;esercizio da parte di terzi dei diritti patrimoniali derivanti
              dalla morte dell&apos;interessato, né del diritto di difendere in giudizio i propri
              interessi.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              9. Sicurezza dei dati e gestione delle violazioni
            </h2>
            <p>
              Il Titolare adotta misure tecniche e organizzative adeguate a garantire un livello di
              sicurezza appropriato al rischio, ai sensi dell&apos;art. 32 GDPR. Tuttavia, nessun sistema
              informatico è completamente esente da rischi: l&apos;Utente è invitato a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>mantenere segrete le proprie credenziali di accesso;</li>
              <li>aggiornare regolarmente l&apos;App alla versione più recente;</li>
              <li>effettuare il logout dai dispositivi non personali o non più utilizzati;</li>
              <li>
                segnalare tempestivamente al Titolare qualsiasi sospetto di accesso non autorizzato al
                proprio account.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              9.1 Procedura in caso di violazione dei dati personali (data breach)
            </h3>
            <p>In caso di violazione dei dati personali, il Titolare procederà a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>notificare la violazione al Garante</strong> entro 72 ore dal momento in cui ne
                è venuto a conoscenza, salvo che sia improbabile che la violazione presenti un rischio
                per i diritti e le libertà delle persone fisiche, ai sensi dell&apos;art. 33 GDPR;
              </li>
              <li>
                <strong>comunicare la violazione agli interessati</strong> senza ingiustificato ritardo,
                qualora questa presenti un rischio elevato per i diritti e le libertà degli stessi, ai
                sensi dell&apos;art. 34 GDPR.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">10. Minori</h2>
            <p>
              L&apos;App è destinata principalmente a soggetti maggiorenni. I trattamenti relativi a
              minori avvengono esclusivamente nell&apos;ambito dell&apos;erogazione di prestazioni
              osteopatiche pediatriche, sotto la responsabilità e con il consenso di chi esercita la
              responsabilità genitoriale.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              10.1 Prenotazione di visite per figli minori
            </h3>
            <p>
              Il genitore o esercente la responsabilità genitoriale, in qualità di Utente registrato
              all&apos;App, può prenotare visite osteopatiche per il proprio figlio minore. In tali
              ipotesi:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                i dati identificativi e sanitari del minore sono trattati nella{' '}
                <strong>cartella clinica autonoma</strong> del minore stesso, intestata al minore
                quale interessato, e non confluiscono nel profilo dell&apos;Utente genitore;
              </li>
              <li>
                il genitore agisce in nome e per conto del minore quale legale rappresentante;
              </li>
              <li>
                il trattamento dei dati sanitari del minore è basato sull&apos;art. 9, par. 2, lett. h)
                GDPR (assistenza sanitaria), con le tutele rafforzate di cui all&apos;art. 8 GDPR per
                quanto riguarda l&apos;eventuale offerta diretta di servizi della società
                dell&apos;informazione al minore.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              10.2 Servizi della società dell&apos;informazione
            </h3>
            <p>
              Per quanto riguarda i servizi della società dell&apos;informazione offerti direttamente al
              minore tramite l&apos;App, ai sensi dell&apos;art. 2-quinquies del Codice Privacy italiano,
              il consenso del minore di età inferiore a 14 anni è valido solo se prestato da chi
              esercita la responsabilità genitoriale.
            </p>
            <p>
              Il Titolare non raccoglie consapevolmente dati di minori di 14 anni in assenza di tale
              autorizzazione. Qualora venisse a conoscenza di un trattamento di dati di un minore
              privo della necessaria autorizzazione, provvederà tempestivamente alla cancellazione.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              11. Identificatori tecnici nell&apos;App e link a contenuti esterni
            </h2>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              11.1 Identificatori e storage locale
            </h3>
            <p>
              L&apos;App non utilizza cookie HTTP nel senso tecnico utilizzato dai siti web. Tuttavia,
              in coerenza con i principi del Provvedimento del Garante del 10 giugno 2021 sulle
              &quot;Linee guida cookie e altri strumenti di tracciamento&quot;, il Titolare informa che
              l&apos;App memorizza nello storage locale del dispositivo (AsyncStorage di React Native)
              alcuni identificatori e dati strettamente tecnici, descritti al §3.7 della presente
              informativa.
            </p>
            <p>
              Tali identificatori sono <strong>esclusivamente di natura tecnica</strong>, finalizzati al
              funzionamento dell&apos;App e all&apos;autenticazione dell&apos;Utente, e non richiedono il
              preventivo consenso ai sensi della normativa vigente.
            </p>
            <p>
              L&apos;App <strong>non utilizza identificatori di tracciamento pubblicitario, identificatori di profilazione cross-app o identificatori di terze parti a fini di marketing</strong>.
            </p>

            <h3 className="text-xl font-semibold text-blue-dark pt-2">
              11.2 Link a contenuti e servizi esterni
            </h3>
            <p>
              L&apos;App può contenere link che reindirizzano l&apos;Utente verso contenuti, servizi o
              piattaforme di terze parti (ad esempio, link verso Google Maps per la visualizzazione di
              studi del Titolare e l&apos;invio di recensioni). L&apos;attivazione di tali link
              comporta l&apos;uscita dall&apos;App e l&apos;ingresso in ambienti soggetti alle policy di
              privacy autonome dei rispettivi gestori, sulle quali il Titolare non esercita controllo.
              Si invita l&apos;Utente a consultare tali policy prima di interagire con i contenuti
              esterni.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              12. Informazioni specifiche per Apple App Store
            </h2>
            <p>
              Ai fini delle Apple App Store Review Guidelines (§5.1.1, §5.1.2) e in coerenza con le Apple
              Privacy Nutrition Labels compilate su App Store Connect, si fornisce il seguente quadro
              riepilogativo. Le categorie utilizzate riprendono la tassonomia ufficiale Apple.
            </p>
            <p>
              <strong>Dati raccolti e collegati all&apos;Utente (Data Linked to You):</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <em>Contact Info</em>: Name, Email Address, Phone Number
              </li>
              <li>
                <em>Health &amp; Fitness</em>: Health (storico visite osteopatiche, dati clinici
                associati), Fitness (sessioni prenotate)
              </li>
              <li>
                <em>Identifiers</em>: User ID, Device ID (limitatamente al device token push necessario
                al recapito delle notifiche di servizio)
              </li>
              <li>
                <em>Purchases</em>: Purchase History (pacchetti e servizi acquistati presso il Titolare)
              </li>
              <li>
                <em>Usage Data</em>: Product Interaction (interazione con corsi, lezioni, prenotazioni)
              </li>
              <li>
                <em>Diagnostics</em>: Crash Data, Performance Data, Other Diagnostic Data (limitatamente
                alla raccolta operata da Apple a livello di sistema operativo)
              </li>
            </ul>
            <p>
              <strong>Dati raccolti e non collegati all&apos;Utente (Data Not Linked to You):</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identificativi tecnici di sessione e dati di diagnostica aggregati in forma anonima</li>
            </ul>
            <p>
              <strong>Finalità di utilizzo dichiarate ad Apple:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>App Functionality (funzionamento dell&apos;App)</li>
              <li>Analytics (limitatamente alla diagnostica tecnica di piattaforma)</li>
            </ul>
            <p>
              <strong>Tracking (App Tracking Transparency framework):</strong>
            </p>
            <p>
              L&apos;App <strong>non effettua tracking</strong> ai sensi del framework Apple ATT. Non sono
              utilizzati IDFA né altri identificatori per tracciare l&apos;Utente tra App e siti di terzi
              a fini pubblicitari. Non viene pertanto richiesta la relativa autorizzazione tramite
              prompt ATT.
            </p>
            <p>
              <strong>Eliminazione account in-app:</strong>
            </p>
            <p>
              In conformità ai requisiti Apple in vigore dal 30 giugno 2022, l&apos;App mette a
              disposizione una funzionalità che consente all&apos;Utente di richiedere la cancellazione
              del proprio account direttamente dall&apos;App, dalla sezione Profilo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              13. Informazioni specifiche per Google Play Store
            </h2>
            <p>
              Ai fini della &quot;Data safety section&quot; prevista da Google Play e in coerenza con le
              dichiarazioni rese nella relativa dashboard, si specifica quanto segue secondo la
              tassonomia ufficiale Google.
            </p>
            <p>
              <strong>Tipi di dati raccolti dichiarati:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <em>Personal info</em>: Name, Email address, User IDs, Phone number, Address (limitatamente
                a quanto necessario per fatturazione)
              </li>
              <li>
                <em>Health and fitness</em>: Health info, Fitness info
              </li>
              <li>
                <em>Financial info</em>: Purchase history
              </li>
              <li>
                <em>App activity</em>: App interactions, In-app search history (limitato a ricerche
                interne ai contenuti)
              </li>
              <li>
                <em>App info and performance</em>: Crash logs, Diagnostics, Other app performance data
                (limitatamente alla raccolta operata da Google a livello di sistema operativo)
              </li>
            </ul>
            <p>
              <strong>Finalità dichiarate:</strong> App functionality, Account management, Analytics,
              Fraud prevention/security/compliance.
            </p>
            <p>
              <strong>Garanzie dichiarate:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>I dati sono <strong>trasmessi in modalità cifrata</strong> (HTTPS/TLS in transito).</li>
              <li>
                L&apos;Utente <strong>può richiedere la cancellazione dei propri dati</strong>{' '}
                direttamente in-app dalla sezione Profilo e/o scrivendo agli indirizzi indicati al §15.
              </li>
              <li>
                I dati personali <strong>non vengono condivisi con terze parti</strong> ai fini di
                pubblicità, marketing, vendita, analisi di terzi o brokeraggio dati.
              </li>
            </ul>
            <p>
              L&apos;App rispetta le Google Play Developer Program Policies, incluse le specifiche
              policy in materia di dati sensibili (Sensitive Data Policy) e dati sanitari, ove
              applicabili.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              14. Modifiche alla presente informativa
            </h2>
            <p>
              Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi
              momento, anche in conseguenza di modifiche normative o di evoluzione dei servizi offerti.
            </p>
            <p>
              La versione aggiornata sarà pubblicata sui canali ufficiali del Titolare e, ove le
              modifiche siano sostanziali, l&apos;Utente sarà informato tramite l&apos;App o via email
              all&apos;indirizzo registrato. La data dell&apos;ultimo aggiornamento è sempre indicata in
              apertura del presente documento.
            </p>
            <p>
              L&apos;utilizzo continuato dell&apos;App successivamente alla pubblicazione della versione
              aggiornata costituisce presa visione della nuova informativa, fermo restando il diritto
              dell&apos;Utente di esercitare in qualsiasi momento i diritti di cui al §8 ove non
              concordi con le modifiche.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">15. Contatti</h2>
            <p>
              Per qualsiasi richiesta relativa al trattamento dei dati personali, incluse richieste di
              esercizio dei diritti di cui al §8:
            </p>
            <div className="rounded-lg border border-blue-dark/15 bg-white/60 p-5 space-y-2">
              <p className="font-bold">OsteoTouch S.r.l. — Mobilitas</p>
              <p>Sede legale: Via Peyron 54, 10143 Torino (TO), Italia</p>
              <p>C.F. / P.IVA: 13020400019</p>
              <p>
                PEC:{' '}
                <a
                  href="mailto:osteotouch@pec.it"
                  className="text-azure-dark underline underline-offset-2"
                >
                  osteotouch@pec.it
                </a>
              </p>
              <p>
                E-mail privacy:{' '}
                <a
                  href="mailto:studio@studiomobilitas.it"
                  className="text-azure-dark underline underline-offset-2"
                >
                  studio@studiomobilitas.it
                </a>{' '}
                <span className="text-blue-dark/70 text-sm">[INDIRIZZO DA ATTIVARE]</span>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">
              16. Legge applicabile e foro competente
            </h2>
            <p>
              La presente informativa e i trattamenti in essa descritti sono regolati dalla legge
              italiana e, ove applicabile, dal diritto dell&apos;Unione Europea.
            </p>
            <p>
              Per qualsiasi controversia relativa all&apos;interpretazione, validità, esecuzione o
              cessazione della presente informativa è competente in via esclusiva il{' '}
              <strong>Foro di Torino</strong>, fatti salvi i fori inderogabili previsti dalla legge in
              favore del consumatore e fatto salvo, in ogni caso, il diritto dell&apos;Interessato di
              adire l&apos;autorità giudiziaria ai sensi dell&apos;art. 79 GDPR presso il proprio luogo
              di residenza.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-dark pt-4">17. Disposizioni finali</h2>
            <p>
              L&apos;eventuale invalidità, illegittimità o inefficacia, totale o parziale, di una o più
              clausole della presente informativa non comporta l&apos;invalidità delle restanti
              clausole, che conserveranno piena efficacia.
            </p>
          </section>

          <footer className="pt-8 mt-8 border-t border-blue-dark/15 text-sm text-blue-dark/75 italic">
            <p>
              La presente informativa è redatta in lingua italiana, che costituisce l&apos;unica versione
              facente fede. Eventuali traduzioni sono fornite a solo titolo informativo. In caso di
              discrepanze tra la versione italiana e qualsiasi traduzione, prevale la versione
              italiana.
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default PrivacyPolicyApplicazione
