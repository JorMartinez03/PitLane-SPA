<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/PitLane-F1--Alpha-e10600?style=for-the-badge&labelColor=0f0f14">
    <img alt="PitLane" src="https://img.shields.io/badge/PitLane-F1--Alpha-e10600?style=for-the-badge&labelColor=0f0f14">
  </picture>
</p>

<p align="center">
  <strong>Single Page Application &mdash; Calendario y clasificaciones de F1, F2, F3, IndyCar, NASCAR, WEC y MotoGP (Temporada 2026)</strong>
  <br />
  <sub>Construida con React 19, Vite 8, Tailwind CSS v4 y React Router</sub>
</p>

<p align="center">
  <a href="#overview">Overview</a> &bull;
  <a href="#arquitectura">Arquitectura</a> &bull;
  <a href="#componentes-y-animaciones">Componentes</a> &bull;
  <a href="#primeros-pasos">Primeros Pasos</a> &bull;
  <a href="#estructura-del-proyecto">Estructura</a> &bull;
  <a href="#escalabilidad">Escalabilidad</a>
</p>

<br />

---

<br />

## Overview

PitLane es una Single Page Application en fase alpha que muestra el calendario completo y clasificaciones de la temporada 2026 de **7 categorías**: Formula 1, Formula 2, Formula 3, IndyCar, NASCAR, WEC y MotoGP. La interfaz esta inspirada visualmente en el sitio oficial de Formula 1, con una estetica oscura de fibra de carbono y el caracteristico acento rojo F1.

La aplicacion sigue una **arquitectura desacoplada** que separa la logica de datos de la presentacion visual, facilitando la sustitucion de datos locales por llamadas a una API real cuando se migre a produccion.

### Funcionalidades Principales

- **Pagina principal con categorias** &mdash; cards interactivas para acceder al calendario de cada serie
- **Filtrado por categoria** &mdash; cambia entre los calendarios sin recargar la pagina
- **Categorias adicionales** &mdash; calendarios completos de IndyCar, NASCAR, WEC y MotoGP
- **Datos reales 2026** &mdash; fechas oficiales, circuitos, ganadores y clasificaciones actualizadas en tiempo real de cada serie
- **Deteccion dinamica de la proxima carrera** &mdash; identifica y destaca automaticamente la siguiente carrera basado en la fecha actual del sistema con estado `past`, `next` (< 7 dias) y `upcoming` (>= 7 dias)
- **Countdown en vivo** &mdash; contador regresivo con segundos en tiempo real para las carreras proximas
- **Clasificaciones** &mdash; pagina dedicada con tabla de puntuaciones por categoria, protegida con paywall
- **Autenticacion** &mdash; registro, inicio de sesion y muro de pago simulado con React Context
- **Fechas localizadas** &mdash; parseadas como fecha local del usuario para evitar desfases por huso horario
- **Diseno responsivo** &mdash; se adapta de 1 columna en movil a 4 columnas en pantallas anchas
- **Animaciones interactivas** &mdash; elevacion al hover, transiciones de color y barras de acento deslizantes
- **Skeleton de carga** &mdash; interfaz de placeholder animada mientras se cargan los datos de forma asincrona

<br />

---

<br />

## Arquitectura

La aplicacion esta organizada en tres capas distintas, cada una con una responsabilidad unica:

### Capa de Datos (src/data/)

Contiene arrays estaticos con el calendario y clasificaciones de la temporada 2026:

- **`races.js`** &mdash; 115 carreras reales de 7 categorias (F1, F2, F3, IndyCar, NASCAR, WEC, MotoGP). Cada carrera sigue un esquema normalizado con los campos `id`, `name`, `circuit`, `date` (formato ISO `YYYY-MM-DD`), `category`, `winner` y `team` (cuando aplica).
- **`standings.js`** &mdash; clasificaciones actualizadas de pilotos/corredores con posiciones, puntos, victorias y equipo.

### Capa de Logica (src/hooks/useCalendar.js)

Custom hook de React que centraliza toda la gestion de estado y logica de negocio:

```
Responsabilidades
  - Simula la carga asincrona de datos con un retardo de 400ms
  - Agrega estado en vivo a cada carrera (past / next / upcoming) mediante computeStatus()
  - Filtra las carreras de forma reactiva segun la categoria seleccionada
  - Identifica automaticamente la proxima carrera (nextRace)
  - Provee listas separadas de carreras pasadas (pastRaces) y futuras (upcomingRaces)
  - Limpia los timers al desmontar el componente
```

### Capa de Presentacion (src/components/)

Componentes visuales sin estado que reciben los datos a traves de props. Ningun componente importa o accede directamente a la capa de datos, garantizando un aislamiento visual completo.

### Capa de Utilidades (src/utils/dateUtils.js)

Funciones helper para manejo de fechas en zona horaria local:
- `parseLocalDate(dateStr)` &mdash; convierte `YYYY-MM-DD` a Date local evitando desfase UTC
- `formatLocalDate(dateStr, locale, options)` &mdash; formato localizado con `toLocaleDateString`
- `detectTimezone()` &mdash; detecta el huso horario del navegador

### Enrutamiento (React Router)

| Ruta                          | Componente           | Descripcion                               |
|-------------------------------|----------------------|-------------------------------------------|
| `/`                           | `HomePage`           | Pagina principal con cards de categorias  |
| `/calendar/:category`         | `CalendarPage`       | Calendario para una categoria especifica  |
| `/extras`                     | `ExtrasPage`         | Categorias adicionales                     |
| `/clasificaciones/:category`  | `ClasificacionesPage`| Tabla de clasificaciones con paywall      |
| `/login`                      | `LoginPage`          | Inicio de sesion                          |
| `/register`                   | `RegisterPage`       | Registro de usuario                       |

<br />

---

<br />

## Componentes y Animaciones

### CategoryCard

Componente reutilizable de card con gradiente de color, nombre de la categoria y numero de carreras. Incluye gradiente de fondo unico por categoria (rojo para F1, azul para F2, verde para F3, indigo para IndyCar, etc.), efecto de elevacion al hover (`hover:-translate-y-1`), circulos decorativos con blur para dar profundidad y enlace de navegacion al calendario correspondiente.

### HomePage

Pagina principal que lista todas las categorias disponibles en dos secciones:
- **Categorias Principales**: F1, F2, F3 como cards individuales
- **Otras Series**: Card "Mas Categorias" que enlaza a IndyCar, NASCAR, WEC y MotoGP
- Header con logo PitLane, panel de inicio de sesion y navegacion

### CalendarPage

Pagina que extrae la categoria de la URL (`/calendar/:category`) y renderiza el calendario completo usando `F1Dashboard`. Soporta todas las categorias del sistema.

### ExtrasPage

Pagina que lista las categorias adicionales (IndyCar, NASCAR, WEC, MotoGP) como cards individuales, cada una enlazando a su propio calendario.

### F1Dashboard

Componente orquestador que consume `useCalendar` y distribuye los datos a los componentes hijos. Proporciona la estructura principal del calendario: un header fijo con efecto de vidrio (`backdrop-blur-md`), navegacion entre categorias con `CategoryNav`, enlaces directos a clasificaciones, un skeleton de carga animado con efecto pulse, el area de contenido principal y un pie de pagina.

### CategoryNav

Barra de filtros horizontal con botones para las categorias. El boton activo se muestra con fondo rojo solido y una sombra coincidente (`shadow-lg shadow-f1-red/30`). Los botones inactivos aparecen en color plateado y se iluminan al hacer hover. Todas las transiciones duran 200ms para una respuesta tactil. Al cambiar de categoria, navega a la ruta correspondiente mediante React Router.

### Hero

Banner destacado que solo se muestra cuando se detecta una proxima carrera. Incluye:
- Borde superior rojo solido de 4px (estilo caracteristico de F1)
- Fondo con degradado diagonal de carbon a negro
- Dos circulos decorativos con efecto de desenfoque (`blur-3xl`)
- Nombre del ganador si la carrera ya finalizo
- Fecha formateada en zona horaria local
- Badge de categoria con indicador animado pulse
- CountdownTimer integrado para carreras en estado `next` o `upcoming`

### RaceCard

Tarjeta individual de carrera con informacion detallada y animaciones:

```
Efecto                          Implementacion
elevacion                       hover:-translate-y-1
transicion de borde             hover:border-f1-red
barra de acento superior        barra absoluta: scale-x-0 a scale-x-100
cambio de color del titulo      group-hover:text-f1-red
duracion maestra                duration-300 ease-out
```

Indicador circular de color que comunica el estado de la carrera de un vistazo:
- **Punto rojo** &mdash; siguiente carrera (next)
- **Punto plateado** &mdash; proximamente (upcoming)
- **Punto gris** &mdash; finalizado (past)

Cada tarjeta muestra ademas: nombre del ganador (si la carrera finalizo), circuito, fecha localizada y countdown en vivo (si la carrera no ha pasado).

### CountdownTimer

Contador regresivo en vivo que se actualiza cada segundo. Muestra dias, horas, minutos y segundos restantes hasta la fecha objetivo. Se oculta automaticamente cuando la fecha ya expiro. Disenado con numeros tabulares (`tabular-nums`) para evitar saltos visuales durante la actualizacion.

### CalendarGrid

Distribuye las tarjetas en un CSS Grid responsivo:

```
Breakpoint      Columnas
Por defecto     1
sm (640px)      2
lg (1024px)     3
xl (1280px)     4
```

Se muestra un mensaje centrado cuando no hay carreras que coincidan con el filtro actual.

### ClasificacionesTable

Tabla de clasificaciones con columnas de posicion, nombre, puntos, victorias y equipo. Los datos se cargan desde `src/data/standings.js` segun la categoria activa. Incluye estilos alternados por fila y badge para el lider del campeonato.

### Paywall

Componente de muro de pago simulado que restringe el acceso a las clasificaciones para usuarios no autenticados. Muestra el nombre de la categoria bloqueada y botones para iniciar sesion o registrarse.

### ProtectedRoute

Componente de guarda de ruta que verifica el estado de autenticacion. Redirige a la pagina de inicio de sesion si el usuario no esta autenticado.

### AuthContext

Contexto de React para gestionar el estado de autenticacion del usuario. Provee `login()`, `register()`, `logout()` y el estado `user` a toda la aplicacion.

### UserLoginPanel

Panel de usuario en el header que muestra el nombre del usuario autenticado con un boton de cerrar sesion, o un boton de iniciar sesion para usuarios no autenticados.

<br />

---

<br />

## Primeros Pasos

### Requisitos

- Node.js >= 18
- npm >= 9

### Instalacion

```bash
git clone <repository-url>
cd spa-alpha
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre el servidor de desarrollo en [http://localhost:5173](http://localhost:5173) con recarga en caliente habilitada.

### Compilacion para Produccion

```bash
npm run build
npm run preview
```

Genera un bundle de produccion optimizado en el directorio `dist/`.

### Linting

```bash
npm run lint
```

Ejecuta ESLint sobre el codigo fuente usando las reglas configuradas en el proyecto.

### Paginas y Navegacion

```
/                        Pagina principal con categorias
/calendar/F1             Calendario de Formula 1
/calendar/F2             Calendario de Formula 2
/calendar/F3             Calendario de Formula 3
/calendar/IndyCar        Calendario de IndyCar
/calendar/NASCAR         Calendario de NASCAR
/calendar/WEC            Calendario de WEC
/calendar/MotoGP         Calendario de MotoGP
/extras                  Categorias adicionales
/clasificaciones/F1      Clasificaciones de F1 (requiere autenticacion)
/clasificaciones/F2      Clasificaciones de F2
/clasificaciones/F3      Clasificaciones de F3
/clasificaciones/IndyCar Clasificaciones de IndyCar
/clasificaciones/NASCAR  Clasificaciones de NASCAR
/clasificaciones/WEC     Clasificaciones de WEC
/clasificaciones/MotoGP  Clasificaciones de MotoGP
/login                   Inicio de sesion
/register                Registro de usuario
```

<br />

---

<br />

## Estructura del Proyecto

```
spa-alpha/
  index.html                 Punto de entrada HTML con Google Fonts (Inter)
  package.json               Dependencias y scripts de npm
  vite.config.js             Configuracion de Vite con plugin de Tailwind
  src/
    main.jsx                 Punto de entrada del renderizado de React
    index.css                Estilos globales con tokens de tema de Tailwind
    App.jsx                  Componente raiz con React Router
    utils/
      dateUtils.js           Funciones para manejo de fechas en zona local
    data/
      races.js               115 carreras (temporada 2026 de 7 categorias)
      standings.js           Clasificaciones oficiales 2026 por categoria
    hooks/
      useCalendar.js         Custom hook: estado, filtrado, simulacion asincrona
    context/
      AuthContext.jsx        Contexto de autenticacion (login, register, logout)
    components/
      CategoryCard.jsx       Card de categoria con gradiente y enlace
      F1Dashboard.jsx        Orquestador de layout con skeleton de carga
      CategoryNav.jsx        Navegacion de filtros por categoria
      Hero.jsx               Banner de la proxima carrera con countdown
      CalendarGrid.jsx       Contenedor de cuadricula responsivo
      RaceCard.jsx           Tarjeta individual de carrera con animaciones hover
      CountdownTimer.jsx     Contador regresivo en vivo
      ClasificacionesTable.jsx Tabla de clasificaciones con datos reales
      Paywall.jsx            Muro de pago simulado para contenido premium
      ProtectedRoute.jsx     Guarda de ruta para contenido autenticado
      UserLoginPanel.jsx     Panel de usuario en el header
    pages/
      HomePage.jsx           Pagina principal con cards de categorias
      CalendarPage.jsx       Pagina de calendario por categoria
      ExtrasPage.jsx         Pagina de categorias adicionales
      ClasificacionesPage.jsx Pagina de clasificaciones con paywall
      LoginPage.jsx          Pagina de inicio de sesion
      RegisterPage.jsx       Pagina de registro de usuario
```

<br />

---

<br />

## Escalabilidad

La arquitectura esta disenada para evolucionar de alpha a produccion con una friccion minima.

### Migrar Datos Locales a una API

Solo es necesario modificar `src/hooks/useCalendar.js`:

1. Reemplazar la importacion estatica de `races.js` por una llamada `fetch()` o axios
2. Sustituir el `setTimeout` de simulacion por una cadena de promesas de la peticion HTTP
3. Mapear la respuesta de la API al mismo formato estandarizado `{ id, name, circuit, date, category, winner, team }`
4. Ningun componente visual requiere modificacion

### Anadir una Nueva Categoria

1. Agregar objetos de carrera a `src/data/races.js` con el nuevo valor de categoria
2. Agregar clasificaciones en `src/data/standings.js`
3. Agregar la categoria al array correspondiente en `HomePage.jsx` o `ExtrasPage.jsx`
4. Opcional: agregar un gradiente de color en `CategoryCard.jsx` (`GRADIENTS`)
5. Para que aparezca en el nav de F1Dashboard, anadirla al array `MAIN_CATEGORIES`

### Mejoras Previstas

- Estado persistente con Zustand o React Context para datos entre sesiones
- Paginas individuales de detalle de carrera con informacion ampliada
- Soporte para multiples temporadas mediante una dimension de filtro adicional
- Pruebas unitarias y de integracion con Vitest y React Testing Library

<br />

---

<br />

## Construido Con

<div>
  <img src="https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint" />
</div>

<br />

---

<br />

<p align="center">
  <sub>Fase Alpha &mdash; Temporada 2026</sub>
  <br />
  <sub>Este proyecto no esta afiliado a Formula 1 ni a la FIA.</sub>
</p>
