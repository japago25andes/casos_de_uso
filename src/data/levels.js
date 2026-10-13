import {
  DIAGRAM_BASICO, DIAGRAM_INCLUDE, DIAGRAM_EXTEND, DIAGRAM_GEN, DIAGRAM_GEN_UC, DIAGRAM_ACTORES,
} from './diagrams.js';

/*
  Tipos de reto:
  - quiz:     una respuesta correcta (options + answer = índice)
  - pick:     selección múltiple (options: [{ text, correct }])
  - classify: asignar cada elemento a una categoría (bins + items: [{ text, bin }])
  - order:    ordenar pasos (steps en el orden correcto; se barajan al jugar)
  - builder:  completar un diagrama (elementos con slot: true + decoys)
  - spot:     encontrar errores en un diagrama (markers con error: true/false)
  En los textos, **negrita** se resalta.
*/

export const LEVELS = [
  // ───────────────────────────── 1
  {
    id: 'fundamentos',
    icon: '🎯',
    title: '¿Qué es un caso de uso?',
    subtitle: 'Los fundamentos',
    color: '#8b5cf6',
    lesson: [
      {
        title: '¡Bienvenido/a a NubeLab!',
        mood: 'happy',
        text: 'Soy **Ana Lista**, analista senior. Nuestros clientes nos piden software, pero rara vez saben explicarlo bien. Para entenderlos usamos una herramienta poderosa: **los casos de uso**.',
      },
      {
        title: 'La idea clave',
        text: 'Un **caso de uso** describe lo que un sistema hace para que un **actor** logre un **objetivo de valor**. Se centra en el **QUÉ**, no en el **CÓMO**.',
        points: [
          'Captura **requisitos funcionales** desde el punto de vista del usuario.',
          'Usa el idioma del cliente, no el del programador.',
          'Los propuso **Ivar Jacobson** (1987) y hoy forman parte de **UML**.',
        ],
      },
      {
        title: 'Las piezas del diagrama',
        text: 'Un diagrama de casos de uso tiene pocas piezas, pero cada una importa:',
        points: [
          '🧍 **Actor** (monigote): quien interactúa con el sistema desde fuera.',
          '⬭ **Caso de uso** (óvalo): un objetivo que el sistema ayuda a cumplir.',
          '▭ **Límite del sistema** (rectángulo): lo que queda dentro es responsabilidad del sistema.',
          '— **Relaciones** (líneas): quién participa en qué.',
        ],
        diagram: DIAGRAM_BASICO,
      },
      {
        title: 'Cómo se nombran',
        text: 'Un caso de uso se nombra con un **verbo en infinitivo + complemento**: «Retirar efectivo», «Reservar sala», «Publicar calificaciones».',
        tip: 'Si el nombre describe un clic, una pantalla o una tabla de la base de datos… no es un caso de uso.',
      },
    ],
    challenges: [
      {
        type: 'quiz',
        question: '¿Qué describe principalmente un caso de uso?',
        options: [
          'Una interacción entre un actor y el sistema para lograr un objetivo de valor',
          'Cómo se implementa una funcionalidad en el código',
          'La estructura de la base de datos',
          'El diseño visual de las pantallas',
        ],
        answer: 0,
        explanation: 'Un caso de uso describe QUÉ hace el sistema para que un actor logre un objetivo. El CÓMO (código, base de datos, pantallas) viene después.',
      },
      {
        type: 'quiz',
        question: 'En UML, ¿cómo se representa un caso de uso?',
        options: ['Con un óvalo que contiene su nombre', 'Con un rectángulo de dos compartimentos', 'Con un monigote', 'Con un rombo'],
        answer: 0,
        explanation: 'El caso de uso es un óvalo (elipse). El monigote es el actor y el rectángulo es el límite del sistema.',
      },
      {
        type: 'pick',
        question: '¿Cuáles de estos nombres están bien escritos como casos de uso?',
        hint: 'Selecciona todos los correctos.',
        options: [
          { text: 'Retirar efectivo', correct: true },
          { text: 'Pulsar el botón Aceptar', correct: false },
          { text: 'Comprar entrada', correct: true },
          { text: 'Base de datos de clientes', correct: false },
          { text: 'Registrar calificaciones', correct: true },
          { text: 'Pantalla de inicio', correct: false },
        ],
        explanation: 'Los buenos nombres son verbo en infinitivo + complemento y expresan un objetivo. Un botón, una pantalla o una tabla no son objetivos del usuario.',
      },
      {
        type: 'quiz',
        question: '¿Qué representa el rectángulo que rodea a los casos de uso?',
        diagram: DIAGRAM_BASICO,
        options: [
          'El límite del sistema: lo que está dentro es responsabilidad del sistema',
          'Un paquete de clases del código',
          'Un actor colectivo',
          'La base de datos',
        ],
        answer: 0,
        explanation: 'El rectángulo es el límite del sistema (system boundary). Los casos de uso van dentro; los actores, siempre fuera.',
      },
      {
        type: 'quiz',
        question: '¿Qué tipo de requisitos capturan principalmente los casos de uso?',
        options: [
          'Requisitos funcionales (lo que el sistema debe hacer)',
          'Requisitos de rendimiento (velocidad, carga)',
          'Requisitos de hardware',
          'Requisitos de estilo visual',
        ],
        answer: 0,
        explanation: 'Los casos de uso capturan requisitos funcionales. Los no funcionales (rendimiento, seguridad, usabilidad…) se documentan aparte, aunque pueden asociarse a un caso.',
      },
    ],
  },

  // ───────────────────────────── 2
  {
    id: 'actores',
    icon: '🎭',
    title: 'Actores',
    subtitle: 'Quién está fuera del sistema',
    color: '#06b6d4',
    lesson: [
      {
        title: '¿Qué es un actor?',
        text: 'Un **actor** es un **ROL** que alguien o algo desempeña al interactuar con el sistema. Siempre está **FUERA** del límite del sistema.',
        diagram: DIAGRAM_ACTORES,
      },
      {
        title: 'Tipos de actores',
        text: 'Un actor no tiene por qué ser una persona:',
        points: [
          '👩‍🎓 **Personas**: Cliente, Docente, Bibliotecario/a.',
          '🖥️ **Sistemas externos**: Pasarela de pago, Servicio de correo.',
          '📡 **Dispositivos**: un sensor o un lector externo.',
          '⏰ **El tiempo**: un temporizador que dispara procesos programados.',
        ],
      },
      {
        title: 'Primarios y secundarios',
        text: 'Según su papel en cada caso de uso:',
        points: [
          '**Actor primario**: inicia el caso de uso para lograr SU objetivo.',
          '**Actor secundario (de soporte)**: el sistema lo necesita para cumplir el caso. Ej.: la Pasarela de pago en «Pagar pedido».',
        ],
        tip: 'Los primarios se suelen dibujar a la izquierda y los secundarios a la derecha.',
      },
      {
        title: '¡Cuidado con las trampas!',
        mood: 'wow',
        text: 'Errores muy comunes al identificar actores:',
        points: [
          '«María» **no** es un actor; «Bibliotecaria» **sí**. Los actores son roles, no personas concretas.',
          'Una misma persona puede desempeñar **varios roles** (varios actores).',
          'Las piezas **internas** del sistema (su base de datos, un botón, un módulo) **no** son actores.',
        ],
      },
    ],
    challenges: [
      {
        type: 'classify',
        question: 'Sistema: app de delivery «ÑamÑam». ¿Cuáles son actores?',
        bins: [
          { id: 'si', label: '🧍 Es actor' },
          { id: 'no', label: '🚫 No es actor' },
        ],
        items: [
          { text: 'Cliente', bin: 'si' },
          { text: 'Repartidor', bin: 'si' },
          { text: 'Pasarela de pago', bin: 'si' },
          { text: 'La base de datos interna de la app', bin: 'no' },
          { text: 'Botón «Pedir ahora»', bin: 'no' },
          { text: 'Restaurante', bin: 'si' },
          { text: 'Juan Pérez', bin: 'no' },
        ],
        explanation: 'Cliente, Repartidor, Restaurante y la Pasarela de pago (sistema externo) son actores. La base de datos interna y el botón son parte del sistema, y «Juan Pérez» es una persona concreta, no un rol.',
      },
      {
        type: 'quiz',
        question: 'Cada noche a las 00:00 el sistema genera automáticamente el reporte de ventas. ¿Qué actor inicia este caso de uso?',
        options: ['El Tiempo (un temporizador)', 'El Gerente', 'La base de datos', 'Ninguno: un caso de uso no puede iniciarse solo'],
        answer: 0,
        explanation: 'Cuando un proceso se dispara por calendario, el actor que lo inicia es el Tiempo (a veces llamado Reloj o Temporizador).',
      },
      {
        type: 'classify',
        question: 'En «ÑamÑam», ¿qué papel tiene cada actor en cada caso de uso?',
        bins: [
          { id: 'pri', label: '⭐ Primario' },
          { id: 'sec', label: '🤝 Secundario' },
        ],
        items: [
          { text: 'Cliente en «Pagar pedido»', bin: 'pri' },
          { text: 'Pasarela de pago en «Pagar pedido»', bin: 'sec' },
          { text: 'Repartidor en «Confirmar entrega»', bin: 'pri' },
          { text: 'Servicio de mapas en «Calcular ruta de reparto»', bin: 'sec' },
          { text: 'Restaurante en «Actualizar menú»', bin: 'pri' },
        ],
        explanation: 'El primario inicia el caso para lograr su objetivo; el secundario presta un servicio que el sistema necesita (pagos, mapas…).',
      },
      {
        type: 'quiz',
        question: '¿Dónde se dibujan los actores en un diagrama de casos de uso?',
        options: ['Fuera del límite del sistema', 'Dentro del límite del sistema', 'Dentro de los óvalos', 'En cualquier sitio, da igual'],
        answer: 0,
        explanation: 'Los actores son externos al sistema, así que van siempre fuera del rectángulo que marca su límite.',
      },
      {
        type: 'quiz',
        question: 'Ana es profesora y además cursa un máster en la misma universidad. En el sistema académico…',
        options: [
          'Desempeña dos roles: Docente y Estudiante, que son dos actores distintos',
          'Es un único actor llamado «Ana»',
          'No puede ser actor porque tiene dos roles',
          'Hay que crear un actor «Docente-Estudiante»',
        ],
        answer: 0,
        explanation: 'Los actores son roles. Una persona puede desempeñar varios roles y, en cada momento, interactúa con el sistema como uno de ellos.',
      },
    ],
  },

  // ───────────────────────────── 3
  {
    id: 'descubrir',
    icon: '🔍',
    title: 'Cazando casos de uso',
    subtitle: 'Del relato al diagrama',
    color: '#ec4899',
    lesson: [
      {
        title: 'Pregunta por los objetivos',
        text: 'Para descubrir casos de uso, toma cada actor y pregúntale: **¿qué quieres lograr con el sistema?** Cada objetivo de valor suele convertirse en un caso de uso.',
      },
      {
        title: 'La prueba del jefe',
        mood: 'happy',
        text: 'Craig Larman propone esta prueba: tu jefe te pregunta **«¿Qué has hecho hoy?»** y respondes con el nombre del caso de uso.',
        points: [
          '«He **registrado 40 préstamos**» → 😀 Tu jefe está contento: es un buen caso de uso.',
          '«He **validado el formato del correo**» → 😐 Eso es solo un paso dentro de otro caso.',
        ],
      },
      {
        title: 'Lo que NO es un caso de uso',
        text: 'Descarta:',
        points: [
          '🖱️ **Pasos de interfaz**: «Hacer clic en Buscar», «Escribir el título».',
          '⚙️ **Tareas internas**: «Conectar con la base de datos», «Cifrar la contraseña».',
          '🧱 **Cosas**: «Pantalla de inicio», «Tabla de usuarios».',
        ],
        tip: 'Pregúntate siempre: ¿el actor obtiene algo de valor al terminar?',
      },
      {
        title: 'Caso práctico: la Biblioteca Central',
        text: 'Practicaremos con este relato. Léelo con atención:',
        story: 'La Biblioteca Central quiere un sistema. Los **estudiantes** buscan libros en el catálogo, reservan ejemplares y consultan sus préstamos. El **bibliotecario** registra préstamos y devoluciones y da de alta libros nuevos. Si un estudiante devuelve tarde, el sistema calcula una multa. Cada noche, el sistema envía recordatorios de vencimiento usando el **servicio de correo** de la universidad.',
      },
    ],
    challenges: [
      {
        type: 'pick',
        story: 'Los estudiantes buscan libros en el catálogo, reservan ejemplares y consultan sus préstamos. El bibliotecario registra préstamos y devoluciones y da de alta libros nuevos.',
        question: 'Según el relato, ¿cuáles son casos de uso adecuados?',
        hint: 'Selecciona todos los correctos.',
        options: [
          { text: 'Buscar libro', correct: true },
          { text: 'Reservar ejemplar', correct: true },
          { text: 'Hacer clic en «Buscar»', correct: false },
          { text: 'Registrar préstamo', correct: true },
          { text: 'Conectar con la base de datos', correct: false },
          { text: 'Registrar devolución', correct: true },
          { text: 'Escribir el título en el cuadro de texto', correct: false },
        ],
        explanation: 'Buscar, reservar, registrar préstamo y registrar devolución son objetivos de valor. Hacer clic, escribir en un cuadro o conectar con la base de datos son pasos o detalles internos.',
      },
      {
        type: 'classify',
        question: '¿Qué actor inicia cada caso de uso de la biblioteca?',
        bins: [
          { id: 'est', label: '🎓 Estudiante' },
          { id: 'bib', label: '📚 Bibliotecario' },
          { id: 'tiempo', label: '⏰ Tiempo' },
        ],
        items: [
          { text: 'Reservar ejemplar', bin: 'est' },
          { text: 'Registrar préstamo', bin: 'bib' },
          { text: 'Enviar recordatorios de vencimiento', bin: 'tiempo' },
          { text: 'Consultar mis préstamos', bin: 'est' },
          { text: 'Dar de alta libro', bin: 'bib' },
          { text: 'Registrar devolución', bin: 'bib' },
        ],
        explanation: 'Los recordatorios se envían «cada noche»: los dispara el Tiempo. El resto los inicia la persona que obtiene el valor.',
      },
      {
        type: 'quiz',
        question: '¿Cuál de estos casos de uso NO supera la prueba del jefe?',
        options: ['Validar formato del correo electrónico', 'Reservar ejemplar', 'Registrar préstamo', 'Dar de alta libro'],
        answer: 0,
        explanation: 'Validar el formato del correo es un paso pequeño dentro de otro caso de uso (por ejemplo, registrarse). Nadie termina su jornada satisfecho solo por eso.',
      },
      {
        type: 'quiz',
        question: 'El servicio de correo de la universidad, que el sistema usa para enviar los recordatorios, es…',
        options: ['Un actor secundario (sistema externo)', 'Un caso de uso', 'Parte del límite del sistema', 'Un actor primario'],
        answer: 0,
        explanation: 'Es un sistema externo que presta un servicio que nuestro sistema necesita: un actor secundario.',
      },
      {
        type: 'pick',
        question: 'Sistema de venta de entradas de un cine. ¿Cuáles son objetivos de valor para el Cliente?',
        hint: 'Selecciona todos los correctos.',
        options: [
          { text: 'Comprar entradas', correct: true },
          { text: 'Consultar cartelera', correct: true },
          { text: 'Cargar la imagen del póster', correct: false },
          { text: 'Cancelar compra', correct: true },
          { text: 'Abrir la app', correct: false },
          { text: 'Cifrar la contraseña', correct: false },
        ],
        explanation: 'Comprar, consultar la cartelera y cancelar aportan valor al cliente. Cargar imágenes o cifrar contraseñas son detalles internos, y abrir la app no es un objetivo.',
      },
    ],
  },

  // ───────────────────────────── 4
  {
    id: 'relaciones',
    icon: '🔗',
    title: 'Relaciones',
    subtitle: 'include, extend y generalización',
    color: '#f59e0b',
    lesson: [
      {
        title: 'Asociación',
        text: 'La **asociación** es una línea continua entre un actor y un caso de uso. Indica que el actor **participa** en ese caso de uso.',
        diagram: DIAGRAM_BASICO,
      },
      {
        title: '«include»: siempre 🔒',
        text: 'Un caso base **SIEMPRE** incorpora el comportamiento de otro. Sirve para **factorizar** comportamiento común a varios casos.',
        points: [
          'Flecha **discontinua** con el estereotipo «include».',
          'Va **DESDE el caso base HACIA el incluido**.',
          'El caso base no está completo sin el incluido.',
        ],
        diagram: DIAGRAM_INCLUDE,
      },
      {
        title: '«extend»: a veces 🎲',
        text: 'Un caso **añade comportamiento OPCIONAL** o condicional a un caso base, en un **punto de extensión**.',
        points: [
          'Flecha **discontinua** con el estereotipo «extend».',
          'Va **DESDE el que extiende HACIA el caso base** (¡al revés que include!).',
          'El caso base está completo por sí solo, sin la extensión.',
        ],
        diagram: DIAGRAM_EXTEND,
      },
      {
        title: 'Generalización entre actores',
        text: 'Una línea continua con **triángulo hueco** apuntando al padre. El hijo **es un tipo de** padre y **hereda sus asociaciones**.',
        diagram: DIAGRAM_GEN,
        tip: 'El Cliente VIP puede «Comprar producto» aunque no tenga línea directa: lo hereda de Cliente.',
      },
      {
        title: 'Generalización entre casos de uso',
        text: 'También se aplica a casos de uso: «Pagar con tarjeta» y «Pagar con PayPal» son **formas concretas** de «Pagar pedido».',
        diagram: DIAGRAM_GEN_UC,
        tip: 'Truco para el examen: include = obligatorio 🔒 · extend = opcional 🎲 · generalización = «es un tipo de» 🧬',
      },
    ],
    challenges: [
      {
        type: 'classify',
        question: '¿Qué relación usarías en cada situación?',
        bins: [
          { id: 'inc', label: '🔒 «include»' },
          { id: 'ext', label: '🎲 «extend»' },
          { id: 'gen', label: '🧬 Generalización' },
        ],
        items: [
          { text: '«Comprar billete» siempre requiere «Verificar disponibilidad»', bin: 'inc' },
          { text: 'Al comprar un billete, el cliente puede opcionalmente «Añadir seguro de viaje»', bin: 'ext' },
          { text: '«Pagar con PayPal» es una forma concreta de «Pagar»', bin: 'gen' },
          { text: '«Matricularse» y «Solicitar beca» siempre incluyen «Validar identidad»', bin: 'inc' },
          { text: 'Si el usuario olvidó su contraseña en «Iniciar sesión», puede «Recuperar contraseña»', bin: 'ext' },
          { text: 'El actor «Administrador» puede hacer todo lo que hace «Usuario» y más', bin: 'gen' },
        ],
        explanation: 'Obligatorio y compartido → include. Opcional o condicional → extend. «Es un tipo de» → generalización.',
      },
      {
        type: 'quiz',
        question: '¿Qué significa la flecha de este diagrama?',
        diagram: DIAGRAM_INCLUDE,
        options: [
          'Cada vez que se retira efectivo, se ejecuta «Autenticar cliente»',
          '«Autenticar cliente» a veces añade comportamiento a «Retirar efectivo»',
          '«Retirar efectivo» es un tipo de «Autenticar cliente»',
          'El cliente decide si se autentica o no',
        ],
        answer: 0,
        explanation: '«include» significa que el caso base (Retirar efectivo) SIEMPRE ejecuta el incluido (Autenticar cliente).',
      },
      {
        type: 'quiz',
        question: 'En una relación «extend», ¿hacia dónde apunta la flecha?',
        options: [
          'Desde el caso que extiende hacia el caso base',
          'Desde el caso base hacia el caso que extiende',
          'Desde el actor hacia el caso de uso',
          'No lleva flecha',
        ],
        answer: 0,
        explanation: 'En «extend» la flecha va del caso que añade el comportamiento opcional hacia el caso base. Es justo al revés que en «include».',
      },
      {
        type: 'quiz',
        question: 'Según este diagrama, ¿qué afirmación es cierta?',
        diagram: DIAGRAM_EXTEND,
        options: [
          '«Retirar efectivo» puede completarse sin imprimir el recibo',
          '«Imprimir recibo» se ejecuta siempre',
          '«Imprimir recibo» es el caso base',
          '«Retirar efectivo» hereda de «Imprimir recibo»',
        ],
        answer: 0,
        explanation: '«Imprimir recibo» extiende a «Retirar efectivo»: es opcional. El caso base está completo sin la extensión.',
      },
      {
        type: 'quiz',
        question: '¿Puede el Cliente VIP «Comprar producto»?',
        diagram: DIAGRAM_GEN,
        options: [
          'Sí, porque hereda las asociaciones de Cliente',
          'No, porque no tiene una línea directa con ese caso',
          'Solo si se añade un «include»',
          'Solo como actor secundario',
        ],
        answer: 0,
        explanation: 'La generalización indica que el Cliente VIP es un tipo de Cliente y hereda todas sus asociaciones.',
      },
      {
        type: 'quiz',
        question: '¿Cuál de estos es un MAL uso de «include»?',
        options: [
          'Partir un caso en «Paso 1», «Paso 2», «Paso 3»… como si fuera un diagrama de flujo',
          'Factorizar «Autenticar» porque lo usan varios casos de uso',
          'Reutilizar «Buscar producto» en «Comprar» y en «Comparar precios»',
          'Separar un comportamiento obligatorio que se repite en varios casos',
        ],
        answer: 0,
        explanation: 'Usar include para descomponer funcionalmente un caso en pasos es un error clásico. Los diagramas de casos de uso no son diagramas de flujo.',
      },
    ],
  },

  // ───────────────────────────── 5
  {
    id: 'constructor',
    icon: '🧩',
    title: 'Arquitecto de diagramas',
    subtitle: 'Construye diagramas pieza a pieza',
    color: '#22c55e',
    lesson: [
      {
        title: '¡Manos a la obra!',
        mood: 'happy',
        text: 'Ahora te toca construir. Verás un diagrama con **huecos vacíos** y unas piezas abajo.',
        points: [
          '🖱️ **Arrastra** cada pieza a su hueco, o haz **clic en la pieza y luego en el hueco**.',
          '↩️ Haz clic en un hueco ocupado para devolver la pieza.',
          '🔎 Las **relaciones dibujadas** son tu mejor pista: fíjate en los «include», «extend» y triángulos.',
          '🪤 Algunas piezas son **trampas** y no van en ningún hueco.',
        ],
      },
    ],
    challenges: [
      {
        type: 'builder',
        question: 'Completa el diagrama de «AprendeYa»',
        story: 'El **Estudiante** se inscribe en cursos. Inscribirse siempre implica **pagar el curso**, cosa que procesa la **Pasarela de pago** externa. El estudiante también puede **ver lecciones** y, mientras ve una, puede opcionalmente **descargar materiales**.',
        diagram: {
          w: 800, h: 430,
          boundary: { x: 170, y: 20, w: 460, h: 390, title: 'AprendeYa' },
          actors: [
            { id: 'a1', x: 85, y: 200, label: 'Estudiante', slot: true },
            { id: 'a2', x: 715, y: 105, label: 'Pasarela de pago', slot: true },
          ],
          useCases: [
            { id: 'u1', x: 285, y: 110, label: 'Inscribirse en curso', slot: true },
            { id: 'u2', x: 540, y: 110, label: 'Pagar curso', slot: true },
            { id: 'u3', x: 285, y: 310, label: 'Ver lección', slot: true },
            { id: 'u4', x: 540, y: 310, label: 'Descargar materiales', slot: true },
          ],
          links: [
            { from: 'a1', to: 'u1', type: 'assoc' },
            { from: 'a1', to: 'u3', type: 'assoc' },
            { from: 'u1', to: 'u2', type: 'include' },
            { from: 'a2', to: 'u2', type: 'assoc' },
            { from: 'u4', to: 'u3', type: 'extend' },
          ],
        },
        decoys: ['Base de datos', 'Hacer clic en Pagar'],
        explanation: '«Inscribirse en curso» incluye «Pagar curso» (obligatorio), y «Descargar materiales» extiende «Ver lección» (opcional). La Pasarela de pago es el actor secundario.',
      },
      {
        type: 'builder',
        question: 'Completa el diagrama de la Biblioteca',
        story: 'El **Socio** reserva libros. El **Bibliotecario** registra préstamos y devoluciones; en ambos casos siempre hay que **verificar al socio**. Si la devolución llega tarde, se **calcula una multa**.',
        diagram: {
          w: 800, h: 470,
          boundary: { x: 170, y: 20, w: 610, h: 430, title: 'Biblioteca' },
          actors: [
            { id: 'a1', x: 85, y: 85, label: 'Socio', slot: true },
            { id: 'a2', x: 85, y: 310, label: 'Bibliotecario', slot: true },
          ],
          useCases: [
            { id: 'u1', x: 310, y: 85, label: 'Reservar libro', slot: true },
            { id: 'u2', x: 310, y: 225, label: 'Registrar préstamo', slot: true },
            { id: 'u3', x: 310, y: 375, label: 'Registrar devolución', slot: true },
            { id: 'u4', x: 620, y: 270, label: 'Verificar socio', slot: true },
            { id: 'u5', x: 620, y: 400, label: 'Calcular multa', slot: true },
          ],
          links: [
            { from: 'a1', to: 'u1', type: 'assoc' },
            { from: 'a2', to: 'u2', type: 'assoc' },
            { from: 'a2', to: 'u3', type: 'assoc' },
            { from: 'u2', to: 'u4', type: 'include' },
            { from: 'u3', to: 'u4', type: 'include' },
            { from: 'u5', to: 'u3', type: 'extend' },
          ],
        },
        decoys: ['Escanear código de barras', 'María López'],
        explanation: 'Préstamo y devolución incluyen «Verificar socio». «Calcular multa» extiende la devolución solo cuando llega tarde. «María López» es una persona, no un rol.',
      },
      {
        type: 'builder',
        question: 'Completa el diagrama de la Tienda online',
        story: 'Cualquier **Cliente** puede comprar productos; comprar siempre incluye **pagar**, y el pago lo procesa la **Pasarela de pago**. **Pagar con tarjeta** es un tipo de pago. El **Cliente Premium** es un Cliente que además puede **canjear puntos**.',
        diagram: {
          w: 800, h: 460,
          boundary: { x: 190, y: 20, w: 420, h: 420, title: 'Tienda online' },
          actors: [
            { id: 'a1', x: 90, y: 100, label: 'Cliente', slot: true },
            { id: 'a2', x: 90, y: 320, label: 'Cliente Premium', slot: true },
            { id: 'a3', x: 715, y: 195, label: 'Pasarela de pago', slot: true },
          ],
          useCases: [
            { id: 'u1', x: 310, y: 100, label: 'Comprar producto', slot: true },
            { id: 'u2', x: 500, y: 200, label: 'Pagar', slot: true },
            { id: 'u3', x: 500, y: 365, label: 'Pagar con tarjeta', slot: true },
            { id: 'u4', x: 310, y: 330, label: 'Canjear puntos', slot: true },
          ],
          links: [
            { from: 'a1', to: 'u1', type: 'assoc' },
            { from: 'u1', to: 'u2', type: 'include' },
            { from: 'a3', to: 'u2', type: 'assoc' },
            { from: 'u3', to: 'u2', type: 'gen' },
            { from: 'a2', to: 'a1', type: 'gen' },
            { from: 'a2', to: 'u4', type: 'assoc' },
          ],
        },
        decoys: ['Carrito de la compra', 'Validar CVV'],
        explanation: 'El triángulo hueco marca generalización: Cliente Premium → Cliente y Pagar con tarjeta → Pagar. Comprar incluye Pagar, y la Pasarela de pago atiende el pago.',
      },
    ],
  },

  // ───────────────────────────── 6
  {
    id: 'detective',
    icon: '🕵️',
    title: 'Detective de errores',
    subtitle: 'Encuentra lo que está mal',
    color: '#ef4444',
    lesson: [
      {
        title: 'Errores típicos',
        mood: 'wow',
        text: 'Los diagramas de casos de uso suelen fallar siempre en lo mismo. Memoriza esta lista negra:',
        points: [
          '🧍 Un **actor dentro** del límite del sistema.',
          '🖱️ Casos con nombre de **paso de interfaz** («Hacer clic en…») o de **tarea interna** («Guardar en la tabla…»).',
          '↔️ Flechas «include» o «extend» en el **sentido contrario**.',
          '🔗 **Asociaciones entre actores** (entre actores solo cabe la generalización).',
          '➖ **Líneas simples entre casos de uso** (deben ser «include», «extend» o generalización).',
          '👤 Actores que son **personas concretas** o **componentes internos**.',
        ],
      },
      {
        title: 'Cómo jugar',
        text: 'Verás un diagrama con **marcadores numerados**. Haz clic en los que señalan un **error**. ¡Ojo! Algunos marcadores señalan cosas que están **bien**.',
        tip: 'Pulsa «Comprobar» cuando hayas marcado todos los que creas que son errores.',
      },
    ],
    challenges: [
      {
        type: 'spot',
        question: 'Sistema de reservas de hotel: ¿qué marcadores señalan errores?',
        diagram: {
          w: 800, h: 460,
          boundary: { x: 170, y: 20, w: 530, h: 420, title: 'Reservas de hotel' },
          actors: [
            { id: 'hue', x: 80, y: 175, label: 'Huésped' },
            { id: 'rec', x: 610, y: 280, label: 'Recepcionista' },
            { id: 'bd', x: 750, y: 165, label: 'Base de datos del hotel' },
          ],
          useCases: [
            { id: 'res', x: 300, y: 80, label: 'Reservar habitación' },
            { id: 'ver', x: 560, y: 80, label: 'Verificar disponibilidad' },
            { id: 'can', x: 300, y: 200, label: 'Cancelar reserva' },
            { id: 'clic', x: 300, y: 330, label: 'Hacer clic en «Confirmar»' },
            { id: 'chk', x: 460, y: 395, label: 'Registrar check-in' },
          ],
          links: [
            { from: 'hue', to: 'res', type: 'assoc' },
            { from: 'hue', to: 'can', type: 'assoc' },
            { from: 'hue', to: 'clic', type: 'assoc' },
            { from: 'res', to: 'ver', type: 'include' },
            { from: 'rec', to: 'chk', type: 'assoc' },
            { from: 'bd', to: 'ver', type: 'assoc' },
          ],
        },
        markers: [
          { x: 640, y: 222, error: true, note: 'El Recepcionista está DENTRO del límite del sistema. Los actores siempre van fuera.' },
          { x: 384, y: 306, error: true, note: '«Hacer clic en Confirmar» es un paso de interfaz, no un objetivo de valor.' },
          { x: 772, y: 100, error: true, note: 'La base de datos del propio hotel es un componente interno, no un actor.' },
          { x: 430, y: 50, error: false, note: 'Correcto: Reservar habitación siempre incluye Verificar disponibilidad, y la flecha va del base al incluido.' },
          { x: 384, y: 176, error: false, note: 'Correcto: el Huésped puede cancelar su reserva; es un objetivo de valor.' },
        ],
        explanation: 'Errores: actor dentro del sistema, caso de uso con nombre de clic y un componente interno como actor.',
      },
      {
        type: 'spot',
        question: 'App bancaria: ¿qué marcadores señalan errores?',
        diagram: {
          w: 800, h: 440,
          boundary: { x: 200, y: 20, w: 470, h: 400, title: 'App bancaria' },
          actors: [
            { id: 'cli', x: 90, y: 130, label: 'Cliente' },
            { id: 'ase', x: 90, y: 340, label: 'Asesor' },
          ],
          useCases: [
            { id: 'tra', x: 320, y: 100, label: 'Transferir dinero' },
            { id: 'aut', x: 575, y: 100, label: 'Autenticar usuario' },
            { id: 'com', x: 575, y: 260, label: 'Generar comprobante' },
            { id: 'sal', x: 320, y: 250, label: 'Consultar saldo' },
            { id: 'ate', x: 320, y: 370, label: 'Atender consultas' },
          ],
          links: [
            { from: 'cli', to: 'tra', type: 'assoc' },
            { from: 'cli', to: 'sal', type: 'assoc' },
            { from: 'cli', to: 'ase', type: 'assoc' },
            { from: 'tra', to: 'aut', type: 'include' },
            { from: 'tra', to: 'com', type: 'extend' },
            { from: 'tra', to: 'sal', type: 'assoc' },
            { from: 'ase', to: 'ate', type: 'assoc' },
          ],
        },
        markers: [
          { x: 118, y: 250, error: true, note: 'Entre actores no se dibujan asociaciones. Solo puede haber generalización.' },
          { x: 448, y: 56, error: false, note: 'Correcto: Transferir dinero siempre incluye Autenticar usuario.' },
          { x: 482, y: 200, error: true, note: 'La flecha «extend» está al revés: debe ir DESDE Generar comprobante HACIA Transferir dinero.' },
          { x: 344, y: 175, error: true, note: 'Entre casos de uso no se usan líneas simples: solo «include», «extend» o generalización.' },
          { x: 200, y: 214, error: false, note: 'Correcto: el Cliente participa en Consultar saldo.' },
        ],
        explanation: 'Errores: asociación entre actores, «extend» en sentido contrario y línea simple entre casos de uso.',
      },
      {
        type: 'spot',
        question: 'Campus virtual: ¿qué marcadores señalan errores?',
        diagram: {
          w: 800, h: 450,
          boundary: { x: 190, y: 20, w: 440, h: 410, title: 'Campus virtual' },
          actors: [
            { id: 'doc', x: 85, y: 105, label: 'Docente' },
            { id: 'est', x: 85, y: 310, label: 'Estudiante' },
            { id: 'mail', x: 720, y: 105, label: 'Servicio de correo' },
            { id: 'juan', x: 720, y: 330, label: 'Juan' },
          ],
          useCases: [
            { id: 'pub', x: 295, y: 100, label: 'Publicar calificaciones' },
            { id: 'not', x: 540, y: 100, label: 'Notificar a estudiantes' },
            { id: 'gua', x: 540, y: 235, label: 'Guardar en tabla NOTAS' },
            { id: 'con', x: 295, y: 290, label: 'Consultar calificaciones' },
            { id: 'ent', x: 540, y: 375, label: 'Entregar tarea' },
          ],
          links: [
            { from: 'doc', to: 'pub', type: 'assoc' },
            { from: 'pub', to: 'not', type: 'include' },
            { from: 'mail', to: 'not', type: 'assoc' },
            { from: 'pub', to: 'gua', type: 'include' },
            { from: 'est', to: 'con', type: 'assoc' },
            { from: 'est', to: 'ent', type: 'assoc' },
            { from: 'juan', to: 'ent', type: 'assoc' },
          ],
        },
        markers: [
          { x: 750, y: 268, error: true, note: '«Juan» es una persona concreta. Los actores son roles (ya existe Estudiante).' },
          { x: 620, y: 206, error: true, note: '«Guardar en tabla NOTAS» es una tarea interna de implementación, no un objetivo del usuario.' },
          { x: 418, y: 56, error: false, note: 'Correcto: publicar calificaciones siempre notifica a los estudiantes.' },
          { x: 750, y: 48, error: false, note: 'Correcto: un sistema externo puede ser actor secundario.' },
          { x: 196, y: 84, error: false, note: 'Correcto: el Docente publica las calificaciones.' },
        ],
        explanation: 'Errores: una persona concreta como actor y una tarea interna como caso de uso.',
      },
    ],
  },

  // ───────────────────────────── 7
  {
    id: 'especificacion',
    icon: '📝',
    title: 'Especificación textual',
    subtitle: 'Flujos, pre y postcondiciones',
    color: '#3b82f6',
    lesson: [
      {
        title: 'El diagrama es solo el índice',
        text: 'El diagrama da una visión general. El detalle está en la **especificación textual** de cada caso de uso. Una plantilla típica:',
        points: [
          '🏷️ **Nombre** y **actor primario** (y secundarios).',
          '✅ **Precondiciones**: lo que debe ser cierto ANTES de empezar.',
          '➡️ **Flujo principal** (escenario de éxito): los pasos del camino feliz.',
          '🔀 **Flujos alternativos / extensiones**: desvíos y errores.',
          '🏁 **Postcondiciones** (garantías): lo que es cierto al terminar con éxito.',
        ],
      },
      {
        title: 'El flujo principal',
        text: 'Pasos **numerados** que alternan **actor** y **sistema**, en lenguaje sencillo y sin detalles de interfaz:',
        example: [
          '1. El cliente introduce la tarjeta.',
          '2. El sistema solicita el PIN.',
          '3. El cliente introduce el PIN.',
          '4. El sistema valida el PIN…',
        ],
      },
      {
        title: 'Flujos alternativos',
        text: 'Se numeran a partir del paso en el que se desvían:',
        example: [
          '4a. PIN incorrecto:',
          '   4a1. El sistema muestra un aviso.',
          '   4a2. Vuelve al paso 2.',
        ],
        tip: 'Un **escenario** es un camino concreto a través del caso de uso: el flujo principal es un escenario, y cada combinación con alternativos es otro.',
      },
    ],
    challenges: [
      {
        type: 'order',
        question: 'Ordena el flujo principal de «Comprar entrada de cine»',
        steps: [
          'El cliente selecciona una película y una sesión.',
          'El sistema muestra las butacas disponibles.',
          'El cliente elige sus butacas.',
          'El sistema muestra el total a pagar.',
          'El cliente introduce los datos de pago.',
          'El sistema valida el pago con la pasarela.',
          'El sistema emite las entradas y las envía por correo.',
        ],
        explanation: 'El flujo alterna actor y sistema y avanza de forma lógica: elegir, mostrar, pagar y confirmar.',
      },
      {
        type: 'classify',
        question: '¿A qué parte de la especificación de «Retirar efectivo» pertenece cada frase?',
        bins: [
          { id: 'pre', label: '✅ Precondición' },
          { id: 'fp', label: '➡️ Flujo principal' },
          { id: 'alt', label: '🔀 Alternativo' },
          { id: 'post', label: '🏁 Postcondición' },
        ],
        items: [
          { text: 'El cajero está en servicio y tiene efectivo', bin: 'pre' },
          { text: 'El cliente introduce la cantidad a retirar', bin: 'fp' },
          { text: '4a. PIN incorrecto: el sistema solicita reintentarlo', bin: 'alt' },
          { text: 'El importe se ha descontado de la cuenta del cliente', bin: 'post' },
          { text: 'El sistema entrega el efectivo', bin: 'fp' },
          { text: '6a. Saldo insuficiente: el sistema informa y ofrece otra cantidad', bin: 'alt' },
        ],
        explanation: 'Antes de empezar → precondición. Camino feliz → flujo principal. Desvíos numerados (4a, 6a) → alternativos. Estado final garantizado → postcondición.',
      },
      {
        type: 'quiz',
        question: '¿Qué paso está mejor redactado para un flujo principal?',
        options: [
          'El cliente confirma el pedido.',
          'El usuario hace clic en el botón verde de la esquina inferior derecha.',
          'Se ejecuta INSERT INTO pedidos VALUES (…).',
          'El sistema hace cosas con el pedido.',
        ],
        answer: 0,
        explanation: 'Un buen paso es claro, indica quién actúa y evita detalles de interfaz o de implementación.',
      },
      {
        type: 'quiz',
        question: '¿Qué es un escenario?',
        options: [
          'Un camino concreto a través del caso de uso (una instancia)',
          'Otro nombre para el diagrama de casos de uso',
          'Un actor secundario',
          'La lista de precondiciones',
        ],
        answer: 0,
        explanation: 'Un escenario es una secuencia concreta de pasos: el flujo principal es uno, y cada desvío por un alternativo da lugar a otro.',
      },
      {
        type: 'order',
        question: 'Ordena el flujo principal de «Registrar préstamo»',
        steps: [
          'El bibliotecario identifica al socio.',
          'El sistema verifica que el socio no tiene multas pendientes.',
          'El bibliotecario escanea el libro.',
          'El sistema registra el préstamo y calcula la fecha de devolución.',
          'El sistema muestra el comprobante del préstamo.',
        ],
        explanation: 'Primero se identifica y verifica al socio, después se registra el libro y por último se confirma el préstamo.',
      },
      {
        type: 'quiz',
        question: 'La postcondición de «Hacer pedido» es «El pedido queda registrado y pagado». ¿Cuándo debe cumplirse?',
        options: [
          'Al terminar con éxito el caso de uso',
          'Antes de empezar el caso de uso',
          'Solo si ocurre un flujo alternativo',
          'En el paso 1 del flujo principal',
        ],
        answer: 0,
        explanation: 'La postcondición (garantía de éxito) describe el estado del sistema cuando el caso termina con éxito.',
      },
    ],
  },

  // ───────────────────────────── 8
  {
    id: 'jefe',
    icon: '👾',
    title: 'Jefe final: el Cajero',
    subtitle: 'Todo lo aprendido, en un solo reto',
    color: '#d946ef',
    boss: true,
    lesson: [
      {
        title: '¡Alerta en BancoNube!',
        mood: 'wow',
        text: 'El banco **BancoNube** necesita su nuevo **cajero automático** para mañana, y el analista principal se ha ido de vacaciones. **¡Es tu momento!**',
        points: [
          '👾 Reto mixto: actores, casos de uso, relaciones, diagramas y flujos.',
          '💎 Cada acierto vale **150 XP**.',
          '❤️ Tienes 3 vidas. ¡Que no te tiemble el pulso!',
        ],
      },
    ],
    challenges: [
      {
        type: 'classify',
        question: 'Cajero automático: ¿cuáles son actores?',
        bins: [
          { id: 'si', label: '🧍 Es actor' },
          { id: 'no', label: '🚫 No es actor' },
        ],
        items: [
          { text: 'Cliente', bin: 'si' },
          { text: 'Sistema bancario central', bin: 'si' },
          { text: 'Técnico de mantenimiento', bin: 'si' },
          { text: 'Dispensador de billetes (pieza interna del cajero)', bin: 'no' },
          { text: 'Pantalla táctil', bin: 'no' },
          { text: 'Tiempo (cierre contable diario)', bin: 'si' },
        ],
        explanation: 'El Cliente, el Técnico, el Sistema bancario (externo) y el Tiempo son actores. El dispensador y la pantalla son piezas del propio cajero.',
      },
      {
        type: 'pick',
        question: '¿Cuáles son casos de uso válidos para el Cliente del cajero?',
        hint: 'Selecciona todos los correctos.',
        options: [
          { text: 'Retirar efectivo', correct: true },
          { text: 'Consultar saldo', correct: true },
          { text: 'Introducir PIN', correct: false },
          { text: 'Transferir entre cuentas', correct: true },
          { text: 'Contar billetes', correct: false },
          { text: 'Cambiar PIN', correct: true },
        ],
        explanation: '«Introducir PIN» es un paso dentro de otros casos, y «Contar billetes» es una tarea interna del cajero.',
      },
      {
        type: 'builder',
        question: 'Construye el diagrama del cajero',
        story: 'El **Cliente** puede retirar efectivo y consultar el saldo; ambos casos siempre requieren **autenticar al cliente**, algo que valida el **Sistema bancario**. Al retirar, opcionalmente se puede **imprimir un recibo**. El **Técnico** recarga efectivo.',
        diagram: {
          w: 800, h: 470,
          boundary: { x: 180, y: 20, w: 440, h: 430, title: 'Cajero automático' },
          actors: [
            { id: 'a1', x: 85, y: 150, label: 'Cliente', slot: true },
            { id: 'a2', x: 85, y: 375, label: 'Técnico', slot: true },
            { id: 'a3', x: 715, y: 225, label: 'Sistema bancario', slot: true },
          ],
          useCases: [
            { id: 'u1', x: 285, y: 90, label: 'Retirar efectivo', slot: true },
            { id: 'u2', x: 530, y: 90, label: 'Imprimir recibo', slot: true },
            { id: 'u3', x: 285, y: 230, label: 'Consultar saldo', slot: true },
            { id: 'u4', x: 530, y: 230, label: 'Autenticar cliente', slot: true },
            { id: 'u5', x: 285, y: 380, label: 'Recargar efectivo', slot: true },
          ],
          links: [
            { from: 'a1', to: 'u1', type: 'assoc' },
            { from: 'a1', to: 'u3', type: 'assoc' },
            { from: 'u2', to: 'u1', type: 'extend' },
            { from: 'u1', to: 'u4', type: 'include' },
            { from: 'u3', to: 'u4', type: 'include' },
            { from: 'a3', to: 'u4', type: 'assoc' },
            { from: 'a2', to: 'u5', type: 'assoc' },
          ],
        },
        decoys: ['Pulsar Enter', 'Dispensador de billetes'],
        explanation: 'Retirar y Consultar incluyen Autenticar, que valida el Sistema bancario. Imprimir recibo extiende Retirar efectivo. El Técnico recarga efectivo.',
      },
      {
        type: 'quiz',
        question: '«Imprimir recibo» es opcional al retirar efectivo. ¿Qué relación usarías y en qué sentido?',
        options: [
          '«extend», desde Imprimir recibo hacia Retirar efectivo',
          '«include», desde Retirar efectivo hacia Imprimir recibo',
          '«extend», desde Retirar efectivo hacia Imprimir recibo',
          'Generalización hacia Retirar efectivo',
        ],
        answer: 0,
        explanation: 'Opcional → «extend», y la flecha va del caso que extiende hacia el caso base.',
      },
      {
        type: 'spot',
        question: 'Revisa el diagrama del becario: ¿qué marcadores señalan errores?',
        diagram: {
          w: 800, h: 470,
          boundary: { x: 180, y: 20, w: 450, h: 430, title: 'Cajero automático' },
          actors: [
            { id: 'cli', x: 85, y: 180, label: 'Cliente' },
            { id: 'tec', x: 85, y: 385, label: 'Técnico' },
            { id: 'ban', x: 545, y: 265, label: 'Sistema bancario' },
          ],
          useCases: [
            { id: 'ret', x: 285, y: 80, label: 'Retirar efectivo' },
            { id: 'aut', x: 540, y: 80, label: 'Autenticar cliente' },
            { id: 'sal', x: 285, y: 200, label: 'Consultar saldo' },
            { id: 'ent', x: 285, y: 310, label: 'Pulsar tecla Enter' },
            { id: 'rec', x: 285, y: 410, label: 'Recargar efectivo' },
          ],
          links: [
            { from: 'cli', to: 'ret', type: 'assoc' },
            { from: 'cli', to: 'sal', type: 'assoc' },
            { from: 'cli', to: 'ent', type: 'assoc' },
            { from: 'aut', to: 'ret', type: 'include' },
            { from: 'ban', to: 'aut', type: 'assoc' },
            { from: 'tec', to: 'rec', type: 'assoc' },
          ],
        },
        markers: [
          { x: 412, y: 50, error: true, note: 'La flecha «include» está al revés: debe ir DESDE Retirar efectivo (base) HACIA Autenticar cliente (incluido).' },
          { x: 590, y: 205, error: true, note: 'El Sistema bancario es externo: debe estar FUERA del límite del sistema.' },
          { x: 370, y: 284, error: true, note: '«Pulsar tecla Enter» es un paso de interfaz, no un caso de uso.' },
          { x: 370, y: 175, error: false, note: 'Correcto: consultar el saldo es un objetivo de valor para el Cliente.' },
          { x: 190, y: 372, error: false, note: 'Correcto: el Técnico participa en Recargar efectivo.' },
        ],
        explanation: 'Errores: «include» al revés, actor dentro del sistema y un paso de interfaz como caso de uso.',
      },
      {
        type: 'order',
        question: 'Ordena el flujo principal de «Retirar efectivo»',
        steps: [
          'El cliente introduce la tarjeta.',
          'El sistema solicita el PIN.',
          'El cliente introduce el PIN.',
          'El sistema valida el PIN con el sistema bancario.',
          'El cliente indica la cantidad a retirar.',
          'El sistema devuelve la tarjeta y entrega el efectivo.',
        ],
        explanation: 'Tarjeta → PIN → validación → cantidad → entrega. Cada paso del actor provoca una respuesta del sistema.',
      },
      {
        type: 'quiz',
        question: '¿Cuál es la precondición más adecuada para «Retirar efectivo»?',
        options: [
          'El cajero está operativo y conectado al sistema bancario',
          'El cliente ha recibido su dinero',
          'El cliente pulsa «Aceptar»',
          'Se imprime el recibo',
        ],
        answer: 0,
        explanation: 'La precondición describe lo que debe ser cierto ANTES de empezar. «El cliente ha recibido su dinero» sería una postcondición.',
      },
    ],
  },
];
