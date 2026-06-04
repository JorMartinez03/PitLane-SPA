<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/PitLane-F1--Alpha-e10600?style=for-the-badge&labelColor=0f0f14">
    <img alt="PitLane" src="https://img.shields.io/badge/PitLane-F1--Alpha-e10600?style=for-the-badge&labelColor=0f0f14">
  </picture>
</p>

<p align="center">
  <strong>Single Page Application &mdash; Calendario de Formula 1, F2 y F3 (Temporada 2026)</strong>
  <br />
  <sub>Construida con React 19, Vite 8 y Tailwind CSS v4</sub>
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

PitLane es una Single Page Application en fase alpha que muestra el calendario completo de la temporada 2026 de Formula 1, Formula 2 y Formula 3. La interfaz esta inspirada visualmente en el sitio oficial de Formula 1, con una estetica oscura de fibra de carbono y el caracteristico acento rojo F1.

La aplicacion sigue una **arquitectura desacoplada** que separa la logica de datos de la presentacion visual, facilitando la sustitucion de datos locales por llamadas a una API real cuando se migre a produccion.

### Funcionalidades Principales

- **Filtrado por categoria** &mdash; cambia entre los calendarios de F1, F2 y F3 sin recargar la pagina
- **Deteccion dinamica de la proxima carrera** &mdash; identifica y destaca automaticamente el siguiente Gran Premio basado en la fecha actual del sistema
- **Diseno responsivo** &mdash; se adapta de 1 columna en movil a 4 columnas en pantallas anchas
- **Animaciones interactivas** &mdash; elevacion al hover, transiciones de color y barras de acento deslizantes
- **Skeleton de carga** &mdash; interfaz de placeholder animada mientras se cargan los datos de forma asincrona
- **Fechas localizadas** &mdash; formateadas automaticamente al idioma del usuario con la funcion nativa `toLocaleDateString`

<br />

---

<br />

## Arquitectura

La aplicacion esta organizada en tres capas distintas, cada una con una responsabilidad unica:

### Capa de Datos (src/data/races.js)

Contiene un array estatico de 48 objetos con el calendario completo de la temporada 2026 para las tres categorias. Cada carrera sigue un esquema normalizado:

```
Campo       Tipo      Descripcion
id          string    Identificador unico (ej. "f1-07")
name        string    Nombre del Gran Premio (ej. "Gran Premio de Espana")
circuit     string    Nombre del circuito
date        string    Fecha en formato ISO (YYYY-MM-DD)
category    string    "F1", "F2" o "F3"
status      string    "past", "next" o "upcoming" (calculado automaticamente)
```

### Capa de Logica (src/hooks/useCalendar.js)

Un custom hook de React que centraliza toda la gestion de estado y logica de negocio. Este es el **unico archivo que requiere modificacion** al migrar de datos locales a una API en vivo.

```
Responsabilidades
  - Simula la carga asincrona de datos con un retardo de 600ms
  - Calcula dinamicamente el estado de cada carrera comparando fechas con el reloj del sistema
  - Filtra las carreras de forma reactiva segun la categoria seleccionada
  - Identifica automaticamente la proxima carrera
  - Provee el estado de carga para las transiciones de la interfaz
  - Limpia los timers al desmontar el componente
```

### Capa de Presentacion (src/components/)

Componentes visuales sin estado que reciben los datos a traves de props. Ningun componente importa o accede directamente a la capa de datos, garantizando un aislamiento visual completo.

<br />

---

<br />

## Componentes y Animaciones

### F1Dashboard

Componente orquestador que consume `useCalendar` y distribuye los datos a los componentes hijos. Proporciona la estructura principal de la aplicacion: un header fijo con efecto de vidrio (`backdrop-blur-md`), un skeleton de carga animado con efecto pulse, el area de contenido principal y un pie de pagina.

### CategoryNav

Barra de filtros horizontal con botones para F1, F2 y F3. El boton activo se muestra con fondo rojo solido y una sombra coincidente (`shadow-lg shadow-f1-red/30`). Los botones inactivos aparecen en color plateado y se iluminan al hacer hover. Todas las transiciones duran 200ms para una respuesta tactil.

### Hero

Banner destacado que solo se muestra cuando se detecta una proxima carrera. Incluye:
- Borde superior rojo solido de 4px (estilo caracteristico de F1)
- Fondo con degradado diagonal de carbon a negro
- Dos circulos decorativos con efecto de desenfoque (`blur-3xl`) para dar profundidad
- Indicador animado con efecto pulse junto a la insignia de categoria
- Diseno responsivo que se apila verticalmente en movil y se alinea en horizontal en desktop

### RaceCard

Cada carrera se muestra en una tarjeta con las siguientes animaciones al hacer hover:

```
Efecto                          Implementacion
elevacion                       hover:-translate-y-1
transicion de borde             hover:border-f1-red
barra de acento superior        barra absoluta: scale-x-0 a scale-x-100
cambio de color del titulo      group-hover:text-f1-red
duracion maestra                duration-300 ease-out
```

Un indicador circular de color comunica el estado de la carrera de un vistazo:
- **Punto rojo** &mdash; proxima carrera
- **Punto plateado** &mdash; proximamente
- **Punto gris** &mdash; finalizado

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
    App.jsx                  Componente raiz
    data/
      races.js               48 carreras (temporada 2026 de F1, F2 y F3)
    hooks/
      useCalendar.js          Custom hook: estado, filtrado, simulacion asincrona
    components/
      F1Dashboard.jsx         Orquestador de layout con skeleton de carga
      CategoryNav.jsx         Navegacion de filtros F1 / F2 / F3
      Hero.jsx                Banner de la proxima carrera
      CalendarGrid.jsx        Contenedor de cuadricula responsivo
      RaceCard.jsx            Tarjeta individual de carrera con animaciones hover
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
3. Mapear la respuesta de la API al mismo formato estandarizado `{ id, name, circuit, date, category, status }`
4. Ningun componente visual requiere modificacion

### Anadir una Nueva Categoria

1. Agregar objetos de carrera a `src/data/races.js` con el nuevo valor de categoria
2. Anadir el nombre de la categoria al array `CATEGORIES` en `CategoryNav.jsx`
3. Opcional: agregar un color de acento al objeto `CATEGORY_COLORS`

### Mejoras Previstas

- Estado persistente con Zustand o React Context para datos entre sesiones
- Integracion de React Router para paginas individuales de detalle de carrera
- Incorporacion de clasificaciones de pilotos y constructores
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

<p align="center">
  <sub>Fase Alpha &mdash; Temporada 2026</sub>
  <br />
  <sub>Este proyecto no esta afiliado a Formula 1 ni a la FIA.</sub>
</p>
