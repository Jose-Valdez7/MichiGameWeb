import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { pickRandomQuestionsByCategory, getCategoryByImageId, type Question } from '../utils/questions'
import Modal from './ui/Modal'

interface ModalPreguntaProps {
  isOpen: boolean
  onClose: () => void
  onAnswer: (isCorrect: boolean) => void
  imageId: number | null
  currentPlayer: { name: string; customName: string | null; character: string | null; position: number; points: number }
  onSemaphoreUpdate?: (selectedAnswer: number | null, isCorrect: boolean | null) => void
}

const imageNames: Record<number, string> = {
  1: 'Semáforos',
  2: 'Señales',
  3: 'Vehículos',
  4: 'Peatones',
  5: 'Carreteras',
  6: 'Estacionamiento',
}

const categoryNames: Record<string, string> = {
  transito: 'Educación Vial',
  movilis: 'Movilis',
  riesgos: 'Riesgos Naturales'
}

export default function ModalPregunta({ isOpen, onClose, onAnswer, imageId, currentPlayer, onSemaphoreUpdate }: ModalPreguntaProps) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    if (isOpen && imageId) {
      // Obtener la categoría según el ID de imagen
      const category = getCategoryByImageId(imageId)
      
      // Obtener una pregunta aleatoria de la categoría correspondiente
      const questions = pickRandomQuestionsByCategory(category, 1)
      setQuestion(questions[0])
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowContinue(false)
    }
  }, [isOpen, imageId])

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !question) return
    
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === question.answerIndex
    setIsCorrect(correct)

    // Actualizar el semáforo
    if (onSemaphoreUpdate) {
      onSemaphoreUpdate(answerIndex, correct)
    }

    // Mostrar botón continuar después de un breve delay
    setTimeout(() => {
      setShowContinue(true)
    }, 1500)
  }

  const handleContinue = () => {
    if (isCorrect !== null) {
      onAnswer(isCorrect)
      onClose()
    }
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
      title=""
      className="max-w-4xl"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0, opacity: 0, rotateY: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-400 hover:scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full"
      >
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
        
        {/* Partículas flotantes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            initial={{ 
              x: Math.random() * 400,
              y: Math.random() * 300,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [Math.random() * 300, Math.random() * 300]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        

        <div className="space-y-6 relative z-10">
        {/* Título épico */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-black text-white mb-4 drop-shadow-2xl">
            🎯 <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              {imageId ? categoryNames[getCategoryByImageId(imageId)] : 'PREGUNTA'}
            </span>
          </h2>
        </motion.div>

        {/* Información del jugador - Estilo épico */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-lg border border-blue-400/50 rounded-2xl p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              ⚡
            </div>
            <div>
              <p className="text-xl font-black text-white">
                TURNO DE: <span className="text-yellow-400">{currentPlayer.customName || currentPlayer.name}</span>
              </p>
              <p className="text-blue-300 font-medium">
                Puntos actuales: <span className="text-yellow-400 font-bold">{currentPlayer.points}/3</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pregunta - Estilo épico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-white mb-4 drop-shadow">
              📚 Tema: <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">{imageNames[imageId]}</span>
            </h3>
            <p className="text-lg text-gray-300 mb-4 font-medium">
              Categoría: <span className="text-yellow-400 font-bold">{imageId ? categoryNames[getCategoryByImageId(imageId)] : 'General'}</span>
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">{question.text}</p>
          </div>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={selectedAnswer === null ? { scale: 1.02, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`
                  relative p-4 rounded-xl backdrop-blur-lg border-2 transition-all duration-300 text-left
                  ${selectedAnswer === null 
                    ? 'bg-gradient-to-r from-white/20 to-white/10 border-blue-400/50 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/25 text-white cursor-pointer' 
                    : index === question?.answerIndex && isCorrect
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 text-green-300'
                      : index === selectedAnswer
                        ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 text-red-300'
                        : 'bg-gray-500/30 border-gray-500/50 text-gray-400'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${selectedAnswer === null 
                      ? 'bg-blue-500/30 text-blue-300' 
                      : index === question?.answerIndex && isCorrect
                        ? 'bg-green-500/30 text-green-300'
                        : index === selectedAnswer
                          ? 'bg-red-500/30 text-red-300'
                          : 'bg-gray-500/30 text-gray-400'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
                
                {/* Efecto de resplandor para respuestas correctas */}
                {index === question?.answerIndex && isCorrect && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Botón Continuar */}
        {showContinue && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleContinue}
              className={`px-8 py-4 rounded-2xl font-black text-xl shadow-2xl border-2 border-white/20 backdrop-blur-lg transition-all duration-300 ${
                isCorrect
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white hover:shadow-green-500/50'
                  : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white hover:shadow-red-500/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCorrect ? '✅ CONTINUAR' : '❌ CONTINUAR'}
            </motion.button>
          </motion.div>
        )}
        
      </div>
      </motion.div>
    </Modal>
  )
}
