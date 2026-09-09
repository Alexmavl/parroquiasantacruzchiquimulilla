# ⛪ Parroquia Santa Cruz · Chiquimulilla

Sitio web oficial de la **Parroquia Santa Cruz de Chiquimulilla** (Diócesis de Santa Rosa de Lima, Guatemala).

Plataforma estática, accesible, rápida y segura orientada a feligreses y visitantes. **Sin backend, sin base de datos y sin pasarelas de pago**: las solicitudes y consultas de registros se canalizan directamente por WhatsApp y las constancias oficiales se entregan en el despacho parroquial.

🌐 **Sitio en vivo:** [https://alexmavl.github.io/parroquiasantacruzchiquimulilla/](https://alexmavl.github.io/parroquiasantacruzchiquimulilla/)

---

## 🌟 Características Principales

- **🏛️ Guía completa de sacramentos**: Requisitos claros, tiempos de anticipación, modalidad ordinaria y supletoria (para adultos), botón de impresión de requisitos y solicitud directa de constancias.
- **🕒 Horarios actualizados**: Calendario claro de Santas Misas, confesiones y atención en el despacho parroquial.
- **🗺️ Ubicación interactiva**: Mapas interactivos y botones directos con íconos oficiales para abrir la ruta en **Google Maps** y **Waze**.
- **🏘️ Templos de las comunidades**: Directorio de capillas y comunidades con fotografías, horarios y mapas.
- **📜 Consulta de registros parroquiales**: Índice de libros sacramentales conservados y asistencia guiada para localización de partidas de bautizo, confirmación y matrimonio.
- **♿ Accesibilidad y Rendimiento**: SSG (Static Site Generation), responsive design, tema litúrgico azul marino con detalles dorados y navegación accesible.

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito |
| :--- | :--- |
| **Vite 8 + React 19 + TypeScript** | Base de la aplicación y desarrollo con tipado estricto |
| **Tailwind CSS 4** | Sistema de diseño, utilidades y tokens de color litúrgicos |
| **vite-react-ssg + React Router 6** | Prerenderizado estático (SSG) de todas las rutas públicas |
| **Lucide React + Set Litúrgico Propio** | Iconografía de interfaz e iconos sacros vectoriales |
| **Zod + TSX** | Validación estricta de esquemas de contenido JSON y Markdown |
| **Vitest** | Pruebas unitarias y de integración |
| **GitHub Actions / GitHub Pages** | Despliegue continuo automatizado |

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- [Node.js](https://nodejs.org/) v20 o superior
- [pnpm](https://pnpm.io/) v10 (`npm install -g pnpm`)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Alexmavl/parroquiasantacruzchiquimulilla.git
cd parroquiasantacruzchiquimulilla
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
Copia el archivo de ejemplo y define los números de contacto (código de país + número, sin signos ni espacios):
```bash
cp .env.example .env
```
Contenido de `.env`:
```env
VITE_WHATSAPP=50200000000
VITE_TELEFONO=50200000000
```

### 4. Iniciar el servidor local
```bash
pnpm dev
```
Abre en tu navegador: [http://localhost:5173/](http://localhost:5173/)

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local con recarga rápida (HMR). |
| `pnpm build` | Valida el contenido de `content/` y compila el sitio estático en `dist/`. |
| `pnpm preview` | Previsualiza localmente el resultado de producción (`dist/`). |
| `pnpm test` | Ejecuta la suite de pruebas automatizadas con Vitest. |
| `pnpm typecheck` | Comprueba tipos de TypeScript (`tsc -b --noEmit`). |
| `pnpm lint` | Analiza el código con Oxlint. |
| `pnpm validar-contenido` | Valida los archivos JSON y Markdown contra los esquemas Zod. |

---

## 📁 Estructura del Proyecto

```text
parroquiasantacruzchiquimulilla/
├── .github/workflows/          # Flujos de GitHub Actions (despliegue a Pages)
├── content/                    # Contenido editable estructurado
│   ├── avisos/                 # Comunicados y avisos parroquiales (.md)
│   ├── comunidades/            # Templos y capillas filiales (.md)
│   ├── documentos/             # Guías y documentación descargable
│   ├── registros/libros.json   # Índice de libros parroquiales (sin datos privados)
│   ├── historia.md             # Historia de la parroquia
│   ├── horarios.json           # Horarios de misa, confesión y despacho
│   └── parroquia.json          # Datos principales, redes y ubicación
├── public/                     # Archivos estáticos públicos (imágenes, favicons)
│   └── admin/                  # Panel de administración CMS (Sveltia)
├── src/
│   ├── components/             # Componentes compartidos (Layout, Ubicación, UI)
│   ├── features/               # Módulos principales:
│   │   ├── comunidades/        # Directorio y detalle de comunidades
│   │   ├── registros/          # Consulta de registros
│   │   └── sacramentos/        # Requisitos, trámites y sacramentos
│   ├── icons/                  # Set litúrgico propio e iconos de marcas
│   ├── lib/                    # Lógica de WhatsApp, parseo de contenido y esquemas
│   ├── pages/                  # Páginas principales (Inicio, Horarios, Historia, etc.)
│   └── styles/theme.css        # Paleta litúrgica (Azul Marino + Oro)
├── scripts/                    # Scripts de validación en tiempo de compilación
└── vite.config.ts              # Configuración de Vite y SSG
```

---

## 🔒 Privacidad y Protección de Datos

- **Seguridad en registros**: Conforme a las directrices de privacidad, no se publican listas de personas ni folios digitalizados.
- **Búsqueda asistida**: La consulta de registros permite a los usuarios verificar si el libro de su sacramento existe en la parroquia y solicitar la búsqueda oficial en el archivo físico por medio de WhatsApp.

---

## 🌐 Despliegue en GitHub Pages

El repositorio cuenta con integración continua configurada en `.github/workflows/deploy.yml`. Cada `push` a la rama `main` ejecuta las validaciones y actualiza el sitio web automáticamente.

Para ajustar los números de contacto en producción:
1. Ve a **Settings → Secrets and variables → Actions** en GitHub.
2. Agrega los secretos:
   - `VITE_WHATSAPP`: Número de WhatsApp parroquial.
   - `VITE_TELEFONO`: Teléfono de atención.

---

© Parroquia Santa Cruz · Chiquimulilla, Santa Rosa, Guatemala.
