// I problemi delle landing (pageContext di BookingPopup) e come la pagina di conferma ne parla.
// ilTuo: "Capire meglio il tuo mal di schiena". per: "la tua richiesta per il mal di schiena".
// tags: tag dolore delle recensioni nel gestionale. parole: parole evidenziate nelle recensioni (un solo gruppo
// che cattura, serve a split; alla fine (?![\wàèéìòù]) e non \b, che non vede le lettere accentate: "acidità"); le recensioni che non ne contengono nessuna non vengono mostrate.
// Una landing che manca qui (o un arrivo senza form) usa testi e recensioni generici.
export const DOLORI = {
  cervicalgia: {
    ilTuo: 'il tuo dolore cervicale',
    per: 'per il dolore cervicale',
    tags: ['TAG_DOLORE_CERVICALGIA', 'TAG_DOLORE_CERVICOBRACHIALGIA'],
    // Collo e i disturbi che dal collo partono (spalle, braccio, testa, mandibola)
    parole:
      /\b(cervic\w*|torcicollo|collo|nuca|trapezi\w*|spall[ae]|scapol\w*|bracci[oa]|formicol\w*|vertigin\w*|giramenti di testa|capogir\w*|mal di testa|cefale\w*|emicrani\w*|mandibol\w*)(?![\wàèéìòù])/i,
  },
  reflusso: {
    ilTuo: 'il tuo reflusso',
    per: 'per il reflusso',
    tags: ['TAG_DOLORE_REFLUSSO', 'TAG_DOLORE_REFLUSSO_E_DIAFRAMMA'],
    parole: /\b(reflusso|acidit[\wà]*|bruciore|stomaco|gastrit\w*|digest\w*|digerire|diaframm\w*|esofag\w*|ernia iatale)(?![\wàèéìòù])/i,
  },
  vertigini: {
    ilTuo: 'le tue vertigini',
    per: 'per le vertigini',
    tags: ['TAG_DOLORE_VERTIGINI'],
    parole: /\b(vertigin\w*|giramenti di testa|capogir\w*|equilibrio|instabilit[\wà]*|sbandament\w*)(?![\wàèéìòù])/i,
  },
  bruxismo: {
    ilTuo: 'il tuo bruxismo',
    per: 'per il bruxismo',
    tags: ['TAG_DOLORE_BRUXISMO', 'TAG_DOLORE_ATM'],
    parole: /\b(bruxismo|mandibol\w*|mascell\w*|digrign\w*|denti|atm)(?![\wàèéìòù])/i,
  },
  'cicatrici-cesareo': {
    ilTuo: 'la tua cicatrice del cesareo',
    per: 'per la cicatrice del cesareo',
    tags: ['TAG_DOLORE_CICATRICI_CESAREO'],
    parole: /\b(cesareo|cicatric\w*|parto)(?![\wàèéìòù])/i,
  },
  'cicatrici-seno': {
    ilTuo: 'le tue cicatrici al seno',
    per: 'per le cicatrici al seno',
    tags: [],
    parole: /\b(cicatric\w*|seno|mastectomi\w*)(?![\wàèéìòù])/i,
  },
  'ciclo-doloroso': {
    ilTuo: 'il tuo ciclo doloroso',
    per: 'per il ciclo doloroso',
    tags: [],
    parole: /\b(ciclo|mestru\w*|dismenorre\w*)(?![\wàèéìòù])/i,
  },
  fibromialgia: {
    ilTuo: 'la tua fibromialgia',
    per: 'per la fibromialgia',
    tags: ['TAG_DOLORE_FIBROMIALGIA', 'TAG_DOLORE_AFFATICAMENTO_CRONICO'],
    parole: /\b(fibromialgi\w*|stanchezza|affaticament\w*|dolori diffusi)(?![\wàèéìòù])/i,
  },
  menopausa: {
    ilTuo: 'i tuoi disturbi della menopausa',
    per: 'per i disturbi della menopausa',
    tags: ['TAG_DOLORE_MENOPAUSA'],
    parole: /\b(menopausa|vampate|ormon\w*)(?![\wàèéìòù])/i,
  },
  maldischiena: {
    ilTuo: 'il tuo mal di schiena',
    per: 'per il mal di schiena',
    tags: ['TAG_DOLORE_MAL_DI_SCHIENA', 'TAG_DOLORE_LOMBALGIA', 'TAG_DOLORE_DORSALGIA', 'TAG_DOLORE_ERNIA_DEL_DISCO'],
    parole: /\b(schiena|lombar\w*|lombalgi\w*|dorsal\w*|ernia|sciatic\w*|colpo della strega)(?![\wàèéìòù])/i,
  },
  stitichezza: {
    ilTuo: 'la tua stitichezza',
    per: 'per la stitichezza',
    tags: ['TAG_DOLORE_STITICHEZZA', 'TAG_DOLORE_PROBLEMI_DIGESTIVI'],
    parole: /\b(stitichezza|intestin\w*|pancia|addom\w*|evacu\w*|digest\w*|gonfi\w*)(?![\wàèéìòù])/i,
  },
  'gonfiore-addominale': {
    ilTuo: 'la tua pancia gonfia',
    per: 'per la pancia gonfia',
    tags: ['TAG_DOLORE_GONFIORE_ADDOMINALE', 'TAG_DOLORE_PROBLEMI_DIGESTIVI', 'TAG_DOLORE_STITICHEZZA'],
    parole: /\b(gonfi\w*|pancia|addom\w*|intestin\w*|digest\w*|colon)(?![\wàèéìòù])/i,
  },
  'tunnel-carpale': {
    ilTuo: 'il tuo tunnel carpale',
    per: 'per il tunnel carpale',
    tags: ['TAG_DOLORE_TUNNEL_CARPALE'],
    parole: /\b(tunnel carpale|polso|mano|mani|formicol\w*|dita)(?![\wàèéìòù])/i,
  },
  epicondilite: {
    ilTuo: 'la tua epicondilite',
    per: "per l'epicondilite",
    tags: ['TAG_DOLORE_EPICONDILITE'],
    parole: /\b(epicondil\w*|gomito|avambracci\w*|braccio|tennis)(?![\wàèéìòù])/i,
  },
  'colon-irritabile': {
    ilTuo: 'il tuo colon irritabile',
    per: 'per il colon irritabile',
    tags: ['TAG_DOLORE_COLON_IRRITABILE', 'TAG_DOLORE_PROBLEMI_DIGESTIVI', 'TAG_DOLORE_GONFIORE_ADDOMINALE'],
    parole: /\b(colon|intestin\w*|pancia|addom\w*|gonfi\w*|digest\w*)(?![\wàèéìòù])/i,
  },
  emicrania: {
    ilTuo: 'la tua emicrania',
    per: "per l'emicrania",
    tags: ['TAG_DOLORE_EMICRANIA', 'TAG_DOLORE_CEFALEA'],
    parole: /\b(emicrani\w*|mal di testa|cefale\w*)(?![\wàèéìòù])/i,
  },
  sciatalgia: {
    ilTuo: 'la tua sciatica',
    per: 'per la sciatica',
    tags: ['TAG_DOLORE_SCIATALGIA', 'TAG_DOLORE_ERNIA_DEL_DISCO', 'TAG_DOLORE_LOMBALGIA'],
    parole: /\b(sciatic\w*|sciatalgi\w*|gamba|schiena|lombar\w*|ernia|nervo)(?![\wàèéìòù])/i,
  },
}

// Recensioni "a caso" quando non sappiamo da dove arriva la persona: i dolori con più recensioni, mescolate
export const TAG_RECENSIONI_GENERICHE = [
  'TAG_DOLORE_CERVICALGIA',
  'TAG_DOLORE_REFLUSSO',
  'TAG_DOLORE_ACUFENI',
  'TAG_DOLORE_MAL_DI_SCHIENA',
  'TAG_DOLORE_STITICHEZZA',
  'TAG_DOLORE_CEFALEA',
  'TAG_DOLORE_VERTIGINI',
  'TAG_DOLORE_LOMBALGIA',
  'TAG_DOLORE_ATM',
  'TAG_DOLORE_POSTURA',
]

// Parole evidenziate nelle recensioni "a caso" (origine sconosciuta, o dolore con poche recensioni):
// dolori, zone del corpo e disturbi. Niente parole che compaiono anche nei complimenti ("mani", "male").
export const PAROLE_GENERICHE =
  /\b(dolor[ei]|doloros\w*|cervic\w*|collo|torcicollo|schiena|lombar\w*|lombalgi\w*|sciatic\w*|ernia|spall[ae]|ginocchi[oa]|caviglia|anca|reflusso|stomaco|digest\w*|intestin\w*|stitichezza|gonfiore|vertigin\w*|mal di testa|cefale\w*|emicrani\w*|mandibol\w*|bruxismo|acufen\w*|postura|contrattur\w*|tension[ei]|rigidit[\wà]*|bloccat[oa])(?![\wàèéìòù])/i

// "su" + articolo: "lavorare sul tuo reflusso", "sulla tua sciatica", "sulle tue vertigini", "sui tuoi disturbi"
const ARTICOLATE = [['il tuo ', 'sul tuo '], ['la tua ', 'sulla tua '], ['le tue ', 'sulle tue '], ['i tuoi ', 'sui tuoi ']]
const sulTuo = (ilTuo) => {
  const [da, a] = ARTICOLATE.find(([art]) => ilTuo.startsWith(art)) ?? ['', 'su ']
  return a + ilTuo.slice(da.length)
}

export const doloreDi = (pageContext) => {
  const d = DOLORI[pageContext]
  return d ? { ...d, sulTuo: sulTuo(d.ilTuo) } : null
}
