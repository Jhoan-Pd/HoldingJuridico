# Holding Jurídico — Sitio web de Mora Leiton Holding Jurídico

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni paso de compilación). Todo el sitio vive en la carpeta `mora-leiton-web/`.

**Estado actual: ambiente de pruebas en Vercel.** El sitio está configurado para que Google y otros buscadores no lo indexen (ver «Pasar a producción»).

## Estructura

```
mora-leiton-web/
  index.html               Inicio
  nosotros.html            La firma: visión, pilares, a quién acompañan, compromiso con la región
  areas-de-practica.html   Seis áreas con pestañas (#contratacion, #administrativo, #penal, #laboral, #civil, #tributario)
  equipo.html              Director y abogados aliados
  actualidad.html          18 análisis tomados de Instagram, con filtros por tema
  contacto.html            Canales de contacto y formulario
  404.html                 Página de error
  css/styles.css           Estilos (colores y tipografías en las variables de :root)
  js/main.js               Menú móvil, preguntas frecuentes, pestañas, filtros y formulario
  favicon.svg              Ícono del sitio
  robots.txt               Bloqueo de indexación (ambiente de pruebas)
vercel.json                Configuración de Vercel (en la raíz del repositorio)
```

`vercel.json` le indica a Vercel que publique la carpeta `mora-leiton-web` (`"outputDirectory"`), así que no hace falta configurar nada en el panel de Vercel.

## URLs

Vercel sirve las páginas sin la extensión `.html`:

| Página | URL |
|---|---|
| Inicio | `/` |
| La firma | `/nosotros` |
| Áreas de práctica | `/areas-de-practica` (una área: `/areas-de-practica#penal`) |
| Equipo | `/equipo` |
| Actualidad jurídica | `/actualidad` |
| Contacto | `/contacto` |

Si alguien entra a `/nosotros.html`, Vercel lo redirige a `/nosotros`.

## Desplegar en Vercel

### Opción A: desde GitHub (recomendada)

Cada `push` a `main` actualiza el ambiente de pruebas, y cada rama o pull request recibe su propia URL de vista previa.

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio `Jhoan-Pd/HoldingJuridico`.
2. Deja todo como viene: **Root Directory** vacío (la raíz del repositorio) y **Framework Preset** en *Other*.
3. Haz clic en **Deploy**.

> Importante: no pongas `mora-leiton-web` como Root Directory. Si lo haces, Vercel ignora el `vercel.json` de la raíz y se pierden las URLs limpias.

### Opción B: desde la terminal

```bash
# desde la raíz del repositorio (donde está vercel.json)
npx vercel          # primera vez: inicia sesión y crea el proyecto (despliegue de vista previa)
npx vercel --prod   # actualiza la URL principal del proyecto
```

La CLI crea una carpeta `.vercel/` local; ya está en `.gitignore`.

## Ver el sitio en tu computador

Como los enlaces usan URLs limpias (`/nosotros`), abrir los archivos con doble clic no navega bien entre páginas. Usa un servidor local:

```bash
npx serve mora-leiton-web
```

y abre `http://localhost:3000`. También funciona `npx vercel dev` desde la raíz del repositorio.

## Cómo funciona el formulario

No hay servidor, así que al enviar el formulario se abre WhatsApp (+57 317 655 7025) con el mensaje ya escrito con los datos de la persona. Si más adelante quieren recibir los mensajes por correo, se puede conectar un servicio como Formspree reemplazando el bloque marcado en `js/main.js`.

## Pasar a producción

Cuando el sitio esté aprobado y tenga su dominio definitivo:

1. En `vercel.json`, borra el bloque `X-Robots-Tag` (`noindex, nofollow`).
2. En `mora-leiton-web/robots.txt`, cambia `Disallow: /` por `Allow: /`.
3. Conecta el dominio en Vercel (*Settings → Domains*).
4. Agrega en el `<head>` de cada página la etiqueta `<link rel="canonical" href="https://DOMINIO/...">` y una imagen para compartir en redes (`og:image`, con URL absoluta).

## Identidad visual

- Colores: negro `#0B0B0C`, plateado `#C9CBCF`, fondo claro `#F4F4F2`, texto `#141416`.
- Tipografías (Google Fonts): Cinzel (logotipo y etiquetas), Cormorant Garamond (títulos), Manrope (textos).
- El logotipo está escrito con la tipografía Cinzel. Si tienen el archivo del logo (PNG o SVG), se puede reemplazar dentro de `.logo` en el encabezado y el pie de cada página.

## Información de la firma usada en el sitio

Fuentes: Instagram @mlholdingjuridico, Facebook «Mora Leiton Holding Jurídico» y su sitio anterior (hedumole.wixsite.com/mlhj).

- **Nombre:** Mora Leiton Holding Jurídico
- **Eslogan:** Asesoría jurídica y litigio estratégico
- **Director:** Heiman Mora, abogado especialista y docente universitario
- **Dirección:** Cra. 24 No. 17-15, Casona San Agustín, Of. 204, Pasto, Nariño
- **Teléfono / WhatsApp:** +57 317 655 7025
- **Correo:** mlholdingjuridico@gmail.com
- **Redes:** Instagram @mlholdingjuridico · Facebook · YouTube @moraleitonholdingjuridico
- **Áreas de práctica:** contratación estatal; derecho administrativo; derecho penal y disciplinario; derecho laboral y seguridad social; derecho civil y comercial; derecho tributario
- **Pilares:** ética, estudio, tecnología, disciplina y fe
- **Clientes:** entidades públicas, empresas privadas y personas naturales
- **Enfoque:** estrategias preventivas, correctivas y litigiosas
- **Programa de aliados:** abogados jóvenes que quieran litigar de forma independiente pueden trabajar casos en conjunto y usar el espacio de la oficina
- **Reseña en Facebook:** «Excelente asesoría y acompañamiento.»

En Facebook el teléfono aparece como 317 655 2025; en Instagram y en el sitio anterior, como 317 655 7025. El sitio usa 317 655 7025.
