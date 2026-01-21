# CC1 - Directorio Comercial

Landing page para un directorio comercial con diseño institucional, construida con Next.js 14.

## Stack Tecnológico

- **Next.js** 14 (App Router)
- **React** 18.2
- **Tailwind CSS** 3.3
- **Lucide React** (iconos)
- **TypeScript** (opcional)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build de Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
app/
  ├── components/       # Componentes React
  │   ├── Navbar.jsx
  │   ├── Hero.jsx
  │   ├── DirectoryFilters.jsx
  │   ├── StoreGrid.jsx
  │   └── Footer.jsx
  ├── layout.js        # Layout principal
  ├── page.js          # Página de inicio
  └── globals.css      # Estilos globales
```

## Componentes

- **Navbar**: Barra de navegación superior con logo, menú y botón Intranet
- **Hero**: Banner principal con imagen de fondo y texto elegante
- **DirectoryFilters**: Sección de búsqueda con filtros alfabéticos y categorías
- **StoreGrid**: Grid de tarjetas para mostrar locales/comercios
- **Footer**: Pie de página institucional con logos

## Características

- ✅ SSR/SSG con Next.js
- ✅ Optimización de imágenes automática
- ✅ Diseño responsive (mobile-first)
- ✅ Fuentes optimizadas (Inter y Roboto)
- ✅ Paleta de colores institucional (azul marino, cian, blanco)
- ✅ Componentes modulares y reutilizables
- ✅ Client Components para interactividad
- ✅ Server Components para mejor rendimiento

## Mejoras sobre React + Vite

- Optimización automática de imágenes
- Mejor SEO con metadata
- Routing integrado
- Mejor rendimiento con SSR/SSG
- Optimización de fuentes con next/font
