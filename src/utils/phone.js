// Prefissi internazionali riconosciuti. Servono perché il prefisso ha lunghezza variabile
// (1-3 cifre) e senza un elenco non si sa dove finisce: "+393331234567" va letto come +39 / 3331234567.
const PREFISSI = [
  '39', '41', '33', '49', '44', '34', '43', '32', '31', '30', '40', '48', '36', '45', '46', '47', '351', '352', '353', '355',
  '356', '358', '359', '370', '371', '372', '373', '374', '375', '376', '377', '378', '380', '381', '382', '383', '385', '386',
  '387', '389', '420', '421', '423', '7', '1', '20', '212', '213', '216', '27', '52', '54', '55', '57', '61', '86', '90', '91',
  '92', '971',
].sort((a, b) => b.length - a.length)

/** Divide un numero di cellulare in prefisso (es. +39) e numero solo cifre, per l'API richieste. */
export function parseCellulare(raw) {
  const s = String(raw || '').trim().replace(/[\s\-.()/]/g, '')
  if (!s) return { prefissoCellulare: '+39', cellulare: '' }

  const international = s.startsWith('+') || s.startsWith('00')
  const digits = s.replace(/\D/g, '').replace(/^00/, '')

  if (international) {
    const pref = PREFISSI.find((p) => digits.startsWith(p))
    if (pref) return { prefissoCellulare: `+${pref}`, cellulare: digits.slice(pref.length) }
    // Prefisso sconosciuto: ipotizza 2 cifre (il caso più comune in Europa)
    return { prefissoCellulare: `+${digits.slice(0, 2)}`, cellulare: digits.slice(2) }
  }

  return { prefissoCellulare: '+39', cellulare: digits }
}
