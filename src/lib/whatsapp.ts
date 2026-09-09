import type { DefinicionSacramento } from '../features/sacramentos/config/definiciones'

/**
 * Único lugar del proyecto donde aparece `wa.me` (criterio de la tarea 2 / tarea 7).
 * El mensaje prellenado ES el formulario: si la secretaría recibe texto estructurado,
 * el intercambio pasa de quince mensajes a tres.
 *
 * El número nunca se escribe en un componente: sale de `VITE_WHATSAPP`.
 */
const NUMERO: string = import.meta.env.VITE_WHATSAPP ?? ''

// Validación en tiempo de arranque. Falla el arranque (dev) y el build si el número
// falta o no es solo dígitos. En los tests se inyecta un número válido.
if (import.meta.env.MODE !== 'test' && !/^\d{8,15}$/.test(NUMERO)) {
  throw new Error(
    'VITE_WHATSAPP no está configurado o no es válido. ' +
      'Debe ser solo dígitos con código de país, p. ej. "50255555555" (sin "+" ni espacios). ' +
      'Copia .env.example a .env y complétalo.',
  )
}

function construirEnlace(lineas: string[]): string {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(lineas.join('\n'))}`
}

/** Solicitud de un sacramento. Incluye el checklist de requisitos. */
export function enlaceSolicitud(def: DefinicionSacramento): string {
  return construirEnlace([
    `Buen día. Deseo solicitar ${def.nombre}.`,
    ``,
    `Nombre del solicitante:`,
    `Teléfono:`,
    ``,
    `Requisitos que ya tengo:`,
    ...def.requisitos.map((r) => `- ${r.label}:`),
  ])
}

/** Consulta de un registro sacramental. Ver tarea 5. */
export function enlaceConsultaRegistro(sacramento?: string): string {
  return construirEnlace([
    `Buen día. Deseo consultar o solicitar una constancia / fe de ${sacramento ?? 'sacramento'} en esta parroquia.`,
    ``,
    `Sacramento: ${sacramento ?? '(bautizo, confirmación, matrimonio)'}`,
    `Nombre completo de la persona:`,
    `Fecha aproximada o año:`,
    `Nombre del padre:`,
    `Nombre de la madre:`,
  ])
}

/** Solicitud directa de constancia para un sacramento específico. */
export function enlaceSolicitudConstancia(nombreSacramento: string): string {
  return construirEnlace([
    `Buen día. Deseo solicitar una constancia / fe de ${nombreSacramento}.`,
    ``,
    `Nombre completo de la persona registrada:`,
    `Año aproximado del sacramento:`,
    `Nombre del padre:`,
    `Nombre de la madre:`,
    `Teléfono de contacto:`,
  ])
}

/** Envío de comprobante de depósito. */
export function enlaceComprobante(): string {
  return construirEnlace([
    `Buen día. Adjunto el comprobante del depósito.`,
    ``,
    `Concepto (por qué es el pago):`,
    `Nombre de quien deposita:`,
    `Fecha del depósito:`,
  ])
}

/** Consulta general, sin plantilla. */
export function enlaceGeneral(mensaje?: string): string {
  return construirEnlace(mensaje ? [mensaje] : [`Buen día. Deseo hacer una consulta.`])
}
