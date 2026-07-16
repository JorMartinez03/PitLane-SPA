<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/PitLane-v1.6-e10600?style=for-the-badge&labelColor=0f0f14">
    <img alt="PitLane" src="https://img.shields.io/badge/PitLane-v1.6-e10600?style=for-the-badge&labelColor=0f0f14">
  </picture>
</p>

<p align="center">
  <strong>Single Page Application &mdash; Plataforma unificada de automovilismo (F1, F2, F3, IndyCar, NASCAR, WEC, MotoGP)</strong>
  <br />
  <sub>Construida con React 19, Vite 8, Tailwind CSS v4 y React Router</sub>
</p>

<p align="center">
  <a href="#overview">Overview</a> &bull;
  <a href="#funcionalidades-segun-srs">Funcionalidades SRS</a> &bull;
  <a href="#primeros-pasos">Primeros Pasos</a> &bull;
  <a href="#estructura-del-proyecto">Estructura</a> &bull;
  <a href="#rutas-y-navegacion">Rutas</a> &bull;
  <a href="#escalabilidad">Escalabilidad</a>
</p>

<br />

---

<br />

## Overview

PitLane es una **Single Page Application / Progressive Web App** que actua como concentrador interactivo de informacion del deporte motor. Muestra calendarios, clasificaciones y carrera en vivo de **7 categorias** de la temporada 2026: Formula 1, Formula 2, Formula 3, IndyCar, NASCAR, WEC y MotoGP.

La interfaz esta inspirada en la estetica de Formula 1 con un tema oscuro de fibra de carbono y el caracteristico acento rojo. La aplicacion sigue una **arquitectura desacoplada** en 3 capas (Datos, Logica, Presentacion) y esta disenada para funcionar offline mediante Service Worker y cache local.

### Stack Tecnologico

| Capa | Tecnologia | Version |
|------|-----------|---------|
| Framework | React | 19.x |
| Build Tool | Vite | 8.x |
| CSS | Tailwind CSS | 4.x |
| Routing | React Router DOM | 7.x |
| Deploy | Vercel | - |

### Funcionalidades Principales

- **Calendarios publicos** de 7 categorias con fechas reales 2026
- **Ajuste automatico de huso horario** del dispositivo del usuario
- **Cuenta regresiva activa** con badge "En Vivo" al expirar
- **Muro de pago (Paywall)** con Route Guard y redireccion segura
- **Clasificaciones Premium** con buscador, ordenamiento y 7 categorias
- **Carrera en vivo** con posiciones actualizadas cada 3s y banderas de pista
- **Notificaciones Web Push** configurables por tipo de evento
- **Panel administrativo** con autenticacion por llave hex 32ch y bitacora de auditoria
- **Publicidad asincrona** (Meta Ads) sin bloquear la interfaz
- **Modo sin conexion** con Service Worker y cache local
- **Barra de navegacion inferior** persistente en todas las paginas
- **Encriptacion AES-128** de sesiones en localStorage
- **Lazy loading** por ruta para optimizar el bundle size

<br />

---

<br />

## Funcionalidades segun SRS

### RF-001: Calendarios Publicos
El usuario gratuito puede consultar los calendarios de F1, F2, F3 e Indycar, NASCAR, WEC y MotoGP sin autenticacion.

### RF-002: Ajuste Automatico de Huso Horario
Los horarios se convierten automaticamente a la zona horaria local del usuario. Se detecta via `Intl.DateTimeFormat` y se muestra en el Hero y countdown.

### RF-003: Cuenta Regresiva Activa
Timer que decrementa dias/horas/min/seg en tiempo real. Al llegar a cero muestra badge "En Vivo" animado.

### RF-004: Muro de Pago (Paywall)
El Route Guard intercepta el acceso a `/clasificaciones/*` para usuarios gratuitos. Renderiza overlay informativo con boton "Volver al Calendario".

### RF-005: Clasificaciones Premium
Tablas con buscador, sorting por columnas y datos de 7 categorias. Incluye posiciones, pilotos, equipos y puntos.

### RF-006: Carrera en Vivo (Minuto a Minuto)
Simulacion de carrera en tiempo real con actualizaciones cada 3s, banderas de pista (Verde, Amarilla, Safety Car, Roja, VSC) y 22 pilotos de F1 + 22 F2 + 21 F3 + 10 IndyCar/NASCAR/WEC/MotoGP.

### RF-007: Notificaciones Web Push
Panel de configuracion con toggles para Inicios de sesion, Banderas Rojas y Coche de Seguridad. Usa la API nativa de `Notification`.

### RF-008: Autenticacion Administrativa
Login con llave unica de 32 caracteres hexadecimales. Token encriptado con AES-128 en localStorage. Acceso a `/admin/login`.

### RF-009: Edicion de Datos y Bitacora
Panel admin con tabs: General, Editar Datos, Carrera en Vivo, Bitacora. Toda modificacion queda registrada con timestamp, llave y valores anterior/nuevo.

### RF-010: Publicidad Asincrona
Banner de Meta Ads que se carga 2s despues del renderizado inicial, sin bloquear el hilo principal.

### RNF-008: Resiliencia Offline
Service Worker con cache first strategy. Banner "Modo sin Conexion" al perder señal. Datos de calendario accesibles sin internet.

<br />

---

<br />

## Primeros Pasos

### Requisitos

- Node.js >= 18
- npm >= 9

### Instalacion

```bash
git clone https://github.com/JorMartinez03/PitLane-SPA.git
cd PitLane-SPA
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre el servidor en [http://localhost:5173](http://localhost:5173).

### Compilacion

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

<br />

---

<br />

## Rutas y Navegacion

| Ruta | Componente | Descripcion |
|------|-----------|-------------|
| `/` | `HomePage` | Pagina principal con cards de categorias y proxima carrera |
| `/calendar/:category` | `CalendarPage` | Calendario completo de la categoria |
| `/extras` | `ExtrasPage` | Categorias adicionales (IndyCar, NASCAR, WEC, MotoGP) |
| `/clasificaciones/:category` | `ClasificacionesPage` | Clasificaciones con selector de 7 categorias (Premium) |
| `/en-vivo` | `LiveRacePage` | Carrera en vivo con 7 categorias y notificaciones (Premium) |
| `/admin/login` | `AdminLoginPage` | Login administrativo con llave hex |
| `/admin` | `AdminPanelPage` | Panel admin: edicion, control en vivo, bitacora |

### Llave de Administrador

```
a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
```

<br />

---

<br />

## Estructura del Proyecto

```
PitLane-SPA/
  index.html                  Entry HTML con PWA meta tags
  package.json                Dependencias y scripts
  vite.config.js              Config Vite + React + Tailwind
  public/
    manifest.json             PWA manifest
    sw.js                     Service Worker (cache offline)
    favicon.svg               Icono de la app
  src/
    main.jsx                  Entry point con AuthProvider
    index.css                 Tailwind v4 + theme tokens F1
    App.jsx                   Router con lazy loading + LiveRaceProvider
    context/
      AuthContext.jsx          Auth con AES-128 + admin key validation
      LiveRaceContext.jsx      Estado global de carrera en vivo
    data/
      races.js                115 carreras reales 2026 (7 categorias)
      standings.js            Clasificaciones actualizadas por categoria
      liveRaceData.js         Pilotos reales 2026 para simulacion en vivo
    hooks/
      useCalendar.js          Logica de calendario y filtrado
      useLiveRace.js          Simulacion de carrera en vivo
      useNotifications.js     Notificaciones Web Push nativas
    utils/
      dateUtils.js            Manejo de fechas en zona local
      crypto.js               Encriptacion AES-128 + validacion admin key
    components/
      CategoryCard.jsx        Card reutilizable de categoria
      CategoryNav.jsx         Navegacion de filtros por categoria
      Hero.jsx                Banner proxima carrera + countdown + timezone
      RaceCard.jsx            Tarjeta de carrera con animaciones
      CalendarGrid.jsx        Cuadricula responsiva de carreras
      CountdownTimer.jsx      Timer regresivo con badge "En Vivo"
      ClasificacionesTable.jsx Tabla con buscador y sorting
      Paywall.jsx             Muro de pago Premium
      ProtectedRoute.jsx      Guarda de ruta (Route Guard)
      UserLoginPanel.jsx      Selector de perfil + acceso admin
      LiveRaceBanner.jsx      Banner de estado de pista en vivo
      LivePositionsTable.jsx  Tabla de posiciones en tiempo real
      NotificationSettings.jsx Config de alertas Web Push
      MetaAdsBanner.jsx       Banner publicitario asincrono
      OfflineIndicator.jsx    Indicador de modo sin conexion
      AuditLog.jsx            Bitacora de auditoria admin
    pages/
      HomePage.jsx            Landing con categorias + countdown + bottom nav
      CalendarPage.jsx        Vista de calendario por categoria
      ExtrasPage.jsx          Categorias adicionales
      ClasificacionesPage.jsx Clasificaciones con 7 pestañas
      LiveRacePage.jsx        Carrera en vivo con 7 categorias
      AdminLoginPage.jsx      Login administrativo
      AdminPanelPage.jsx      Panel admin completo
```

<br />

---

<br />

## Escalabilidad

### Migrar a API Real

1. Reemplazar importacion estatica en `useCalendar.js` por `fetch()`
2. Mantener el mismo esquema `{ id, name, circuit, date, category, winner, team }`
3. Ningun componente visual requiere modificacion

### Agregar Categoria

1. Agregar carreras a `src/data/races.js`
2. Agregar clasificaciones a `src/data/standings.js`
3. Agregar pilotos a `src/data/liveRaceData.js`
4. Agregar al array `ALL_CATEGORIES` en `ClasificacionesPage.jsx` y `LiveRacePage.jsx`

### Mejoras Previstas

- Migracion a API real de datos deportivos
- Integracion pasarela de pagos real
- Pruebas unitarias con Vitest
- Zustand para estado persistente

<br />

---

<br />

## Construido Con

<div>
  <img src="https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="PWA" />
</div>

<br />

---

<br />

<p align="center">
  <sub>v1.6 &mdash; Junio 2026</sub>
  <br />
  <sub>Este proyecto no esta afiliado a Formula 1 ni a la FIA.</sub>
</p>
