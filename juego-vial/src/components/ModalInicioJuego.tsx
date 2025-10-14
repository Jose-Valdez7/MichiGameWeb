import { motion } from 'framer-motion'
import Modal from './ui/Modal'

interface ModalInicioJuegoProps {
  isOpen: boolean
  onSelect: (playerIndex: 0 | 1) => void
  players: Array<{
    name: string
    customName: string | null
    character: string | null
    position: number
    points: number
  }>
}

export default function ModalInicioJuego({ isOpen, onSelect, players }: ModalInicioJuegoProps) {
  const player1 = players[0]
  const player2 = players[1]

  return (
    <Modal isOpen={isOpen}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 text-center"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🎮 ¿Quién inicia el juego?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Selecciona qué jugador quiere empezar primero
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Jugador 1 */}
          <motion.button
            onClick={() => onSelect(0)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="card p-6 hover:bg-blue-50 transition-colors cursor-pointer group"
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
              whileHover={{ rotate: 5 }}
            >
              🚗
            </motion.div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {player1.character}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {player1.customName || 'Jugador 1'}
            </p>
            <motion.div
              className="inline-flex items-center gap-2 text-blue-500 font-medium"
              whileHover={{ x: 5 }}
            >
              <span>Iniciar primero</span>
              <span>→</span>
            </motion.div>
          </motion.button>

          {/* Jugador 2 */}
          <motion.button
            onClick={() => onSelect(1)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="card p-6 hover:bg-orange-50 transition-colors cursor-pointer group"
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
              whileHover={{ rotate: -5 }}
            >
              🚙
            </motion.div>
            <h3 className="text-xl font-bold text-orange-600 mb-2">
              {player2.character}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {player2.customName || 'Jugador 2'}
            </p>
            <motion.div
              className="inline-flex items-center gap-2 text-orange-500 font-medium"
              whileHover={{ x: 5 }}
            >
              <span>Iniciar primero</span>
              <span>→</span>
            </motion.div>
          </motion.button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-gray-500"
        >
          <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
          <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.4s' }}></div>
          <span className="ml-3 text-sm">Esperando selección...</span>
        </motion.div>
      </motion.div>
    </Modal>
  )
}
