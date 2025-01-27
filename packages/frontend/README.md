# Frontend de Music Player 🎵

Este proyecto constituye el frontend de una aplicación web de música desarrollada con React, Vite y Tailwind CSS. Incluye funcionalidades como listas de reproducción, canciones favoritas, suscripciones, chat en tiempo real entre usuarios y más.

---

## Estructura del Proyecto 📂

### Archivos y Carpetas Principales

```plaintext
frontend/
|-- node_modules/          # Dependencias instaladas
|-- .vite/                 # Archivos generados por Vite
|-- public/                # Recursos públicos
|   |-- vite.svg           # Logo de Vite
|-- src/                   # Código fuente principal
|   |-- assets/            # Recursos gráficos
|   |   |-- guychill.png   # Imagen decorativa
|   |   |-- react.svg      # Logo de React
|   |-- components/        # Componentes reutilizables
|   |   |-- AudioPlayer.jsx
|   |   |-- Community.jsx
|   |   |-- Favorites.jsx
|   |   |-- Header.jsx
|   |   |-- MainContent.jsx
|   |   |-- MusicList.jsx
|   |   |-- PlayList.jsx
|   |   |-- PlaylistDetail.jsx
|   |   |-- PlaylistModal.jsx
|   |   |-- Sidebar.jsx
|   |   |-- Song.jsx
|   |   |-- Subscription.jsx
|   |-- context/           # Contextos de React
|   |   |-- AuthContext.jsx
|   |   |-- ChatContext.jsx
|   |   |-- PlaylistsContext.jsx
|   |-- pages/             # Páginas principales de la aplicación
|   |   |-- HomePage.jsx
|   |   |-- Login.jsx
|   |   |-- MusicPlayer.jsx
|   |   |-- NotFound.jsx
|   |   |-- Register.jsx
|   |-- services/          # Servicios de datos
|   |   |-- data.js
|   |-- utils/             # Utilidades generales
|   |   |-- api.js
|   |   |-- indexedDB.js
|   |   |-- sanitization.js
|-- .env                   # Variables de entorno
|-- .gitignore             # Archivos ignorados por Git
|-- eslint.config.js       # Configuración de ESLint
|-- index.html             # Archivo HTML principal
|-- package.json           # Dependencias del proyecto
|-- postcss.config.js      # Configuración de PostCSS
|-- tailwind.config.js     # Configuración de Tailwind CSS
|-- vite.config.js         # Configuración de Vite
```

---

## Dependencias Principales 🛠️

- **React**: Biblioteca para construir interfaces de usuario.
- **React DOM**: Soporte para renderizado en navegador.
- **Dompurify**: Biblioteca para sanitizar entradas de usuario y prevenir XSS.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y modernos.
- **Vite**: Herramienta de construcción ultrarrápida.

---

## Configuración y Ejecución 🚀

### Instalación

```bash
npm install
npm install dompurify
```

### Entorno de Desarrollo

```bash
npm run dev
```

### Compilación para Producción

```bash
npm run build
```

---

## Detalles Adicionales 📋

### React + Vite

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos complementos oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh.

---

## Créditos ✨

Proyecto desarrollado como parte de prácticas en desarrollo de software seguro.

---

¡Listo para hacer música de forma segura! 🎶
