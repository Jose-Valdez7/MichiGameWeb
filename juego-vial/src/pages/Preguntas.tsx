import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import { pickRandomQuestions, type Question } from '../utils/questions'

export default function Preguntas() {
  const { players, currentTurn, addPoint, setTurn } = useGame()
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    // Obtener una pregunta aleatoria
    const questions = pickRandomQuestions(1)
    setQuestion(questions[0])
  }, [])

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !question) return
    
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === question.answerIndex
    setIsCorrect(correct)
    setShowResult(true)

    // Otorgar punto si es correcto
    if (correct) {
      addPoint(currentTurn)
    }

    // Cambiar turno después de 2 segundos
    setTimeout(() => {
      setTurn(currentTurn === 0 ? 1 : 0)
    }, 2000)
  }

  const getAnswerButtonClass = (index: number) => {
    if (selectedAnswer === null) return "btn btn-secondary w-full justify-center"
    
    if (index === question?.answerIndex) {
      return "btn bg-success text-white w-full justify-center"
    } else if (index === selectedAnswer) {
      return "btn bg-accent text-white w-full justify-center"
    }
    
    return "btn bg-gray-300 text-gray-600 w-full justify-center"
  }

  const currentPlayer = players[currentTurn]

  if (!question) {
    return (
      <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Cargando pregunta...</h1>
      </div>
    )
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Pregunta de Educación Vial</h1>
      
      <div className="card p-4 mb-4">
        <p className="text-lg font-bold text-center">
          Turno de: <span className="text-primary">{currentPlayer.customName || currentPlayer.name}</span>
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <p className="text-sm text-center text-gray-600">
            Posición: {currentPlayer.position + 1}/4
          </p>
          <p className="text-sm text-center font-bold text-accent">
            Puntos: {currentPlayer.points}/3
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-2xl"
      >
        <p className="text-xl font-bold mb-6">{question.text}</p>
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <motion.button 
              key={index}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={getAnswerButtonClass(index)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {showResult && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="card p-6 text-center"
        >
          <h2 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-success' : 'text-accent'}`}>
            {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto ❌'}
          </h2>
          <p className="text-lg mb-2">
            {isCorrect 
              ? `${currentPlayer.customName || currentPlayer.name} obtiene 1 punto y avanza una casilla` 
              : `${currentPlayer.customName || currentPlayer.name} no obtiene puntos`
            }
          </p>
          <p className="text-sm text-gray-600">
            El turno pasa al siguiente jugador...
          </p>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Link to="/tablero" className="btn btn-primary">
          Volver al tablero
        </Link>
        {showResult && (
          <Link to="/tablero" className="btn bg-success hover:bg-success/90 text-white">
            Continuar juego
          </Link>
        )}
      </div>
    </div>
  )
}


