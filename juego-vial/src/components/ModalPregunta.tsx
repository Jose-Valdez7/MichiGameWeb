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

  // Obtener imagen del personaje del jugador en turno
  const getCharacterImage = (characterName: string | null) => {
    if (!characterName) return null
    const map: Record<string, string> = {
      'Michi Gamer': '/images/personaje1.png',
      'Michi Mago': '/images/personaje2.png',
      'Michi Rapero': '/images/personaje3.png',
      'Michi Hacker': '/images/personaje4.png',
      'Michi Vampiro': '/images/personaje5.png',
      'Michi Cyborg': '/images/personaje6.png',
    }
    return map[characterName] || null
  }

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

    // Mostrar botón continuar solo si fue incorrecta
    setTimeout(() => {
      if (!correct) setShowContinue(true)
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
      className="max-w-7xl w-full"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0, opacity: 0, rotateY: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-blue-400 hover:scrollbar-thumb-blue-300 scrollbar-thumb-rounded-full"
      >
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />


        
        {/* Partículas flotantes */}
        {[...Array(6)].map((_, i) => (
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


        {/* Pregunta - Estilo épico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-10"
        >
          <div className="text-center mb-6">
            <p className="text-lg text-gray-300 mb-4 font-medium">
              Categoría: <span className="text-yellow-400 font-bold">{imageId ? categoryNames[getCategoryByImageId(imageId)] : 'General'}</span>
            </p>
            <p className="text-2xl md:text-3xl text-white font-black leading-relaxed drop-shadow-2xl">{question.text}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Izquierda: imagen o texto grande */}
            <div className="flex justify-center md:justify-start">
              {question.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl"
                >
                  <img
                    src={question.image}
                    alt="Imagen de la pregunta"
                    className="w-full h-auto max-h-[28rem] rounded-xl shadow-xl border border-white/20 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-2xl flex items-center justify-center h-[28rem]"
                >
                  <p className="text-3xl md:text-4xl text-white font-black leading-relaxed text-center drop-shadow-2xl">
                    {question.text}
                  </p>
                </motion.div>
              )}
            </div>
            {/* Derecha: opciones */}
            <div className="space-y-5">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={selectedAnswer === null ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    relative p-5 md:p-6 rounded-xl backdrop-blur-lg border-2 transition-all duration-300 text-left w-full
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
                  <div className="flex items-center gap-4">
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
                  <span className="font-semibold md:text-lg">{option}</span>
                  </div>
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
          </div>
        </motion.div>

        {/* Modal cuando responde incorrecto */}
        {showContinue && isCorrect === false && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-rose-700 via-red-700 to-rose-800 border-2 border-white/20 rounded-3xl p-8 text-center shadow-2xl max-w-lg w-full mx-4"
            >
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow">¡Ups! ❌</h3>
              <div className="flex justify-center mb-6">
                <img
                  src="/images/Gato desagrado.png"
                  alt="Gatito triste"
                  className="max-w-full h-auto max-h-56 rounded-2xl shadow-xl border border-white/20 object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <motion.button
                onClick={handleContinue}
                className="px-8 py-4 rounded-2xl font-black text-xl shadow-2xl border-2 border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Continuar
              </motion.button>
            </motion.div>
          </div>
        )}
        
        {/* Modal felicidades cuando responde bien */}
        {isCorrect && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-800 border-2 border-white/20 rounded-3xl p-8 text-center shadow-2xl max-w-lg w-full mx-4"
            >
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow">¡Muy bien! 🎉</h3>
              <div className="flex justify-center mb-6">
                <img
                  src="/images/Gato Celebrando (salto).png"
                  alt="Gatito feliz"
                  className="max-w-full h-auto max-h-56 rounded-2xl shadow-xl border border-white/20 object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <motion.button
                onClick={handleContinue}
                className="px-8 py-4 rounded-2xl font-black text-xl shadow-2xl border-2 border-white/20 bg-white/10 text-white hover:bg-white/20 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Continuar
              </motion.button>
            </motion.div>
          </div>
        )}

      </div>
      </motion.div>
    </Modal>
  )
}
