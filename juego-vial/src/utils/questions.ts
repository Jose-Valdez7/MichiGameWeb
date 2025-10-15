export type Question = {
  id: number
  text: string
  options: string[]
  answerIndex: number
  image?: string  // Ruta de la imagen (opcional)
  category?: 'transito' | 'movilis' | 'riesgos'  // Nueva categoría
}

export type QuestionCategory = {
  name: string
  description: string
  questions: Question[]
}

// Preguntas de educación vial
export const QUESTIONS: Question[] = [
  {
      "id": 1,
      "text": "¿Qué color indica ALTO en un semáforo?",
      "options": [
          "Verde",
          "Amarillo",
          "Rojo"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/semaforo-rojo.png",
  },
  {
      "id": 2,
      "text": "¿Qué significa la señal con un triángulo invertido (cabeza abajo) y borde rojo, conocida como \"Ceda el Paso\"?",
      "options": [
          "Tengo derecho a pasar primero",
          "Debo reducir la velocidad y parar si vienen otros vehículos o peatones",
          "Puedo acelerar",
          "Es una zona de juegos"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/ceda_el_paso.png",

  },
  {
      "id": 3,
      "text": "¿Qué significa una señal redonda con borde rojo y una bicicleta tachada con una línea diagonal?",
      "options": [
          "Hay un carril bici",
          "Se puede montar en bicicleta muy rápido",
          "Prohibida la circulación de bicicletas",
          "Hay que ir en bicicleta muy lento"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/prohibido_bicicletas.png",

  },
  {
      "id": 4,
      "text": "¿Qué indica una señal redonda de color azul con una flecha blanca que apunta hacia adelante?",
      "options": [
          "Prohibido pasar",
          "Zona de aparcamiento",
          "Hay que girar a la derecha",
          "Obligatorio seguir de frente"
      ],
      "answerIndex": 3,
      "image": "/images/preguntas/obligatorio_frente.png",

  },
  {
      "id": 5,
      "text": "¿Qué significa una señal redonda con borde rojo y un número (por ejemplo, un \"30\")?",
      "options": [
          "La distancia que falta para un pueblo",
          "La velocidad mínima permitida en la vía",
          "Que hay 30 niños jugando cerca",
          "El límite máximo de velocidad al que se puede ir"
      ],
      "answerIndex": 3,
      "image": "/images/preguntas/limite_velocidad.png",

  },
  {
      "id": 6,
      "text": "¿Cuál es el significado de una señal redonda, azul con una flecha curva blanca que gira hacia la derecha?",
      "options": [
          "Prohibido girar a la derecha",
          "Advertencia de curva peligrosa",
          "Obligación de girar a la derecha"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/obligacion_girar_derecha.png",

  },
  {
      "id": 7,
      "text": "¿Cuál es el significado de una señal redonda con borde rojo y una flecha gorda negra apuntando hacia arriba tachada por una barra roja diagonal?",
      "options": [
          "Prohibido estacionar",
          "Prohibido el paso en esa dirección",
          "Permitido seguir de frente",
          "Obligatorio girar"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/direccion_prohibida.png",

  },
  {
      "id": 8,
      "text": "¿Qué indica una señal redonda de color azul con un dibujo de un coche y una moto?",
      "options": [
          "Prohibida la entrada de vehículos",
          "Obligación de usar el cinturón",
          "Obligatorio para coches y motos (Vía reservada para estos)",
          "Límite de velocidad muy bajo"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/via_reservada_coches_motos.png",

  },
  {
      "id": 9,
      "text": "¿Qué representa una señal redonda con borde rojo y una flecha negra de doble sentido tachada con una barra diagonal?",
      "options": [
          "Prohibido adelantar camiones",
          "Prohibido adelantar a otros vehículos",
          "Obligatorio circular despacio",
          "Se permite el adelantamiento solo a bicis"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/prohibido_adelantar.png",

  },
  {
      "id": 10,
      "text": "¿Qué indica una señal redonda de color azul con el dibujo de una cadena de coche en el centro?",
      "options": [
          "Prohibido usar cadenas",
          "Carretera resbaladiza",
          "Uso obligatorio de cadenas para la nieve o neumáticos especiales",
          "Advertencia de nieve en la carretera"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/cadenas_obligatorias.png",

  },
  {
      "id": 11,
      "text": "¿Cuál es el color principal y la forma de las señales que nos advierten de un peligro inminente (señales preventivas)?",
      "options": [
          "Redondas y rojas",
          "Cuadradas y azules",
          "Triangulares o romboidales y amarillas",
          "Rectangulares y verdes"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/senal_peligro_forma.png",

  },
  {
      "id": 12,
      "text": "¿Qué significa la señal que es un triángulo con borde rojo y tiene un dibujo de una curva en forma de \"S\"?",
      "options": [
          "Hay un lugar para sentarse",
          "Advertencia de curvas peligrosas sucesivas",
          "Prohibido dar la vuelta",
          "Obligatorio seguir recto"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/curvas_sucesivas.png",

  },
  {
      "id": 13,
      "text": "¿Qué significa una señal triangular con borde rojo y el dibujo de un ciervo o alce?",
      "options": [
          "Hay un zoológico cerca",
          "Advertencia de animales salvajes sueltos en la vía",
          "Prohibido alimentar animales",
          "Zona de picnic"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/animales_sueltos.png",

  },
  {
      "id": 14,
      "text": "¿Qué significa la señal que es un triángulo con borde rojo y el dibujo de un camión bajando una pendiente muy inclinada?",
      "options": [
          "Prohibido el paso de camiones",
          "Advertencia de una pendiente o cuesta muy pronunciada",
          "Obligatorio usar la marcha más alta",
          "Peligro por desprendimiento de rocas"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/pendiente_pronunciada.png",

  },
  {
      "id": 15,
      "text": "¿Cuál es el significado de una señal triangular con borde rojo que muestra una flecha ondulada o curva?",
      "options": [
          "Prohibido hacer giros en \"U\"",
          "Advertencia de curva peligrosa",
          "Obligación de girar",
          "Prohibido adelantar"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/curva_peligrosa.png",

  },
  {
      "id": 16,
      "text": "¿Qué indica una señal cuadrada o rectangular de color azul con el dibujo de una persona caminando en un paso de cebra?",
      "options": [
          "Que es obligatorio correr",
          "Que el paso de peatones está prohibido",
          "Que no hay peatones cerca",
          "Que se acerca un paso de peatones (señal informativa)"
      ],
      "answerIndex": 3,
      "image": "/images/preguntas/paso_peatones_informativa.png",

  },
  {
      "id": 17,
      "text": "¿Qué indica una señal cuadrada o rectangular de color azul con una letra P mayúscula?",
      "options": [
          "Prohibido pasar",
          "Carretera peligrosa",
          "Lugar donde está permitido estacionar o aparcar",
          "Pista de patinaje"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/parking.png",

  },
  {
      "id": 18,
      "text": "¿Qué indica una señal cuadrada o rectangular de color azul que tiene un dibujo de una cama?",
      "options": [
          "Prohibido dormir al volante",
          "Zona de descanso obligatoria",
          "Información de que hay un hotel o alojamiento cerca",
          "Un lugar para pararse a estirar las piernas"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/hotel_alojamiento.png",

  },
  {
      "id": 19,
      "text": "¿Qué representa una señal cuadrada o rectangular de color azul con el dibujo de un surtidor de gasolina?",
      "options": [
          "Obligación de llevar el depósito lleno",
          "Prohibido vender gasolina",
          "Información de que hay una gasolinera o estación de servicio cerca",
          "Advertencia de gases inflamables"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/gasolinera.png",

  },
  {
      "id": 20,
      "text": "¿Qué son las franjas blancas pintadas en el suelo (Paso de Cebra)?",
      "options": [
          "Un lugar para estacionar coches",
          "Una zona para jugar con el balón",
          "El lugar seguro por donde deben cruzar los peatones",
          "Líneas que separan los carriles"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/paso_cebra.png",

  },
  {
      "id": 21,
      "text": "Cuando una calle tiene una línea continua y ancha pintada de blanco en el centro, ¿qué significa para el conductor?",
      "options": [
          "Que puede adelantar a otros coches",
          "Que está prohibido cruzar la línea para adelantar o cambiar de carril",
          "Que puede dar la vuelta",
          "Que debe ir más rápido"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/linea_continua.png",

  },
  {
      "id": 22,
      "text": "¿Qué indica una flecha grande pintada en el carril de la calle?",
      "options": [
          "Que la carretera está en mal estado",
          "Que el coche puede ir a cualquier lado",
          "La dirección o el movimiento que es obligatorio seguir en ese carril",
          "La ubicación de una tienda"
      ],
      "answerIndex": 2,
      "image": "/images/preguntas/flecha_carril.png",
  },
  {
      "id": 23,
      "text": "¿Para qué se utiliza una línea discontinua (rayas cortadas) de color blanco pintada en el centro de la calzada?",
      "options": [
          "Para prohibir totalmente el cambio de carril",
          "Para permitir adelantar o cambiar de carril con precaución",
          "Para marcar el límite de la acera",
          "Para indicar el \"Paso de Cebra\""
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/linea_discontinua.png",

  },
  {
      "id": 24,
      "text": "¿Qué significa la marca vial que consiste en líneas diagonales (como un enrejado) pintadas dentro de una intersección o cruce?",
      "options": [
          "Que es una zona de estacionamiento",
          "Que no debes detener tu vehículo en esa zona para no bloquear el cruce",
          "Es una zona de juegos",
          "Es una vía de acceso restringido"
      ],
      "answerIndex": 1,
      "image": "/images/preguntas/marca_enrejado.png",
  }
]

// Preguntas de Movilis (3 preguntas)
export const MOVILIS_QUESTIONS: Question[] = [
  {
    id: 1001,
    text: "¿Qué es un movilis en el contexto de seguridad vial?",
    options: [
      "Un vehículo de emergencia",
      "Un elemento móvil que puede causar accidentes",
      "Un tipo de señal de tráfico",
      "Un sistema de frenos automáticos"
    ],
    answerIndex: 1,
    category: 'movilis'
  },
  {
    id: 1002,
    text: "¿Cuál es el principal riesgo de los movilis en la carretera?",
    options: [
      "Reducen la velocidad del tráfico",
      "Pueden aparecer inesperadamente y causar colisiones",
      "Consumen más combustible",
      "Generan más ruido"
    ],
    answerIndex: 1,
    category: 'movilis'
  },
  {
    id: 1003,
    text: "¿Cómo debe actuar un conductor al detectar un movilis?",
    options: [
      "Acelerar para pasar rápidamente",
      "Reducir velocidad y estar preparado para maniobrar",
      "Mantener la velocidad constante",
      "Cambiar de carril inmediatamente"
    ],
    answerIndex: 1,
    category: 'movilis'
  }
]

// Preguntas de Riesgos Naturales (3 preguntas)
export const RIESGOS_QUESTIONS: Question[] = [
  {
    id: 2001,
    text: "¿Qué debe hacer un conductor si está cerca de un volcán en erupción?",
    options: [
      "Continuar conduciendo normalmente",
      "Evacuar el área inmediatamente y buscar refugio",
      "Estacionarse y observar el fenómeno",
      "Acelerar para alejarse rápidamente"
    ],
    answerIndex: 1,
    category: 'riesgos'
  },
  {
    id: 2002,
    text: "¿Cuál es la principal precaución al conducir durante un terremoto?",
    options: [
      "Mantener la velocidad alta",
      "Detenerse en un lugar seguro y alejado de estructuras",
      "Conducir hacia el epicentro",
      "Usar el teléfono mientras se conduce"
    ],
    answerIndex: 1,
    category: 'riesgos'
  },
  {
    id: 2003,
    text: "¿Qué riesgo representa conducir durante una inundación?",
    options: [
      "Solo mojarse los zapatos",
      "Perder el control del vehículo y quedar atrapado",
      "Gastar más combustible",
      "Dañar la pintura del auto"
    ],
    answerIndex: 1,
    category: 'riesgos'
  }
]

// Sistema de categorías
export const QUESTION_CATEGORIES: Record<string, QuestionCategory> = {
  transito: {
    name: "Tránsito",
    description: "Preguntas sobre educación vial, semáforos, señales y reglas de tráfico",
    questions: QUESTIONS
  },
  movilis: {
    name: "Movilis",
    description: "Preguntas sobre elementos móviles y situaciones dinámicas en la carretera",
    questions: MOVILIS_QUESTIONS
  },
  riesgos: {
    name: "Riesgos Naturales",
    description: "Preguntas sobre desastres naturales y cómo actuar al conducir",
    questions: RIESGOS_QUESTIONS
  }
}

// Función original mantenida para compatibilidad
export function pickRandomQuestions(count: number) {
  const pool = [...QUESTIONS]
  const result: Question[] = []
  while (result.length < count && pool.length) {
    const idx = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(idx, 1)[0])
  }
  return result
}

// Nueva función para obtener preguntas por categoría
export function pickRandomQuestionsByCategory(category: 'transito' | 'movilis' | 'riesgos', count: number): Question[] {
  const categoryQuestions = QUESTION_CATEGORIES[category].questions
  const pool = [...categoryQuestions]
  const result: Question[] = []
  while (result.length < count && pool.length) {
    const idx = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(idx, 1)[0])
  }
  return result
}

// Función para obtener la categoría según el ID de imagen
export function getCategoryByImageId(imageId: number): 'transito' | 'movilis' | 'riesgos' {
  // Primera fila: 1, 2, 3
  // Segunda fila: 4, 5, 6
  
  if (imageId === 2) { // Primera fila, segunda imagen (Señales)
    return 'movilis'
  } else if (imageId === 5) { // Segunda fila, segunda imagen (Carreteras)
    return 'riesgos'
  } else { // Todas las demás (1, 3, 4, 6)
    return 'transito'
  }
}


