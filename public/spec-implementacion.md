# Especificación de implementación — Sacramentos, modalidad supletoria y registros

Documento de trabajo para agente CLI. Ejecutar en orden. Cada tarea tiene criterios de aceptación verificables.

---

## 0. Contexto del proyecto

Sitio web parroquial. **No hay backend, base de datos ni pasarela de pagos.** Las solicitudes se canalizan por WhatsApp; las constancias se entregan presencialmente.

```
Vite 6 + React 19 + TypeScript (strict)
Tailwind CSS 4 (config CSS-first en src/styles/theme.css)
vite-react-ssg          prerenderizado de rutas públicas
Sveltia CMS en /admin   contenido en /content, versionado en el repo
lucide-react            iconos de interfaz
src/icons/liturgicos    set litúrgico propio, ya existe
Despliegue: Cloudflare Pages
```

Tokens de color y tipografía ya definidos en `src/styles/theme.css`. **No inventar colores nuevos ni instalar librerías de UI adicionales.**

### Restricciones que no se negocian

1. **Nunca** publicar listados de folios, libros sacramentales ni PDF con nombres de personas. Ver tarea 5.
2. `oro-500` no cumple contraste AA sobre fondo claro. Para texto de acento usar `oro-600`. `oro-500` solo en filetes, bordes e iconos.
3. El oro aparece **una sola vez por pantalla**. Si ya hay un filete dorado en el hero, no poner otro acento dorado abajo.
4. La página de confesión no lleva analítica de eventos ni formularios.
5. Todo icono va acompañado de texto. Audiencia mayoritariamente adulta y mayor.
6. Cuerpo mínimo 17px, objetivos táctiles 44px, foco visible siempre.
7. Sin animación de entrada por sección. Solo opacidad, 300ms. Nada de fade-and-slide-up en cascada.

---

## Tarea 1 — Refactorizar `definiciones.ts` a índice por slug

**Archivo:** `src/features/sacramentos/config/definiciones.ts`

Hoy el registro está indexado por `TipoSacramento`. Eso impide tener dos rutas para el mismo sacramento. Cambiar a índice por slug con dos ejes: qué sacramento es canónicamente, y en qué modalidad se prepara.

```ts
export type TipoSacramento =
  | "BAUTIZO"
  | "PRIMERA_COMUNION"
  | "CONFIRMACION"
  | "MATRIMONIO"
  | "CONFESION"
  | "UNCION_ENFERMOS";

export type Modalidad = "ORDINARIA" | "SUPLETORIA";

export type ModoContacto = "WHATSAPP" | "URGENCIA" | "SIN_SOLICITUD";

export interface Requisito {
  id: string;
  label: string;
  nota?: string;
}

export interface DefinicionSacramento {
  slug: string;
  sacramento: TipoSacramento;
  modalidad: Modalidad;
  nombre: string;
  /** Frase de una línea para la tarjeta de la portada. */
  resumen: string;
  /** A quién va dirigido. Es lo que distingue ordinaria de supletoria. */
  publicoObjetivo: string;
  /** Párrafo de 2–4 frases: qué es el sacramento, en lenguaje llano. */
  descripcion: string;
  requisitos: Requisito[];
  modoContacto: ModoContacto;
  /** Cuánto antes conviene iniciar el trámite. Se muestra en la tarjeta. */
  anticipacion?: string;
  /** Slug de la modalidad relacionada, si existe. Bidireccional. */
  modalidadRelacionada?: string;
  /** Icono del set litúrgico. Debe existir en ICONOS_POR_SLUG. */
  icono: SlugIcono;
}

export const DEFINICIONES: Record<string, DefinicionSacramento> = { /* … */ };

/** Solo las modalidades ordinarias. Es lo que se muestra en la retícula. */
export const SACRAMENTOS_PRINCIPALES: DefinicionSacramento[] =
  Object.values(DEFINICIONES).filter((d) => d.modalidad === "ORDINARIA");

export function getDefinicion(slug: string): DefinicionSacramento | undefined;
```

### Entradas a crear

Siete entradas: las seis ordinarias más `primera-comunion-supletoria`.

```ts
"primera-comunion-supletoria": {
  slug: "primera-comunion-supletoria",
  sacramento: "PRIMERA_COMUNION",
  modalidad: "SUPLETORIA",
  nombre: "Primera comunión supletoria",
  resumen: "Para jóvenes y adultos que no la recibieron a su edad.",
  publicoObjetivo: "Jóvenes desde 15 años y adultos",
  descripcion:
    "Nunca es tarde. Si no hiciste tu primera comunión de niño, la parroquia " +
    "tiene una preparación pensada para tu edad, en grupo reducido y con " +
    "horario de fin de semana. Muchos vienen porque van a ser padrinos o " +
    "porque quieren casarse por la Iglesia; otros, simplemente, porque quieren.",
  requisitos: [
    { id: "fe-bautismo", label: "Fe de bautismo reciente",
      nota: "Si te bautizaron en otra parroquia, pídela allá. Si no sabes dónde, escríbenos." },
    { id: "dpi", label: "DPI o documento de identidad" },
    { id: "catequesis-supletoria", label: "Catequesis supletoria para adultos",
      nota: "Sesiones sabatinas, según el calendario del ciclo." },
  ],
  modoContacto: "WHATSAPP",
  anticipacion: "Inicia el trámite al abrir el ciclo",
  modalidadRelacionada: "primera-comunion",
  icono: "primera-comunion",
},
```

En `"primera-comunion"` añadir `modalidadRelacionada: "primera-comunion-supletoria"`.

`modoContacto` por entrada: `UNCION_ENFERMOS` → `"URGENCIA"`. `CONFESION` → `"SIN_SOLICITUD"`. El resto → `"WHATSAPP"`.

**Criterios de aceptación**
- `SACRAMENTOS_PRINCIPALES.length === 6`. La supletoria no aparece en la retícula.
- `Object.keys(DEFINICIONES).length === 7`.
- Todo `icono` existe como clave en `ICONOS_POR_SLUG`.
- `modalidadRelacionada` es bidireccional: si A apunta a B, B apunta a A. Añadir un test que lo verifique.
- Compila con `strict: true` sin `any`.

---

## Tarea 2 — Utilidades de WhatsApp

**Archivo:** `src/lib/whatsapp.ts`

El mensaje prellenado **es el formulario**. Si la secretaría recibe texto estructurado en vez de "hola quiero bautizar a mi hijo", el intercambio pasa de quince mensajes a tres.

```ts
const NUMERO = import.meta.env.VITE_WHATSAPP; // "502XXXXXXXX", sin + ni espacios

function construirEnlace(lineas: string[]): string {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(lineas.join("\n"))}`;
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
  ]);
}

/** Consulta de un registro sacramental. Ver tarea 5. */
export function enlaceConsultaRegistro(): string {
  return construirEnlace([
    `Buen día. Deseo consultar si mi registro está en esta parroquia.`,
    ``,
    `Sacramento (bautizo, confirmación, matrimonio):`,
    `Nombre completo de la persona:`,
    `Fecha aproximada (año):`,
    `Nombre del padre:`,
    `Nombre de la madre:`,
  ]);
}

/** Envío de comprobante de depósito. */
export function enlaceComprobante(): string;

/** Consulta general, sin plantilla. */
export function enlaceGeneral(mensaje?: string): string;
```

### Requisitos técnicos

- `VITE_WHATSAPP` en `.env.example` con comentario del formato esperado. **No hardcodear el número en ningún componente.**
- Validar en tiempo de arranque: si `VITE_WHATSAPP` falta o no es solo dígitos, lanzar error claro en desarrollo.
- Saltos de línea reales (`\n`) dentro de `encodeURIComponent`. No usar `%0A` manual.

### Componente `<BotonWhatsApp>`

**Archivo:** `src/components/ui/BotonWhatsApp.tsx`

```tsx
<a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primario">
  <IconoWhatsApp aria-hidden="true" />
  {etiqueta}
</a>
```

Reglas:
- Debajo del botón, **siempre** el teléfono como enlace `tel:` visible. Parte de la audiencia mayor no usa WhatsApp; si el único camino es WhatsApp, esas personas quedan fuera.
- Mostrar también el número en texto plano, seleccionable.
- Etiqueta en voz activa y específica: "Solicitar por WhatsApp", no "Contactar".
- El icono de WhatsApp no está en lucide. Añadir un SVG de marca en `src/icons/marcas.tsx`.

**Criterios de aceptación**
- El enlace generado abre WhatsApp con el texto correctamente decodificado, con saltos de línea, en móvil y en web.
- Buscar `wa.me` en `src/` devuelve resultados **solo** en `src/lib/whatsapp.ts`.
- Toda instancia de `<BotonWhatsApp>` renderiza el `tel:` de respaldo.

---

## Tarea 3 — Página genérica de sacramento

**Archivo:** `src/features/sacramentos/pages/SacramentoDetalle.tsx`
**Ruta:** `/sacramentos/:slug` — un solo componente sirve las siete rutas.

Resolver `useParams().slug` contra `getDefinicion()`. Si no existe, 404.

### Estructura

```
┌──────────────────────────────────────────────┐
│ Migas: Inicio · Sacramentos · [nombre]       │
├──────────────────────────────────────────────┤
│ [icono litúrgico 48px]                       │
│ Nombre del sacramento          ← Marcellus   │
│ Descripción en párrafo guía (20px)           │
│ Dirigido a: [publicoObjetivo]                │
├──────────────────────────────────────────────┤
│ Requisitos                                   │
│ Lista con marca de verificación por ítem,    │
│ nota en texto auxiliar bajo cada uno         │
│ [ Imprimir requisitos ]  ← window.print()    │
├──────────────────────────────────────────────┤
│ [Bloque de contacto según modoContacto]      │
├──────────────────────────────────────────────┤
│ [Bloque de modalidad relacionada, si existe] │
└──────────────────────────────────────────────┘
```

### Bloque de contacto, por `modoContacto`

**`WHATSAPP`** — `<BotonWhatsApp>` con `enlaceSolicitud(def)`, más `anticipacion` como texto auxiliar y el horario del despacho parroquial.

**`URGENCIA`** (unción de los enfermos) — **el bloque va arriba del todo, antes de la descripción.** Un familiar buscando sacerdote a las 2 a.m. no debe encontrarse primero con un párrafo explicativo.

```
Franja borgoña, ancho completo, dentro del flujo (no fija):

  Atención inmediata, a cualquier hora
  Si la persona está grave, llama directamente.
  [ Llamar al 0000-0000 ]        ← <a href="tel:"> como acción primaria
  Para unción comunitaria o enfermo crónico en casa,
  escríbenos por WhatsApp.       ← secundario, discreto
```

Esta página debe ser legible y funcional **sin JavaScript**: prerenderizada, sin depender de hidratación. Verificarlo desactivando JS en el navegador.

**`SIN_SOLICITUD`** (confesión) — sin formulario y sin botón de solicitud. Mostrar la tabla de horarios desde `/content/horarios.json` y un bloque discreto de acompañamiento:

```
¿Hace años que no te confiesas?
No necesitas cita ni avisar. Llega en el horario, y si no
recuerdas cómo se hace, díselo al sacerdote: él te acompaña.
[enlace: Guía breve para prepararte]
```

Sin analítica de eventos en esta ruta. Sin captura de datos de ninguna clase.

### Bloque de modalidad relacionada

Se renderiza solo si `def.modalidadRelacionada` existe. Es el punto de entrada a la supletoria: **no va como séptima tarjeta en la retícula**, porque la retícula comunica "estos son los sacramentos" y meter ahí una modalidad rompe esa lectura.

Tratamiento: panel `cal-100` con borde izquierdo de 2px en `borgona-600`, no una tarjeta más.

```
¿Eres adulto y no hiciste tu primera comunión?
Nunca es tarde. Hay una preparación pensada para tu edad,
en grupo reducido y con horario de fin de semana.
[ Ver primera comunión supletoria → ]
```

Redactar el texto desde `publicoObjetivo` de la definición relacionada, no hardcodeado por sacramento.

**Criterios de aceptación**
- Las siete rutas renderizan sin errores de consola.
- `/sacramentos/uncion-de-enfermos` con JavaScript desactivado muestra el teléfono y el enlace `tel:` funciona.
- `/sacramentos/confesion` no contiene ningún `<form>`, `<input>` ni llamada de analítica.
- El bloque de modalidad relacionada aparece en `primera-comunion` y en `primera-comunion-supletoria`, y en ningún otro.
- Jerarquía de encabezados correcta: un solo `<h1>`, sin saltos de nivel.
- `@media print` oculta cabecera, pie y botones; deja título y requisitos.

---

## Tarea 4 — Retícula de sacramentos

**Archivos:** `src/features/sacramentos/pages/SacramentosIndex.tsx` y el bloque de la portada.

Itera sobre `SACRAMENTOS_PRINCIPALES`. Seis tarjetas, 4/2/1 columnas según viewport.

Cada tarjeta usa la clase `.tarjeta-sacramento` de `theme.css`: icono litúrgico 32px, nombre, `resumen`, y `anticipacion` en texto auxiliar. Al pasar el cursor el icono pasa de `carbon-500` a `oro-500` y el borde inferior de `piedra-200` a `borgona-600`. **Sin elevación, sin escala, sin sombra.**

Toda la tarjeta es enlace: `<a>` envolviendo el contenido, con `:focus-visible` en el enlace, no en un hijo.

---

## Tarea 5 — Consulta de registros parroquiales

**Ruta:** `/registros`
**Archivo:** `src/features/registros/pages/Registros.tsx`

### Lo que NO se hace, y por qué

**No se publica ningún PDF con folios, nombres o datos de personas.** Un PDF en un sitio público lo indexa Google, se descarga completo de una vez y no se puede retirar: quedan copias en caché, en el índice y en los equipos de quien lo bajó. Un libro de bautismos contiene nombres completos, fechas de nacimiento y filiación de personas que hoy pueden ser menores de edad. Esa combinación es material de primera calidad para suplantación de identidad, ninguna diócesis lo aprobaría, y expone a la parroquia sin ganar nada que no se resuelva de otra forma.

Si en el repositorio aparece un PDF con listados de personas, **no lo publiques y avísalo.**

### Lo que sí se hace

La necesidad real es que alguien lejos sepa si su registro existe antes de viajar o iniciar un trámite. Se cubre con dos piezas.

**a) Índice de cobertura de libros.** Qué libros existen y qué años abarcan. Sin un solo nombre.

`/content/registros/libros.json`:

```json
{
  "actualizado": "2026-02-14",
  "libros": [
    { "tipo": "Bautismos",   "tomo": "I",   "desde": 1918, "hasta": 1954 },
    { "tipo": "Bautismos",   "tomo": "II",  "desde": 1954, "hasta": 1989 },
    { "tipo": "Matrimonios", "tomo": "III", "desde": 1980, "hasta": 2003 }
  ],
  "nota": "Los registros anteriores a 1918 se conservan en el archivo diocesano."
}
```

Render: tabla agrupada por tipo de sacramento, ordenada por año. Responsive: en móvil, tarjetas apiladas, no scroll horizontal. Esto resuelve el 80 % de la duda real —"¿mi registro puede estar aquí?"— sin exponer a nadie.

**b) Consulta asistida por WhatsApp.** `<BotonWhatsApp>` con `enlaceConsultaRegistro()`. La persona manda nombre, año aproximado y nombres de los padres; la secretaría busca en el libro físico y responde.

Texto de la página:

```
Consulta de registros

Si necesitas una fe de bautismo, de confirmación o de matrimonio,
escríbenos y buscamos en el libro. Danos el nombre completo, el año
aproximado y los nombres de los padres: con eso lo encontramos.

La constancia se entrega en la parroquia, en horario de despacho.

[ Consultar por WhatsApp ]
Teléfono: 0000-0000

────────────────────────────

Libros que conserva la parroquia
[tabla de cobertura]

Actualizado el 14 de febrero de 2026
```

**Criterios de aceptación**
- Ningún nombre de persona en `/content/registros/`.
- El JSON valida contra un schema de Zod al construir; si falla, el build falla.
- La página funciona con JS desactivado salvo el botón de WhatsApp.

---

## Tarea 6 — Configuración del CMS

**Archivo:** `public/admin/config.yml` (Sveltia CMS)

La secretaría debe poder subir PDF y editar contenido sin tocar código. Colecciones a definir:

| Colección | Archivo | Campos |
|---|---|---|
| Avisos | `content/avisos/*.md` | título, fecha, cuerpo, destacado (bool) |
| Horarios | `content/horarios.json` | misas, confesiones, despacho parroquial |
| Libros de registro | `content/registros/libros.json` | lista: tipo, tomo, desde, hasta |
| Documentos | `content/documentos/*.md` | título, descripción, archivo (PDF), categoría |
| Historia | `content/historia.md` | markdown enriquecido |

`media_folder: "public/documentos"`, `public_folder: "/documentos"`.

La colección **Documentos** es la que resuelve tu necesidad original de subir PDF, pero para material seguro: requisitos imprimibles por sacramento, calendario del ciclo de catequesis, informe económico anual, formularios en blanco. Todo lo que no contenga datos de personas.

Añadir a la descripción de la colección, visible en el editor:

```
No subas aquí documentos con nombres, DPI o datos de personas.
Los listados de folios y los libros sacramentales no se publican
en internet: las consultas se atienden por WhatsApp.
```

**Criterios de aceptación**
- `/admin` carga y permite editar las cinco colecciones.
- Guardar un aviso genera un commit y dispara el redespliegue.
- Los PDF subidos quedan en `public/documentos/` y son accesibles por URL.

---

## Tarea 7 — Verificación final

Antes de dar por terminado, ejecutar y reportar:

```bash
pnpm build            # sin errores ni warnings de TypeScript
pnpm exec tsc --noEmit
```

Comprobar manualmente:

- [ ] `curl` a `/sacramentos/bautizo` en el build devuelve HTML con el contenido, no un div vacío. Si no, el prerenderizado no está funcionando y las previsualizaciones de WhatsApp saldrán en blanco.
- [ ] Lighthouse en `/` y `/sacramentos/bautizo`: Accesibilidad ≥ 95.
- [ ] Con `prefers-reduced-motion: reduce` activo no hay ningún movimiento.
- [ ] Navegación completa por teclado con foco visible en todo momento.
- [ ] `grep -r "wa.me" src/` devuelve solo `src/lib/whatsapp.ts`.
- [ ] `grep -ri "folio" content/` no devuelve listados de personas.
- [ ] Ningún color fuera de los tokens de `theme.css`.

## Fuera de alcance

No implementar, aunque parezca natural: formularios de solicitud en línea, carga de documentos por el usuario, inscripción a catequesis, pasarela de pagos, panel administrativo propio, base de datos, servidor Node, búsqueda de registros por nombre. Si alguna tarea parece requerirlo, detente y pregunta.
