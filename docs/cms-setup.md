# Conectar el panel de contenido (`/admin`)

El sitio usa [Sveltia CMS](https://github.com/sveltia/sveltia-cms). El panel ya está
maquetado en `public/admin/` (`index.html` + `config.yml`); falta conectarlo a GitHub
para que la secretaría pueda editar sin tocar código. Esto se hace **una sola vez**.

## Resumen

Sveltia CMS guarda los cambios haciendo *commits* al repositorio. Para autenticar a los
editores con su cuenta de GitHub hace falta un pequeño servidor de OAuth. Lo desplegamos
gratis como un Cloudflare Worker.

## Paso 1 — Ajustar `config.yml`

En `public/admin/config.yml`, `backend.repo` ya apunta al repo real
(`Alexmavl/parroquiasantacruzchiquimulilla`). Solo falta añadir `base_url` en el paso 4.

## Paso 2 — Crear la OAuth App en GitHub

1. GitHub → *Settings* → *Developer settings* → *OAuth Apps* → *New OAuth App*.
2. Datos:
   - **Application name:** Parroquia Santa Cruz CMS
   - **Homepage URL:** `https://parroquiasantacruzchiquimulilla.pages.dev` (o el dominio final)
   - **Authorization callback URL:** `https://TU-WORKER.workers.dev/callback`
     (la URL del worker del paso 3; vuelve a editar esto cuando la tengas).
3. Guarda el **Client ID** y genera un **Client Secret**.

## Paso 3 — Desplegar el worker de OAuth

Usa el worker oficial [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth):

```bash
git clone https://github.com/sveltia/sveltia-cms-auth
cd sveltia-cms-auth
npm install
npx wrangler deploy
```

En el panel de Cloudflare, en *Workers & Pages* → el worker → *Settings* → *Variables*,
añade (como *Secret*):

| Variable         | Valor                                   |
| ---------------- | --------------------------------------- |
| `GITHUB_CLIENT_ID`     | el Client ID del paso 2           |
| `GITHUB_CLIENT_SECRET` | el Client Secret del paso 2       |
| `ALLOWED_DOMAINS`      | `parroquiasantacruzchiquimulilla.pages.dev` (y el dominio final) |

Copia la URL del worker (algo como `https://sveltia-cms-auth.tu-cuenta.workers.dev`).

## Paso 4 — Enlazar el worker en `config.yml`

```yaml
backend:
  name: github
  repo: mi-usuario/parroquiasantacruzchiquimulilla
  branch: main
  base_url: https://sveltia-cms-auth.tu-cuenta.workers.dev
```

Vuelve a la OAuth App de GitHub y corrige la *callback URL* a
`https://sveltia-cms-auth.tu-cuenta.workers.dev/callback`.

## Paso 5 — Dar acceso a la secretaría

Cada persona que vaya a editar necesita ser **colaboradora del repositorio** en GitHub
(*Settings* → *Collaborators*). Con eso ya puede entrar a `https://…/admin/` e iniciar
sesión con su cuenta.

## Comprobación

- `https://…/admin/` carga y pide iniciar sesión con GitHub.
- Editar un aviso y guardar genera un *commit* en `main` y Cloudflare Pages redespliega.
- Un PDF subido en la colección **Documentos** queda en `public/documentos/` y es
  accesible en `https://…/documentos/nombre.pdf`.

## Recordatorio de seguridad

La colección **Documentos** es para material sin datos de personas: requisitos
imprimibles, calendario de catequesis, informe económico, formularios en blanco.
**Nunca** se suben libros sacramentales, listados de folios ni nada con nombres, DPI o
fechas de nacimiento. Ver `public/spec-implementacion.md`, tarea 5.
