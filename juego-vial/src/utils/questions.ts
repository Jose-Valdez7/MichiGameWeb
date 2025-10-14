export type Question = {
  id: number
  text: string
  options: string[]
  answerIndex: number
}

// 50 preguntas mock simples de educación vial
export const QUESTIONS: Question[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  text: i % 3 === 0
    ? '¿Qué color indica alto en un semáforo?'
    : i % 3 === 1
    ? '¿Debes usar casco al ir en bicicleta?'
    : '¿Dónde cruzas la calle de forma segura?',
  options: i % 3 === 0
    ? ['Verde', 'Amarillo', 'Rojo']
    : i % 3 === 1
    ? ['Sí', 'No', 'Solo de noche']
    : ['Entre autos', 'En la esquina', 'En el paso peatonal'],
  answerIndex: i % 3 === 0 ? 2 : i % 3 === 1 ? 0 : 2,
}))

export function pickRandomQuestions(count: number) {
  const pool = [...QUESTIONS]
  const result: Question[] = []
  while (result.length < count && pool.length) {
    const idx = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(idx, 1)[0])
  }
  return result
}


