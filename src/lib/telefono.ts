/**
 * Teléfono del despacho parroquial. Sale de `VITE_TELEFONO` (solo dígitos).
 * Parte de la audiencia mayor no usa WhatsApp: el `tel:` siempre debe estar presente.
 */
const CRUDO: string = import.meta.env.VITE_TELEFONO ?? ''

if (import.meta.env.MODE !== 'test' && !/^\d{8,15}$/.test(CRUDO)) {
  throw new Error(
    'VITE_TELEFONO no está configurado o no es válido. Debe ser solo dígitos, p. ej. "50255551234".',
  )
}

/** Número en crudo, para `href="tel:"`. Con prefijo internacional. */
export const TELEFONO_TEL = `+${CRUDO}`

/**
 * Formato legible para Guatemala: los últimos 8 dígitos como `0000-0000`.
 * Si trae código de país (502) se antepone.
 */
export function formatearTelefono(digitos: string = CRUDO): string {
  const local = digitos.length > 8 ? digitos.slice(-8) : digitos
  const pais = digitos.length > 8 ? digitos.slice(0, digitos.length - 8) : ''
  const bonito = local.replace(/(\d{4})(\d{4})/, '$1-$2')
  return pais ? `+${pais} ${bonito}` : bonito
}

/** Número ya formateado para mostrar como texto plano seleccionable. */
export const TELEFONO_TEXTO = formatearTelefono()
