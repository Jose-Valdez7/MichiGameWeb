import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { pickRandomQuestions, type Question } from '../utils/questions'
import Modal from './ui/Modal'

interface ModalPreguntaProps {
  isOpen: boolean
  onClose: () => void
  onAnswer: (isCorrect: boolean) => void
  imageId: number | null
  currentPlayer: { name: string; customName: string | null; character: string | null; position: number; points: number }
}

const imageNames: Record<number, string> = {
  1: 'Semáforos',
  2: 'Señales',
  3: 'Vehículos',
  4: 'Peatones',
  5: 'Carreteras',
  6: 'Estacionamiento',
}

export default function ModalPregunta({ isOpen, onClose, onAnswer, imageId, currentPlayer }: ModalPreguntaProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    if (isOpen && imageId) {
      // Obtener una pregunta aleatoria
      const questions = pickRandomQuestions(1)
      setQuestion(questions[0])
      setSelectedAnswer(null)
      setIsCorrect(null)
    }
  }, [isOpen, imageId])

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !question) return
    
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === question.answerIndex
    setIsCorrect(correct)

    // Llamar a onAnswer después de un breve delay para mostrar el resultado
    setTimeout(() => {
      onAnswer(correct)
    }, 2000)
  }

  const getAnswerButtonClass = (index: number) => {
    if (selectedAnswer === null) return "btn btn-secondary w-full justify-center"
    
    // Solo mostrar la respuesta correcta si la respuesta del usuario fue correcta
    if (isCorrect && index === question?.answerIndex) {
      return "btn bg-success text-white w-full justify-center"
    } else if (index === selectedAnswer) {
      return "btn bg-accent text-white w-full justify-center"
    }
    
    return "btn bg-gray-300 text-gray-600 w-full justify-center"
  }

  if (!question || !imageId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Pregunta sobre ${imageNames[imageId]} - ${currentPlayer.character}`}
      className="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Información del jugador */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-center font-medium">
            Turno de: <span className="text-primary font-bold">{currentPlayer.customName || currentPlayer.name}</span>
          </p>
          <p className="text-center text-sm text-gray-600">
            Puntos actuales: {currentPlayer.points}/3
          </p>
        </div>

        {/* Pregunta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border-2 border-blue-200"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">{question.text}</h3>
          
          <div className="space-y-3">
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

        {/* Resultado */}
        {selectedAnswer !== null && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`p-6 rounded-lg text-center ${
              isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-2 ${
              isCorrect ? 'text-green-700' : 'text-red-700'
            }`}>
              {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto ❌'}
            </h3>
            <p className={`text-lg ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect 
                ? `${currentPlayer.customName || currentPlayer.name} obtiene 1 punto y la imagen se bloquea` 
                : `${currentPlayer.customName || currentPlayer.name} no obtiene puntos`
              }
            </p>
            <p className="text-sm text-gray-600 mt-2">
              El turno pasa al siguiente jugador...
            </p>
          </motion.div>
        )}
      </div>
    </Modal>
  )
}
