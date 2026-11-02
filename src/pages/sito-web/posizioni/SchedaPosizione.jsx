import React from 'react'

// Scheda di una posizione lavorativa: stesso aspetto delle altre pagine in /posizioni,
// ma i contenuti arrivano come dati, così ogni nuova posizione è solo un file di testo.

const ICONS = {
  descrizione:
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  requisiti:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
  graditi: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  attivita:
    'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  carriera: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  iter:
    'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  candidati: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
}

const Icon = ({ path, bg, color }) => (
  <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center mr-4`}>
    <svg className={`w-6 h-6 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  </div>
)

const Card = ({ icon, iconBg, iconColor, title, children, className = 'bg-cream border-gray-100' }) => (
  <section className="mb-16">
    <div className={`${className} rounded-2xl p-8 shadow-lg border`}>
      <div className="flex items-center mb-6">
        <Icon path={icon} bg={iconBg} color={iconColor} />
        <h2 className="text-3xl font-bold text-blue-dark font-montserrat">{title}</h2>
      </div>
      {children}
    </div>
  </section>
)

// Ogni voce è [parte in grassetto, resto della frase]
const Bullets = ({ items, dot }) => (
  <div className="space-y-4">
    {items.map(([bold, rest]) => (
      <div key={bold} className="flex items-start space-x-3">
        <div className={`w-2 h-2 ${dot} rounded-full mt-3 flex-shrink-0`}></div>
        <p className="text-gray-700 font-montserrat leading-relaxed mt-0">
          <strong className="text-blue-dark">{bold}</strong>
          {rest ? ` ${rest}` : ''}
        </p>
      </div>
    ))}
  </div>
)

const SchedaPosizione = ({
  titolo,
  immagine,
  tipo,
  luogo,
  descrizione,
  requisiti,
  graditi,
  attivita,
  carriera,
  iter,
  documenti,
}) => (
  <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-cream pt-20 pb-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6">
            <img
              src={immagine}
              alt={titolo}
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-sky-100"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-dark font-montserrat mb-4">{titolo}</h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600 font-montserrat">
            <span className="bg-sky-100 px-3 py-1 rounded-full text-sm">{tipo}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{luogo}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card icon={ICONS.descrizione} iconBg="bg-sky-100" iconColor="text-sky-600" title="Descrizione della posizione lavorativa">
        <div className="prose prose-lg max-w-none">
          {descrizione.map((p, i) => (
            <p key={i} className="text-gray-700 font-montserrat leading-relaxed mb-4 mt-0">
              {p}
            </p>
          ))}
        </div>
      </Card>

      <Card icon={ICONS.requisiti} iconBg="bg-red-100" iconColor="text-red-600" title="Requisiti obbligatori">
        <Bullets items={requisiti} dot="bg-red-500" />
      </Card>

      {graditi?.length > 0 && (
        <Card icon={ICONS.graditi} iconBg="bg-green-100" iconColor="text-green-600" title="Requisiti aggiuntivi graditi">
          <Bullets items={graditi} dot="bg-green-500" />
        </Card>
      )}

      <Card icon={ICONS.attivita} iconBg="bg-orange-100" iconColor="text-orange-600" title="Attività principali">
        <Bullets items={attivita} dot="bg-orange-500" />
      </Card>

      <Card icon={ICONS.carriera} iconBg="bg-blue-100" iconColor="text-blue-600" title="Possibilità di carriera">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-200">
            <h3 className="text-xl font-bold text-blue-dark font-montserrat mb-3 mt-0">🚀 {carriera.titolo}</h3>
            <p className="text-gray-700 font-montserrat leading-relaxed mt-0">{carriera.testo}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cream border border-gray-200 p-6 rounded-xl">
              <h4 className="text-lg font-bold text-blue-dark font-montserrat mb-3 mt-0">📈 Percorsi di sviluppo</h4>
              <ul className="space-y-2 text-gray-700 font-montserrat">
                {carriera.percorsi.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="bg-cream border border-gray-200 p-6 rounded-xl">
              <h4 className="text-lg font-bold text-blue-dark font-montserrat mb-3 mt-0">💼 Competenze da sviluppare</h4>
              <ul className="space-y-2 text-gray-700 font-montserrat">
                {carriera.competenze.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold text-blue-dark font-montserrat mb-3 mt-0">
              🎯 Opportunità gestionali e/o imprenditoriali
            </h3>
            <p className="text-gray-700 font-montserrat leading-relaxed mt-0">
              Per i collaboratori più meritevoli, Mobilitas offre la possibilità di accedere a ruoli gestionali e
              direzionali, entrare in società e/o sviluppare progetti imprenditoriali insieme, con accesso a know-how,
              risorse umane qualificate e capitali per realizzare le idee.
            </p>
          </div>
        </div>
      </Card>

      <Card icon={ICONS.iter} iconBg="bg-purple-100" iconColor="text-purple-600" title="Iter di selezione">
        <div className="mb-6">
          <p className="text-gray-700 font-montserrat leading-relaxed text-lg">
            Il processo di selezione si articolerà in <strong className="text-blue-dark">{iter.length} fasi</strong>:
          </p>
        </div>
        <div className="space-y-6">
          {iter.map(([titoloFase, testo], i) => (
            <div key={titoloFase} className="flex items-start space-x-4">
              <div
                className={`w-8 h-8 ${i === iter.length - 1 ? 'bg-green-600' : 'bg-sky-600'} text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1`}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-dark font-montserrat mb-2 mt-0">{titoloFase}</h3>
                <p className="text-gray-700 font-montserrat leading-relaxed mt-0">{testo}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        icon={ICONS.candidati}
        iconBg="bg-sky-600"
        iconColor="text-white"
        title="Come candidarti"
        className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200"
      >
        <div className="space-y-6">
          <div className="bg-cream p-6 rounded-xl border border-sky-200">
            <h3 className="text-xl font-bold text-blue-dark font-montserrat mb-4 mt-0">📧 Modalità di invio</h3>
            <div className="space-y-3">
              <p className="text-gray-700 font-montserrat mt-0">
                <strong>Email:</strong>
                <a href="mailto:colloqui@studiomobilitas.it" className="text-sky-600 hover:text-sky-700 ml-2">
                  colloqui@studiomobilitas.it
                </a>
              </p>
              <p className="text-gray-700 font-montserrat mt-0">Inviaci il tuo CV e i documenti richiesti</p>
              <p className="text-gray-700 font-montserrat mt-0">
                <strong>Oggetto:</strong> Candidatura {titolo} - [Nome Cognome]
              </p>
            </div>
          </div>
          <div className="bg-cream p-6 rounded-xl border border-sky-200">
            <h3 className="text-xl font-bold text-blue-dark font-montserrat mb-4 mt-0">📋 Documenti richiesti</h3>
            <ul className="space-y-2 text-gray-700 font-montserrat">
              {documenti.map(([bold, rest]) => (
                <li key={bold}>
                  <strong>{bold}</strong>
                  {rest ? ` ${rest}` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  </div>
)

export default SchedaPosizione
