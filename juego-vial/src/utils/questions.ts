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
        "image": "/images/1.png",
    },
    {
        "id": 2,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Tengo derecho a pasar primero",
            "Debo reducir la velocidad y parar si vienen otros vehículos o peatones",
            "Puedo acelerar",
            "Es una zona de juegos"
        ],
        "answerIndex": 1,
        "image": "/images/1.png",
  
    },
    {
        "id": 3,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Hay un carril bici",
            "Se puede montar en bicicleta muy rápido",
            "Prohibida la circulación de bicicletas",
            "Hay que ir en bicicleta muy lento"
        ],
        "answerIndex": 2,
        "image": "/images/2.png",
  
    },
    {
        "id": 5,
        "text": "¿Qué significa esta señal?",
        "options": [
            "La distancia que falta para un pueblo",
            "La velocidad mínima permitida en la vía",
            "Que hay 30 niños jugando cerca",
            "El límite máximo de velocidad al que se puede ir"
        ],
        "answerIndex": 3,
        "image": "/images/4.png",
  
    },
    {
        "id": 6,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido girar a la derecha",
            "Advertencia de curva peligrosa",
            "Obligación de girar a la derecha"
        ],
        "answerIndex": 2,
        "image": "/images/5.png",
  
    },
    {
        "id": 7,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido estacionar",
            "Prohibido el paso en esa dirección",
            "Permitido seguir de frente",
            "Obligatorio girar"
        ],
        "answerIndex": 1,
        "image": "/images/6.png",
  
    },
    {
        "id": 8,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibida la entrada de vehículos",
            "Obligación de usar el cinturón",
            "Obligatorio para coches y motos (Vía reservada para estos)",
            "Límite de velocidad muy bajo"
        ],
        "answerIndex": 2,
        "image": "/images/7.png",
  
    },
    {
        "id": 9,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido adelantar camiones",
            "Prohibido adelantar a otros vehículos",
            "Obligatorio circular despacio",
            "Se permite el adelantamiento solo a bicis"
        ],
        "answerIndex": 1,
  
    },
    {
        "id": 10,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido usar cadenas",
            "Carretera resbaladiza",
            "Uso obligatorio de Cinturon de Seguridad",
            "Advertencia de nieve en la carretera"
        ],
        "answerIndex": 2,
        "image": "/images/9.png",
  
    },
    {
        "id": 11,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Redondas y rojas",
            "Cuadradas y azules",
            "Triangulares o romboidales y amarillas",
            "Rectangulares y verdes"
        ],
        "answerIndex": 2,
        "image": "/images/10.png",
  
    },
    {
        "id": 12,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Hay un lugar para sentarse",
            "Advertencia de curvas peligrosas sucesivas",
            "Prohibido dar la vuelta",
            "Obligatorio seguir recto"
        ],
        "answerIndex": 1,
        "image": "/images/11.png",
  
    },
    {
        "id": 13,
          "text": "¿Qué significa esta señal?",
        "options": [
            "Hay un zoológico cerca",
            "Advertencia de animales salvajes sueltos en la vía",
            "Prohibido alimentar animales",
            "Zona de picnic"
        ],
        "answerIndex": 1,
        "image": "/images/12.png",
  
    },
    {
        "id": 14,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido el paso de camiones",
            "Advertencia de una pendiente o cuesta muy pronunciada",
            "Obligatorio usar la marcha más alta",
            "Peligro por desprendimiento de rocas"
        ],
        "answerIndex": 1,
        "image": "/images/13.png",
  
    },
    {
        "id": 15,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido hacer giros en \"U\"",
            "Advertencia de curva peligrosa",
            "Obligación de girar",
            "Prohibido adelantar"
        ],
        "answerIndex": 1,
        "image": "/images/14.png",
  
    },
    {
        "id": 16,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Que es obligatorio correr",
            "Que el paso de peatones está prohibido",
            "Que no hay peatones cerca",
            "Que se acerca un paso de peatones (señal informativa)"
        ],
        "answerIndex": 3,
        "image": "/images/15.png",
  
    },
    {
        "id": 17,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido pasar",
            "Carretera peligrosa",
            "Lugar donde está permitido estacionar o aparcar",
            "Pista de patinaje"
        ],
        "answerIndex": 2,
        "image": "/images/parking.png",
  
    },
    {
        "id": 18,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Prohibido dormir al volante",
            "Zona de descanso obligatoria",
            "Información de que hay un hotel o alojamiento cerca",
            "Un lugar para pararse a estirar las piernas"
        ],
        "answerIndex": 2,
        "image": "/images/24.png",
  
    },
    {
        "id": 19,
        "text": "¿Qué significa esta señal?",
        "options": [
            "Obligación de llevar el depósito lleno",
            "Prohibido vender gasolina",
            "Información de que hay una gasolinera o estación de servicio cerca",
            "Advertencia de gases inflamables"
        ],
        "answerIndex": 2,
        "image": "/images/25.png",
  
    }
  ]
  
  // Preguntas de Movilis (3 preguntas)
  export const MOVILIS_QUESTIONS: Question[] = [
    {
      id: 1001,
      text: "¿Cuál de las siguientes acciones es una medida preventiva ante un sismo?",
      options: [
        "Correr hacia las escaleras durante el temblor",
        "Colocarse bajo una mesa resistente y proteger la cabeza",
        "Encender velas por si se corta la luz",
        "Salir corriendo al patio sin mirar"
      ],
      answerIndex: 1,
      category: 'movilis'
    },
    {
      id: 1002,
      text: "¿Qué debe contener una mochila de emergencia?",
      options: [
        "Juguetes y adornos",
        "Ropa de fiesta y perfume",
        "Linterna, botiquín, agua y documentos personales",
        "Computadora portátil y audífonos"
      ],
      answerIndex: 2,
      category: 'movilis'
    },
    {
      id: 1003,
      text: "¿Cuál es la causa principal de los deslizamientos de tierra en Quito?",
      options: [
        "Lluvias intensas combinadas con pendientes pronunciadas",
        "La falta de árboles navideños",
        "El tráfico vehicular",
        "El ruido urbano"
      ],
      answerIndex: 0,
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