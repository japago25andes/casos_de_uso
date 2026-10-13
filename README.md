# 🎯 Misión: Casos de Uso

> **Misión 2 de 2 del curso.** Aprendizaje gamificado de casos de uso (UML) para estudiantes universitarios.
> Misión anterior: **🕰️ Misión: UML** (carpeta `uml-quest`), donde se explica qué es UML y por qué existe.

Una web interactiva en español para aprender a **identificar, modelar y especificar casos de uso**: actores, objetivos, relaciones «include» y «extend», generalización, construcción y revisión de diagramas y especificación textual (flujos, precondiciones y postcondiciones).

El estudiante entra como becario/a en la startup ficticia **NubeLab** y avanza por **8 niveles** guiado por **Ana Lista**, una analista senior robot. Gana XP, estrellas, rangos e insignias y, al vencer al jefe final, obtiene un certificado.

---

## 📑 Índice

1. [Resumen rápido](#-resumen-rápido)
2. [Requisitos](#-requisitos)
3. [Puertos](#-puertos)
4. [Cómo levantar la web con Docker](#-cómo-levantar-la-web-con-docker)
5. [Cómo comprobar que funciona](#-cómo-comprobar-que-funciona)
6. [Cómo detenerla y actualizarla](#-cómo-detenerla-y-actualizarla)
7. [Usarla en clase (varios ordenadores)](#-usarla-en-clase-varios-ordenadores)
8. [Contenido didáctico](#-contenido-didáctico)
9. [Mecánica de juego](#-mecánica-de-juego)
10. [Editar o ampliar el contenido](#-editar-o-ampliar-el-contenido)
11. [Estructura del proyecto](#-estructura-del-proyecto)
12. [Solución de problemas](#-solución-de-problemas)
13. [Tecnología](#-tecnología)

---

## ⚡ Resumen rápido

| Qué | Valor |
|---|---|
| Dirección de la web | **http://localhost:8080** |
| Arrancar (Windows) | Doble clic en **`iniciar.bat`** |
| Detener (Windows) | Doble clic en **`detener.bat`** |
| Arrancar (terminal) | `docker compose up -d --build` |
| Detener (terminal) | `docker compose down` |
| Nombre del contenedor | `casos-de-uso-quest` |
| Requisito único | **Docker Desktop** abierto |

---

## 🧰 Requisitos

Solo hace falta **Docker**. No hay que instalar Node.js, npm ni ninguna otra herramienta: todo se compila dentro de Docker.

| Sistema | Qué instalar |
|---|---|
| **Windows 10/11** | [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/) (usa WSL 2; el instalador lo configura) |
| **macOS** | [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop/) (Intel o Apple Silicon) |
| **Linux** | Docker Engine + el plugin **Docker Compose v2** (`docker compose`) |

Recomendaciones:

- Tener **conexión a internet la primera vez**. Docker descarga las imágenes base (`node:20-alpine` y `nginx:1.27-alpine`) y las librerías del proyecto. Después funciona sin conexión.
- Unos **500 MB libres** en disco para las imágenes.
- Un navegador moderno: **Chrome, Edge o Firefox**. La web está pensada para **pantallas de ordenador**, porque los retos de construir diagramas usan arrastrar y soltar.

Para comprobar que Docker está listo, abre una terminal y ejecuta:

```bash
docker --version
```

```bash
docker compose version
```

Si ambos comandos responden con un número de versión, todo está preparado.

---

## 🔌 Puertos

| Puerto | Para qué | Cuándo se usa |
|---|---|---|
| **8080** | **Versión para clase** (Nginx sirviendo la web compilada) | Siempre: es la que usan los estudiantes |
| **5173** | Versión de **desarrollo** con recarga automática | Solo si vas a editar preguntas o textos |

Puertos de los dos juegos del curso, que pueden funcionar **a la vez**:

| Juego | Clase | Desarrollo |
|---|---|---|
| 🕰️ **Misión: UML** | `http://localhost:8081` | `http://localhost:5174` |
| 🎯 **Misión: Casos de Uso** (este) | `http://localhost:8080` | `http://localhost:5173` |

> 🔗 El botón "Siguiente misión" de **Misión: UML** apunta a `http://localhost:8080`. Si cambias el puerto de este juego, actualiza también `NEXT_MISSION_URL` en `uml-quest/src/data/game.js`.

### Cambiar el puerto

Si el 8080 ya está ocupado en tu ordenador (es un puerto muy usado):

1. Abre `docker-compose.yml` y cambia el número de la **izquierda** en `ports`:
   ```yaml
   ports:
     - "9080:80"   # antes "8080:80"; el 80 de la derecha NO se toca
   ```
2. Cambia también la dirección en `iniciar.bat` (dos líneas con `http://localhost:8080`).
3. Vuelve a arrancar con `iniciar.bat` o `docker compose up -d --build`.

---

## 🚀 Cómo levantar la web con Docker

### Opción A: Windows con doble clic (la más fácil)

1. Abre **Docker Desktop** y espera a que indique que está en marcha (*Engine running*).
2. Entra en la carpeta `casos-de-uso-quest` y haz **doble clic en `iniciar.bat`**.
3. Se abre una ventana negra que construye la web. **La primera vez tarda 1–3 minutos**; después, unos segundos.
4. Al terminar se abre el navegador en **http://localhost:8080**.

### Opción B: desde una terminal (Windows, macOS o Linux)

1. Abre una terminal **dentro de la carpeta del proyecto**:
   - Windows: en el Explorador, entra en `casos-de-uso-quest`, escribe `cmd` en la barra de direcciones y pulsa Enter.
   - macOS/Linux: `cd ruta/a/casos-de-uso-quest`.
2. Construye y arranca el contenedor en segundo plano:
   ```bash
   docker compose up -d --build
   ```
3. Abre **http://localhost:8080** en el navegador.

Qué significa cada parte del comando:

| Parte | Significado |
|---|---|
| `docker compose up` | Crea y arranca el servicio `web` definido en `docker-compose.yml` |
| `-d` | Lo deja funcionando en segundo plano, así puedes cerrar la terminal |
| `--build` | Vuelve a compilar la web; necesario la primera vez y tras cualquier cambio |

### Levantar los dos juegos del curso a la vez

Desde una terminal en la carpeta que contiene ambos proyectos (por ejemplo, el Escritorio):

```bash
docker compose -f casos-de-uso-quest/docker-compose.yml up -d --build
```

```bash
docker compose -f uml-quest/docker-compose.yml up -d --build
```

O haz doble clic en el `iniciar.bat` de cada carpeta.

### ¿Qué hace Docker por dentro?

El `Dockerfile` construye la web en **dos etapas**:

1. **Compilación** (`node:20-alpine`): instala las dependencias y ejecuta `npm run build`, que genera la web optimizada en `dist/`.
2. **Servidor** (`nginx:1.27-alpine`): copia solo la carpeta `dist/` y la sirve con Nginx en el puerto 80 del contenedor.

`docker-compose.yml` conecta el **puerto 8080 de tu ordenador** con el puerto 80 del contenedor. Además lo configura con `restart: unless-stopped`, así que la web **vuelve a arrancar sola** al reiniciar el ordenador, siempre que Docker Desktop esté abierto.

---

## ✅ Cómo comprobar que funciona

```bash
docker compose ps
```

Debe aparecer el contenedor `casos-de-uso-quest` con estado `Up` (o `running`) y el puerto `0.0.0.0:8080->80/tcp`.

Para ver los mensajes del servidor:

```bash
docker compose logs -f web
```

(Pulsa `Ctrl + C` para salir; la web sigue funcionando.)

---

## 🛑 Cómo detenerla y actualizarla

| Acción | Windows | Terminal |
|---|---|---|
| Detener | Doble clic en `detener.bat` | `docker compose down` |
| Volver a arrancar | Doble clic en `iniciar.bat` | `docker compose up -d --build` |
| Aplicar cambios del contenido | Doble clic en `iniciar.bat` | `docker compose up -d --build` |
| Reconstruir desde cero (si algo raro pasa) | — | `docker compose build --no-cache` y después `docker compose up -d` |

> Detener el contenedor **no borra el progreso** de los estudiantes, porque se guarda en su navegador (ver más abajo).

---

## 🏫 Usarla en clase (varios ordenadores)

Hay dos formas de usarla en el aula:

**1. Cada estudiante en su propio ordenador** (recomendado si tienen Docker). Cada uno copia la carpeta y ejecuta `iniciar.bat`.

**2. Un solo ordenador (el del profesor/a) sirve la web a toda la clase** por la red local:

1. Levanta la web en tu ordenador como siempre.
2. Averigua tu IP local:
   - Windows: ejecuta `ipconfig` y busca *Dirección IPv4*, por ejemplo `192.168.1.50`.
   - macOS/Linux: ejecuta `ipconfig getifaddr en0` o `hostname -I`.
3. Los estudiantes abren **`http://TU-IP:8080`**, por ejemplo `http://192.168.1.50:8080`, conectados a la **misma red**.
4. Si no carga, permite el puerto en el **Firewall de Windows**. Ejecuta esto en PowerShell como administrador:
   ```powershell
   New-NetFirewallRule -DisplayName "Mision Casos de Uso 8080" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow
   ```
   Algunas redes universitarias aíslan los equipos entre sí; en ese caso usa la opción 1.

> Si los estudiantes vienen de **Misión: UML** por la red local, el botón "Siguiente misión" apunta a `localhost:8080`, que en su ordenador no existe. Dales directamente la dirección `http://TU-IP:8080`, o cambia `NEXT_MISSION_URL` en `uml-quest/src/data/game.js` a tu IP y reconstruye ese juego.

### Sobre el progreso de los estudiantes

- Se guarda en el **navegador de cada estudiante** (`localStorage`). No hay base de datos ni cuentas.
- Si cambian de navegador u ordenador, o borran los datos de navegación, empiezan de cero.
- Desde el mapa, el botón **"Reiniciar progreso"** borra la partida de ese navegador.
- Al terminar, cada estudiante obtiene un **certificado imprimible** (o guardable como PDF) con su nombre, rango, XP, estrellas e insignias. Puede servir como evidencia de actividad.

---

## 📚 Contenido didáctico

### Orden recomendado en el curso

1. 🕰️ **Misión: UML**: qué es UML, de dónde viene y sus diagramas principales.
2. 🎯 **Misión: Casos de Uso** (este juego): profundiza en los casos de uso.

### 🗺️ Niveles

| # | Nivel | Qué se aprende | Retos |
|---|---|---|---|
| 1 | 🎯 ¿Qué es un caso de uso? | Concepto, piezas del diagrama (actor, caso de uso, límite del sistema), nombrado con verbo + complemento, requisitos funcionales | 5 |
| 2 | 🎭 Actores | El actor como rol externo; personas, sistemas externos, dispositivos y el tiempo; actor primario frente a secundario; errores típicos | 5 |
| 3 | 🔍 Cazando casos de uso | Descubrir casos de uso a partir de un relato; la "prueba del jefe" de Larman; qué no es un caso de uso | 5 |
| 4 | 🔗 Relaciones | Asociación, «include» (obligatorio), «extend» (opcional), generalización de actores y de casos de uso, dirección de las flechas | 6 |
| 5 | 🧩 Arquitecto de diagramas | Construir diagramas completos arrastrando piezas (plataforma de cursos, biblioteca y tienda online) | 3 |
| 6 | 🕵️ Detective de errores | Encontrar errores en diagramas: actores dentro del sistema, nombres de clic, flechas al revés, asociaciones entre actores… | 3 |
| 7 | 📝 Especificación textual | Plantilla, precondiciones y postcondiciones, flujo principal, flujos alternativos y escenarios | 6 |
| 8 | 👾 Jefe final: el Cajero | Reto mixto sobre un cajero automático (150 XP por acierto) | 7 |

Además:

- **📘 Apuntes**: una chuleta de repaso con los conceptos, ejemplos de cada relación, una plantilla de especificación completa y los errores típicos.
- **🏆 Logros**: 11 insignias.
- **🎓 Certificado** al derrotar al jefe final.

---

## 🎮 Mecánica de juego

| Elemento | Cómo funciona |
|---|---|
| **Lección** | Cada nivel empieza con diapositivas cortas de Ana Lista (se pueden saltar si el nivel ya está superado) |
| **Tipos de reto** | ❓ pregunta · ☑️ selección múltiple · 🗂️ clasificar · 🔢 ordenar · 🧩 construir un diagrama arrastrando piezas · 🕵️ encontrar errores en un diagrama |
| **Vidas** | 3 ❤️ por nivel. Cada fallo resta una; sin vidas, se repite el nivel |
| **XP** | 100 por acierto (150 en el jefe final). En los retos de varias partes, un acierto parcial da algo de XP pero cuesta una vida |
| **Racha 🔥** | Bonus de +10 XP por cada acierto seguido (máximo +50) |
| **Estrellas** | ⭐⭐⭐ sin fallos · ⭐⭐ con 1 fallo · ⭐ con 2. Cada estrella suma 50 XP |
| **Mejor marca** | Repetir un nivel solo cuenta si se mejora la puntuación (no se puede "farmear" XP) |
| **Rangos** | 🐣 Becario/a → 🌱 Analista Junior → 🧠 Analista → 🚀 Analista Senior → 🏛️ Arquitecto/a de Requisitos → 👑 Leyenda UML |
| **Sonido** | Efectos sintetizados, con botón 🔊 para silenciarlos |
| **Teclado** | Teclas `1`–`4` para responder preguntas, `Enter` para continuar y flechas para avanzar en las lecciones |

---

## ✏️ Editar o ampliar el contenido

Todo el contenido está en archivos de texto dentro de `src/data/`. No hace falta tocar el código de la web.

| Archivo | Qué contiene |
|---|---|
| `src/data/levels.js` | Los 8 niveles: lecciones y retos |
| `src/data/diagrams.js` | Los diagramas de casos de uso de las lecciones y los apuntes |
| `src/data/game.js` | Rangos, insignias y puntuaciones |

### Ver los cambios en directo (modo desarrollo)

```bash
docker compose --profile dev up dev
```

Abre **http://localhost:5173**. Cada vez que guardes un archivo, la página se actualiza sola. Para salir, pulsa `Ctrl + C`.

Cuando termines, **actualiza la versión de clase** con `iniciar.bat` o `docker compose up -d --build`.

### Ejemplos de retos

En los textos, `**negrita**` se resalta automáticamente.

**Pregunta** (la respuesta correcta es el índice `answer`, empezando en 0; las opciones se barajan solas; `diagram` es opcional):

```js
{
  type: 'quiz',
  question: '¿Dónde se dibujan los actores?',
  options: ['Fuera del límite del sistema', 'Dentro del límite del sistema', 'Dentro de los óvalos'],
  answer: 0,
  explanation: 'Los actores son externos al sistema.',
}
```

**Clasificar:**

```js
{
  type: 'classify',
  question: '¿Qué relación usarías en cada situación?',
  bins: [
    { id: 'inc', label: '🔒 «include»' },
    { id: 'ext', label: '🎲 «extend»' },
  ],
  items: [
    { text: '«Comprar billete» siempre requiere «Verificar disponibilidad»', bin: 'inc' },
    { text: 'Opcionalmente se puede «Añadir seguro de viaje»', bin: 'ext' },
  ],
  explanation: '…',
}
```

**Ordenar** (escribe los pasos en el orden correcto; el juego los baraja):

```js
{ type: 'order', question: 'Ordena el flujo principal', steps: ['Paso 1', 'Paso 2', 'Paso 3'], explanation: '…' }
```

**Selección múltiple:** `type: 'pick'` con `options: [{ text, correct: true/false }]`.

### Diagramas de casos de uso

Los diagramas se describen con coordenadas en un lienzo de `w` × `h`:

```js
{
  w: 600, h: 260,
  boundary: { x: 180, y: 15, w: 400, h: 230, title: 'Sistema de biblioteca' },
  actors:   [{ id: 'est', x: 80, y: 120, label: 'Estudiante' }],
  useCases: [{ id: 'buscar', x: 380, y: 85, label: 'Buscar libro' }],
  links:    [{ from: 'est', to: 'buscar', type: 'assoc' }],  // assoc | include | extend | gen
}
```

- En **«include»** la flecha va del caso base al incluido: `{ from: 'base', to: 'incluido', type: 'include' }`.
- En **«extend»** va del que extiende al base: `{ from: 'extension', to: 'base', type: 'extend' }`.
- En **generalización**, `from` es el hijo y `to` el padre.

En los retos **construir** (`builder`), cada actor o caso de uso con `slot: true` se convierte en un hueco, y `decoys` añade piezas trampa. En **encontrar errores** (`spot`), cada marcador tiene posición `x`/`y`, `error: true/false` y una explicación en `note`. Lo más fácil es copiar uno existente de `levels.js` como plantilla.

---

## 🗂️ Estructura del proyecto

```
casos-de-uso-quest/
├── iniciar.bat / detener.bat   ← arrancar y parar con doble clic (Windows)
├── docker-compose.yml          ← puertos 8080 (clase) y 5173 (desarrollo)
├── Dockerfile                  ← compila con Node y sirve con Nginx
├── nginx.conf                  ← configuración del servidor web
├── package.json                ← dependencias (React, Vite, confeti, tipografía)
└── src/
    ├── data/                   ← CONTENIDO editable (niveles, diagramas, reglas)
    ├── components/
    │   ├── Welcome.jsx         ← pantalla de bienvenida
    │   ├── LevelMap.jsx        ← mapa de niveles
    │   ├── LevelPlayer.jsx     ← lección, retos, vidas, XP y resultados
    │   ├── Diagram.jsx         ← dibujo de diagramas de casos de uso (SVG)
    │   ├── Mascot.jsx          ← Ana Lista
    │   └── challenges/         ← los 6 tipos de reto
    ├── lib/                    ← progreso guardado, sonidos y utilidades
    └── styles.css              ← estilos
```

---

## 🩺 Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| `iniciar.bat` dice *"No se pudo arrancar"* | Docker Desktop no está abierto | Abre Docker Desktop, espera a *Engine running* y vuelve a intentarlo |
| `failed to connect to the docker API` | Igual que el anterior | Igual que el anterior |
| `port is already allocated` | Otro programa usa el puerto 8080 (es habitual) | Cambia el puerto (ver [Puertos](#cambiar-el-puerto)) |
| `no such host` o error de red al construir | Docker acaba de arrancar y aún no tiene red, o no hay internet | Espera unos segundos y repite. La primera vez necesita internet |
| Error al construir relacionado con *bake* o *buildkit* | Algunas versiones de Docker Compose | Ejecuta `set COMPOSE_BAKE=false` (Windows cmd) o `export COMPOSE_BAKE=false` (macOS/Linux) y repite. `iniciar.bat` ya lo hace |
| No veo mis cambios | No se reconstruyó la imagen, o el navegador usa la caché | `docker compose up -d --build` y recarga con `Ctrl + F5` |
| Arrastrar piezas no funciona | Pantalla táctil o navegador antiguo | También se puede **hacer clic en la pieza y luego en el hueco** |
| Un estudiante perdió su progreso | Cambió de navegador o borró los datos de navegación | El progreso vive en cada navegador; debe usar siempre el mismo |

---

## 🛠️ Tecnología

- **React 18 + Vite 5**: interfaz y compilación.
- **SVG propio**: los diagramas de casos de uso se dibujan en el navegador, sin imágenes.
- **canvas-confetti**: celebraciones. **Web Audio API**: sonidos sintetizados, sin archivos de audio.
- **Fuente Outfit**: incluida en el proyecto, no depende de internet.
- **Docker** (Node 20 para compilar, Nginx 1.27 para servir).
