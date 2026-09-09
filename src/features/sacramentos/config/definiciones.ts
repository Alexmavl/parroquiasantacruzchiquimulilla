import type { SlugIcono } from '../../../icons/liturgicos/iconos'

export type TipoSacramento =
  | 'BAUTIZO'
  | 'PRIMERA_COMUNION'
  | 'CONFIRMACION'
  | 'MATRIMONIO'
  | 'CONFESION'
  | 'UNCION_ENFERMOS'

export type Modalidad = 'ORDINARIA' | 'SUPLETORIA'

export type ModoContacto = 'WHATSAPP' | 'URGENCIA' | 'SIN_SOLICITUD'

export interface Requisito {
  id: string
  label: string
  nota?: string
}

export interface DefinicionSacramento {
  slug: string
  sacramento: TipoSacramento
  modalidad: Modalidad
  nombre: string
  /** Frase de una línea para la tarjeta de la portada. */
  resumen: string
  /** A quién va dirigido. Es lo que distingue ordinaria de supletoria. */
  publicoObjetivo: string
  /** Párrafo de 2–4 frases: qué es el sacramento, en lenguaje llano. */
  descripcion: string
  requisitos: Requisito[]
  modoContacto: ModoContacto
  /** Cuánto antes conviene iniciar el trámite. Se muestra en la tarjeta. */
  anticipacion?: string
  /** Slug de la modalidad relacionada, si existe. Bidireccional. */
  modalidadRelacionada?: string
  /** Icono del set litúrgico. Debe existir en ICONOS_POR_SLUG. */
  icono: SlugIcono
}

export const DEFINICIONES: Record<string, DefinicionSacramento> = {
  bautizo: {
    slug: 'bautizo',
    sacramento: 'BAUTIZO',
    modalidad: 'ORDINARIA',
    nombre: 'Bautizo',
    resumen: 'El primer sacramento. La entrada a la vida cristiana.',
    publicoObjetivo: 'Niños y niñas, acompañados de sus padres y padrinos',
    descripcion:
      'El bautizo es el primer sacramento: con él la persona entra a formar parte de la ' +
      'Iglesia. En la parroquia se celebra de forma comunitaria en fechas fijas del mes. ' +
      'Antes hay una plática de preparación para los papás y los padrinos, que se coordina ' +
      'al presentar los documentos.',
    requisitos: [
      { id: 'partida-nacimiento', label: 'Certificación de nacimiento del RENAP del niño o niña' },
      { id: 'dpi-padres', label: 'DPI de los padres' },
      {
        id: 'dpi-padrinos',
        label: 'DPI de los padrinos',
        nota: 'Los padrinos deben estar bautizados y confirmados. Si están casados, por la Iglesia.',
      },
      {
        id: 'platica',
        label: 'Plática de preparación para padres y padrinos',
        nota: 'Se agenda al entregar los documentos en el despacho parroquial.',
      },
    ],
    modoContacto: 'WHATSAPP',
    anticipacion: 'Presenta los documentos al menos un mes antes de la fecha deseada',
    icono: 'bautizo',
  },

  'primera-comunion': {
    slug: 'primera-comunion',
    sacramento: 'PRIMERA_COMUNION',
    modalidad: 'ORDINARIA',
    nombre: 'Primera comunión',
    resumen: 'Cuando el niño recibe la Eucaristía por primera vez.',
    publicoObjetivo: 'Niños y niñas desde los 8 años, ya bautizados',
    descripcion:
      'En la primera comunión el niño recibe por primera vez la Eucaristía. La preparación ' +
      'es la catequesis parroquial: dos años de sesiones semanales, normalmente los fines de ' +
      'semana. Se inscribe al abrir el ciclo, junto con el resto del grupo de la parroquia.',
    requisitos: [
      {
        id: 'fe-bautismo',
        label: 'Fe de bautismo del niño',
        nota: 'Si lo bautizaron en otra parroquia, pídela allá.',
      },
      { id: 'dpi-responsable', label: 'DPI del padre, madre o encargado' },
      {
        id: 'catequesis',
        label: 'Catequesis de dos años',
        nota: 'Sesiones semanales según el calendario del ciclo.',
      },
    ],
    modoContacto: 'WHATSAPP',
    anticipacion: 'Inscribe al niño al abrir el ciclo de catequesis',
    modalidadRelacionada: 'primera-comunion-supletoria',
    icono: 'primera-comunion',
  },

  confirmacion: {
    slug: 'confirmacion',
    sacramento: 'CONFIRMACION',
    modalidad: 'ORDINARIA',
    nombre: 'Confirmación',
    resumen: 'Completa la iniciación cristiana en la fe.',
    publicoObjetivo: 'Jóvenes desde los 14 años y adultos que ya hicieron la primera comunión',
    descripcion:
      'La confirmación completa lo que empezó en el bautizo: es el momento en que la persona ' +
      'confirma por su propia decisión la fe en la que fue bautizada. Tiene una preparación ' +
      'propia, con encuentros de grupo durante el año. El obispo viene a la parroquia a ' +
      'administrarla en la fecha que se anuncia.',
    requisitos: [
      { id: 'fe-bautismo', label: 'Fe de bautismo' },
      { id: 'constancia-comunion', label: 'Constancia de primera comunión' },
      { id: 'dpi', label: 'DPI o certificación de nacimiento del RENAP' },
      {
        id: 'dpi-padrino',
        label: 'DPI del padrino o madrina',
        nota: 'Confirmado y, si está casado, por la Iglesia.',
      },
      { id: 'preparacion', label: 'Preparación de confirmación durante el ciclo' },
    ],
    modoContacto: 'WHATSAPP',
    anticipacion: 'Inscríbete al abrir el ciclo de preparación',
    icono: 'confirmacion',
  },

  matrimonio: {
    slug: 'matrimonio',
    sacramento: 'MATRIMONIO',
    modalidad: 'ORDINARIA',
    nombre: 'Matrimonio',
    resumen: 'La unión de un hombre y una mujer bendecida por la Iglesia.',
    publicoObjetivo: 'Parejas que se van a casar por la Iglesia',
    descripcion:
      'El matrimonio por la Iglesia requiere un trámite que lleva su tiempo: hay que hacer ' +
      'el expediente matrimonial, el curso prematrimonial y reservar la fecha. Conviene ' +
      'empezar con varios meses de anticipación para que todo salga con calma.',
    requisitos: [
      { id: 'fe-bautismo-ambos', label: 'Fe de bautismo reciente de los dos', nota: 'Emitida en los últimos seis meses.' },
      { id: 'fe-confirmacion', label: 'Constancia de confirmación de los dos' },
      { id: 'dpi-ambos', label: 'DPI de los contrayentes' },
      { id: 'curso', label: 'Curso prematrimonial' },
      {
        id: 'testigos',
        label: 'Datos y DPI de dos testigos',
        nota: 'Personas que los conozcan y puedan declarar que son libres para casarse.',
      },
    ],
    modoContacto: 'WHATSAPP',
    anticipacion: 'Inicia el expediente al menos tres meses antes de la boda',
    icono: 'matrimonio',
  },

  confesion: {
    slug: 'confesion',
    sacramento: 'CONFESION',
    modalidad: 'ORDINARIA',
    nombre: 'Confesión',
    resumen: 'El encuentro con la misericordia de Dios. Sin cita.',
    publicoObjetivo: 'Cualquier persona bautizada',
    descripcion:
      'La confesión, o reconciliación, es el sacramento del perdón. No hace falta pedir cita ' +
      'ni avisar: el sacerdote confiesa en los horarios señalados y también un rato antes de ' +
      'cada misa. Si hace mucho que no te confiesas, díselo al sacerdote y él te acompaña.',
    requisitos: [],
    modoContacto: 'SIN_SOLICITUD',
    icono: 'confesion',
  },

  'uncion-de-enfermos': {
    slug: 'uncion-de-enfermos',
    sacramento: 'UNCION_ENFERMOS',
    modalidad: 'ORDINARIA',
    nombre: 'Unción de los enfermos',
    resumen: 'Para quien está grave, enfermo de gravedad o mayor. A cualquier hora.',
    publicoObjetivo: 'Personas enfermas de gravedad, mayores o antes de una operación',
    descripcion:
      'La unción de los enfermos lleva la fuerza y la paz de Dios a quien está pasando por ' +
      'una enfermedad grave, a la persona mayor debilitada o a quien va a ser operado. Si ' +
      'alguien está en peligro, no hay que esperar: se llama al sacerdote a cualquier hora. ' +
      'También se organiza la unción en casa para enfermos que no pueden salir.',
    requisitos: [
      {
        id: 'datos',
        label: 'Nombre de la persona y dirección donde se encuentra',
      },
      {
        id: 'estado',
        label: 'Una idea de su estado',
        nota: 'Para saber si hay que ir de inmediato o se puede agendar la visita.',
      },
    ],
    modoContacto: 'URGENCIA',
    anticipacion: 'No esperes: si la persona está grave, llama de una vez',
    icono: 'uncion',
  },

  'primera-comunion-supletoria': {
    slug: 'primera-comunion-supletoria',
    sacramento: 'PRIMERA_COMUNION',
    modalidad: 'SUPLETORIA',
    nombre: 'Primera comunión supletoria',
    resumen: 'Para jóvenes y adultos que no la recibieron a su edad.',
    publicoObjetivo: 'Jóvenes desde 15 años y adultos',
    descripcion:
      'Nunca es tarde. Si no hiciste tu primera comunión de niño, la parroquia ' +
      'tiene una preparación pensada para tu edad, en grupo reducido y con ' +
      'horario de fin de semana. Muchos vienen porque van a ser padrinos o ' +
      'porque quieren casarse por la Iglesia; otros, simplemente, porque quieren.',
    requisitos: [
      {
        id: 'fe-bautismo',
        label: 'Fe de bautismo reciente',
        nota: 'Si te bautizaron en otra parroquia, pídela allá. Si no sabes dónde, escríbenos.',
      },
      { id: 'dpi', label: 'DPI o documento de identidad' },
      {
        id: 'catequesis-supletoria',
        label: 'Catequesis supletoria para adultos',
        nota: 'Sesiones sabatinas, según el calendario del ciclo.',
      },
    ],
    modoContacto: 'WHATSAPP',
    anticipacion: 'Inicia el trámite al abrir el ciclo',
    modalidadRelacionada: 'primera-comunion',
    icono: 'primera-comunion',
  },
}

/** Solo las modalidades ordinarias. Es lo que se muestra en la retícula. */
export const SACRAMENTOS_PRINCIPALES: DefinicionSacramento[] = Object.values(DEFINICIONES).filter(
  (d) => d.modalidad === 'ORDINARIA',
)

export function getDefinicion(slug: string): DefinicionSacramento | undefined {
  return DEFINICIONES[slug]
}
