# Backend de Music Player 🎵

Este proyecto constituye el backend de la aplicación web de música, desarrollado con Node.js, Express y MongoDB. Ofrece funcionalidades como autenticación de usuarios, gestión de listas de reproducción, suscripciones, un servicio de chat en tiempo real y sanitización de entradas para mejorar la seguridad.

---

## Estructura del Proyecto 📂

### Archivos y Carpetas Principales

```plaintext
backend/
|-- node_modules/                # Dependencias instaladas
|-- src/                         # Código fuente principal
|   |-- config/                  # Configuración de la base de datos y otros servicios
|   |   |-- mongodb.js          # Conexión a MongoDB
|   |-- controllers/             # Controladores de las rutas
|   |   |-- authController.js    # Lógica de autenticación
|   |   |-- chatController.js    # Lógica del chat
|   |   |-- musicController.js   # Lógica de gestión de música
|   |   |-- playlistController.js # Lógica de listas de reproducción
|   |   |-- subscriptionController.js # Lógica de suscripciones
|   |-- middleware/              # Middlewares personalizados
|   |   |-- auth.js              # Middleware de autenticación
|   |   |-- logout.js            # Middleware de cierre de sesión
|   |   |-- sanitizeMiddleware.js # Middleware para sanitización
|   |-- model/                   # Modelos de datos
|   |   |-- user.js              # Modelo de usuario
|   |-- routes/                  # Rutas principales
|   |   |-- authRoutes.js        # Rutas de autenticación
|   |   |-- index.js             # Archivo principal de rutas
|   |   |-- musicRoutes.js       # Rutas para música
|   |   |-- playlistRoutes.js    # Rutas para listas de reproducción
|   |   |-- subscriptionRoutes.js # Rutas para suscripciones
|   |-- services/                # Lógica de negocio
|   |   |-- audiusService.js     # Servicio de música
|   |   |-- playlistService.js   # Servicio de listas de reproducción
|   |-- utils/                   # Utilidades generales
|   |   |-- sanitization.js      # Funciones de sanitización
|   |   |-- validations.js       # Validaciones generales
|   |   |-- index.js             # Funciones de utilidad
|   |   |-- server.js            # Configuración del servidor
|   |   |-- socket.js            # Configuración de WebSockets
|-- .env                         # Variables de entorno
|-- .gitignore                   # Archivos ignorados por Git
|-- package.json                 # Dependencias del proyecto
```

---

## Dependencias Principales 🛠️

- **Express**: Framework web para Node.js.
- **Mongoose**: ODM para MongoDB.
- **Socket.IO**: Comunicación en tiempo real mediante WebSockets.
- **XSS**: Protección contra ataques de cross-site scripting.
- **Sanitize-html**: Biblioteca para limpiar entradas de usuario.

---

## Configuración y Ejecución 🚀

### Instalación

Asegúrate de tener Node.js instalado, luego ejecuta:

```bash
npm install
npm install xss
npm install sanitize-html
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
SECRET_JWT_KEY=$this-is-a-secret-key$
REFRESH_TOKEN_KEY=$this-is-a-refresh-token-key$
MONGO_URI=mongodb+srv://sebsept999:cA7kAVXY42iSVJJS@musicplayercluster.xam4o.mongodb.net/?retryWrites=true&w=majority&appName=MusicPlayerCluster
MONGO_URI=mongodb://localhost:27017/musicplayer
```

### Entorno de Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

---

## Características Clave ✨

- **Autenticación Segura**: Incluye autenticación basada en tokens JWT.
- **Sanitización de Entradas**: Protección contra XSS mediante `xss` y `sanitize-html`.
- **Gestión de Listas de Reproducción**: APIs para crear, actualizar y eliminar listas de reproducción.
- **Chat en Tiempo Real**: Integración con Socket.IO.
- **Conexión con MongoDB**: Gestión eficiente de datos con Mongoose.

---

## Créditos 📋

Proyecto desarrollado como parte de prácticas en desarrollo de software seguro.

---

¡Listo para gestionar tu música de manera segura y eficiente! 🎶
