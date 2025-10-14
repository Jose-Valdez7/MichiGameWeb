import { motion } from 'framer-motion'
import Modal from './ui/Modal'

interface ModalGanadorProps {
  isOpen: boolean
  onClose: () => void
  winner: { name: string; character: string | null; position: number; points: number } | undefined
  onContinue: () => void
}

export default function ModalGanador({ isOpen, onClose, onContinue, winner }: ModalGanadorProps) {
  if (!winner) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🏆 ¡Felicidades!"
      className="max-w-lg"
    >
      <div className="text-center space-y-6">
        {/* Animación de celebración */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-8xl"
        >
          🏆
        </motion.div>
        
        {/* Información del ganador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {/* Corona sobre el nombre */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="text-4xl mb-2"
            >
              👑
            </motion.div>
            <h2 className="text-3xl font-bold text-success">
              ¡{winner.name} ha ganado!
            </h2>
          </div>
          
          <p className="text-xl text-gray-700">
            Primer jugador en llegar a 3 puntos
          </p>
          
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-lg font-bold text-yellow-800">
              Puntos finales: {winner.points}/3
            </p>
            <p className="text-sm text-yellow-700">
              Personaje: {winner.character}
            </p>
          </div>
        </motion.div>

        {/* Botón de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={onContinue}
            className="btn bg-blue-600 hover:bg-blue-700 text-white w-full justify-center py-4 text-xl font-bold"
          >
            🎮 Continuar
          </button>
        </motion.div>

        {/* Efectos de confeti */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center space-x-2 text-2xl"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            🎉
          </motion.span>
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            🎊
          </motion.span>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.span>
        </motion.div>
      </div>
    </Modal>
  )
}
