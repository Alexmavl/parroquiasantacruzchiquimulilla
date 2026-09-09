# Parroquia Santa Cruz · Chiquimulilla

Sitio web parroquial. **Sin backend, sin base de datos, sin pasarela de pagos.** Las
solicitudes se canalizan por WhatsApp; las constancias se entregan presencialmente.

Especificación funcional: [`public/spec-implementacion.md`](public/spec-implementacion.md).
Paleta e iconos: [`public/preview-iconos.html`](public/preview-iconos.html).

## Stack

| Pieza | Uso |
| --- | --- |
| Vite 8 + React 19 + TypeScript (strict) | base |
| Tailwind CSS 4 (config CSS-first en `src/styles/theme.css`) | estilos y tokens |
| `vite-react-ssg` + `react-router-dom` 6 | prerenderizado de las rutas públicas |
| Sveltia CMS en `/admin` | edición de contenido (commits a `/content`) |
| `lucide-react` | iconos de interfaz |
| `src/icons/liturgicos` | set litúrgico propio (8 iconos) |
| `zod` | validación del contenido en tiempo de build |
| Vitest | tests |
| Cloudflare Pages | despliegue |

## Puesta en marcha

```bash
pnpm install
cp .env.example .env      # completa VITE_WHATSAPP y VITE_TELEFONO
pnpm dev
```

`pnpm dev` sirve con SSR (igual que producción). Si el arranque falla pidiendo
`VITE_WHATSAPP` / `VITE_TELEFONO`, es que falta el `.env`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | servidor de desarrollo |
| `pnpm build` | valida `/content` y genera el sitio estático en `dist/` |
| `pnpm preview` | sirve `dist/` |
| `pnpm test` | tests (Vitest) |
| `pnpm typecheck` | `tsc -b --noEmit` |
| `pnpm lint` | oxlint |
| `pnpm validar-contenido` | valida los JSON de `/content` contra los esquemas de Zod |

## Estructura

```
content/                 contenido editable (lo escribe el CMS)
  avisos/*.md
  horarios.json
  registros/libros.json   cobertura de libros — SIN nombres de personas
  documentos/             PDF seguros (requisitos, calendario, informe…)
  comunidades/*.md        templos de las comunidades (foto, descripción, mapa)
  parroquia.json          dirección, mapa, foto y redes de la portada
  historia.md
public/admin/            Sveltia CMS (config.yml)
public/imagenes/         fotos subidas por el CMS
src/
  styles/theme.css       tokens de color y tipografía + componentes
  icons/liturgicos/      set litúrgico propio
  icons/marcas.tsx       icono de marca de WhatsApp
  lib/whatsapp.ts        ÚNICO lugar donde se construyen enlaces wa.me
  lib/telefono.ts        teléfono del despacho (tel: + texto)
  lib/frontmatter.ts     parser de frontmatter sin dependencias
  lib/schemas.ts         esquemas Zod del contenido
  lib/content.ts         contenido tipado para las páginas
  components/Ubicacion.tsx  dirección + mapa + "cómo llegar" (parroquia y comunidades)
  features/sacramentos/  definiciones + páginas de sacramento
  features/comunidades/  templos de las comunidades
  features/registros/    consulta de registros
  components/            layout, ui y bloques
```

## Contenido

- **Nunca** se publican listados de folios, libros sacramentales ni PDF con nombres de
  personas (spec §0.1). El validador de build falla si aparece la palabra «folio» o un
  PDF en `content/registros/`.
- La consulta de registros se resuelve con el índice de cobertura (`libros.json`) más una
  consulta asistida por WhatsApp.

### Portada: historia, foto y mapa (`content/parroquia.json`)

La sección "La parroquia" y "Dónde estamos" de la portada salen de `content/parroquia.json`
(editable en `/admin`). Todo es opcional: lo que esté vacío no se muestra.

| Campo | Para qué | Cómo obtenerlo |
| --- | --- | --- |
| `direccion` | Texto de la dirección (portada y pie) | — |
| `mapaEmbedUrl` | Mapa incrustado | Google Maps → *Compartir → Insertar un mapa* → copia solo la URL de `src="…"`. **Gratis, sin API key.** |
| `latitud` / `longitud` | Botón directo "Cómo llegar" (Google Maps / Waze) | Google Maps → clic derecho sobre el templo → copia los dos números |
| `facebook` | Enlace a la página de Facebook | — |
| `foto` / `fotoPie` | Foto del templo en la portada | Subir por el CMS (va a `public/imagenes/`) o poner una en `public/imagenes/` y la ruta `/imagenes/archivo.jpg` |

Los botones "Cómo llegar" son enlaces normales (`maps.google.com`, `waze.com`): abren la app
del celular si está instalada, sin costo ni SDK. El texto largo de la historia está en
`content/historia.md`; la portada muestra su primer párrafo.

### Templos de las comunidades (`content/comunidades/*.md`)

Ruta `/comunidades` (índice) y `/comunidades/:slug` (detalle). Un archivo Markdown por
templo, editable en `/admin` (colección "Templos de las comunidades"). Frontmatter:
`nombre`, `comunidad` (aldea/caserío), `orden`, `direccion`, `misa`, `latitud`, `longitud`,
`mapaEmbedUrl` (opcional), `foto`, `fotoPie`; el cuerpo del Markdown es la descripción.

**El mapa se genera solo con `latitud` + `longitud`** (OpenStreetMap, gratis); solo hace
falta `mapaEmbedUrl` si prefieres el mapa de Google. Los archivos `ejemplo-*.md` son de
muestra: bórralos o edítalos. El validador de build revisa el frontmatter de cada templo.

## Despliegue (Cloudflare Pages)

- Build command: `pnpm build`
- Output directory: `dist`
- Variables de entorno: `VITE_WHATSAPP`, `VITE_TELEFONO`.
- Para activar el panel `/admin`, seguir [`docs/cms-setup.md`](docs/cms-setup.md).
