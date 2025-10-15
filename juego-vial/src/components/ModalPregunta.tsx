import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { pickRandomQuestions, type Question } from '../utils/questions'
import Modal from './ui/Modal'

interface ModalPreguntaProps {
  isOpen: boolean
  onClose: () => void
  onAnswer: (isCorrect: boolean) => void
  imageId: number | null
  currentPlayer: { name: string; character: string | null; position: number; points: number }
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
    if (selectedAnswer === null) return "btn btn-secondary w-full transition-all duration-200 hover:scale-105"
    
    // Solo mostrar la respuesta correcta si la respuesta del usuario fue correcta
    if (isCorrect && index === question?.answerIndex) {
      return "btn bg-green-500 hover:bg-green-600 text-white w-full border-2 border-green-600 shadow-lg"
    } else if (index === selectedAnswer) {
      return "btn bg-red-500 hover:bg-red-600 text-white w-full border-2 border-red-600 shadow-lg"
    }
    
    return "btn bg-gray-300 text-gray-600 w-full opacity-60"
  }

  if (!question || !imageId) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Pregunta sobre ${imageNames[imageId]} - ${currentPlayer.name}`}
      className="max-w-[98vw] w-[98vw] max-h-[90vh]"
    >
      <div className="space-y-6">
        {/* Información del jugador */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-center font-medium">
            Turno de: <span className="text-primary font-bold">{currentPlayer.name}</span>
          </p>
          <p className="text-center text-sm text-gray-600">
            Puntos actuales: {currentPlayer.points}/3
          </p>
        </div>

        {/* Pregunta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 border-2 border-blue-200"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">{question.text}</h3>
          
          {/* Layout de dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Columna izquierda: Imagen */}
            <div className="flex justify-center lg:justify-start">
              {question.image && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full"
                >
                  <img 
                    src={question.image} 
                    alt="Imagen de la pregunta"
                    className="w-full h-auto max-h-[500px] rounded-lg shadow-xl border-2 border-gray-200 object-contain"
                    onError={(e) => {
                      console.error('Error cargando imagen:', question.image)
                      e.currentTarget.style.display = 'none'
                    }}
                    onLoad={() => {
                      console.log('Imagen cargada exitosamente:', question.image)
                    }}
                  />
                </motion.div>
              )}
            </div>
            
            {/* Columna derecha: Opciones de respuesta */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center lg:text-left">
                Selecciona tu respuesta:
              </h4>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`${getAnswerButtonClass(index)} text-left p-6 min-h-[80px] flex items-center justify-start`}
                  >
                    <span className="font-medium text-lg">{option}</span>
                  </motion.button>
                ))}
              </div>
            </div>
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
                ? `${currentPlayer.name} obtiene 1 punto y la imagen se bloquea` 
                : `${currentPlayer.name} no obtiene puntos`
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
