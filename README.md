<h1 align="center">Mapa Mental</h1>

<p align="center">Plataforma web para crear mapas mentales, en español.</p>

<p align="center">
  <a href="./README_EN.md">English</a> ·
  <a href="./README_MORE_ZH.md">中文</a>
</p>

---

## Descripción

Aplicación web para crear, editar y exportar mapas mentales directamente en el navegador. Toda la interfaz está en **español**: barra de herramientas, menú contextual, paneles laterales, formas de nodo, temas, exportación y catálogos de iconos y stickers.

Está basada en el proyecto de código abierto [wanglin2/mind-map](https://github.com/wanglin2/mind-map) (*Simple Mind Map*), con la localización completa al español y varias correcciones de texto fijo que no estaban traducidas.

## Características

- Edición visual de mapas mentales con múltiples estructuras: estructura lógica, mapa mental, organigrama, catálogo organizado, línea de tiempo y espina de pescado.
- Estilos por nodo y estilo base: colores, fuentes, bordes, formas, degradados, imágenes de fondo.
- Temas visuales predefinidos.
- Nodos enriquecidos: iconos, stickers, imágenes, notas, etiquetas, hipervínculos, fórmulas (LaTeX) y marcos externos.
- Esquema de texto, búsqueda y reemplazo, numeración de nodos, resúmenes y líneas asociativas.
- Importación y exportación: SMM, JSON, PNG, SVG, PDF, Markdown, TXT y XMind.
- Modo presentación, modo Zen, marca de agua y atajos de teclado.
- Funciones de IA (opcionales) para generar y ampliar mapas.
- Todo funciona en el navegador; los datos se guardan en el almacenamiento local.

## Requisitos

- **Node.js** (LTS recomendado). Verifica con `node -v`.
- Un navegador moderno (Chrome, Edge, Firefox).

## Uso en desarrollo

Desde la carpeta `web`:

```bash
cd web
npm install
npm run serve
```

El servidor de desarrollo usa el código fuente directamente y ya está en español. Abre la dirección local que indique la terminal (normalmente `http://localhost:8080`).

## Compilar para producción (build)

Cada vez que cambies el código fuente, hay que recompilar para actualizar la carpeta `dist`, que es lo que sirve la aplicación.

En **PowerShell** (Windows), desde la carpeta `web`:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm install
npm run build
```

En **CMD**:

```bat
set NODE_OPTIONS=--openssl-legacy-provider
npm install
npm run build
```

> La variable `NODE_OPTIONS=--openssl-legacy-provider` es necesaria con versiones nuevas de Node (17+), porque el proyecto usa webpack 4. Sin ella el build falla con el error `ERR_OSSL_EVP_UNSUPPORTED`.

El comando regenera la carpeta `dist/` (en la raíz del proyecto) y actualiza el `index.html` de la raíz. Al terminar sin errores, abre ese `index.html` y verás la plataforma lista, en español.

## Estructura del proyecto

```
mind-map-main/
├── index.html          # Punto de entrada (carga /dist)
├── dist/               # Aplicación compilada (lo que se sirve)
├── assets/             # Imágenes y recursos estáticos
├── web/                # Código fuente de la app web (Vue 2 + Element UI)
│   └── src/
│       ├── lang/       # Traducciones i18n (es_es.js, en_us.js, ...)
│       ├── config/     # Configuración por idioma (es.js, en.js, ...)
│       └── pages/      # Páginas y componentes de la interfaz
└── simple-mind-map/    # Librería base del mapa mental
```

### Notas sobre el idioma

- El idioma por defecto es **español** (`web/src/i18n.js` → `locale: 'es'`).
- Los textos de interfaz están en `web/src/lang/es_es.js`.
- Las listas de configuración (fuentes, formas, formatos de exportación, atajos, estructuras) están en `web/src/config/es.js`.
- Los nombres de categorías de iconos/stickers están en `web/src/config/icon.js` e `image.js`; las categorías integradas de la librería se traducen en `web/src/pages/Edit/components/NodeIconSidebar.vue`.

Si agregas o cambias un texto, edítalo en esos archivos y vuelve a compilar.

## Publicar en GitHub Pages

La aplicación es estática, así que se puede alojar en GitHub Pages:

1. Sube el proyecto a un repositorio de GitHub (la carpeta `dist` **sí** debe subirse; `node_modules` está ignorado en `.gitignore`).
2. En el repositorio: **Settings → Pages → Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Espera 1–2 minutos. La URL será `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

> GitHub Pages sirve lo que hay en `dist`, no recompila. Después de cada cambio: `npm run build` → *commit* → *push*.

## Créditos

- Proyecto original: [wanglin2/mind-map](https://github.com/wanglin2/mind-map) — *Simple Mind Map*.
- Documentación de la librería: https://wanglin2.github.io/mind-map-docs/
- Licencia: MIT (según el proyecto original).

Localización al español y correcciones de interfaz sobre la base original.
