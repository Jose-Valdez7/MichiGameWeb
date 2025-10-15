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
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0, opacity: 0, rotateY: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 max-w-3xl w-full mx-4 text-center shadow-2xl relative overflow-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-yellow-400 hover:scrollbar-thumb-yellow-300 scrollbar-thumb-rounded-full"
      >
        {/* Efectos de fondo épicos */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
        
        {/* Partículas flotantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
            initial={{ 
              x: Math.random() * 300,
              y: Math.random() * 200,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [Math.random() * 200, Math.random() * 200]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <motion.h2 
            className="text-4xl font-black text-white mb-6 drop-shadow-2xl"
            animate={{ textShadow: ["0 0 20px yellow", "0 0 30px orange", "0 0 20px yellow"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮 <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">¿QUIÉN INICIA EL JUEGO?</span>
          </motion.h2>
          <p className="text-xl text-gray-300 mb-8 font-medium">
            ⚡ Selecciona qué jugador quiere empezar primero
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
          {/* Jugador 1 */}
          <motion.button
            onClick={() => onSelect(0)}
            whileHover={{ scale: 1.1, y: -10, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg border-2 border-blue-400/50 rounded-2xl hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            {/* Efecto de resplandor */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto shadow-2xl relative z-10"
              whileHover={{ rotate: 10, scale: 1.1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚗
            </motion.div>
            <h3 className="text-2xl font-black text-white mb-3 relative z-10 drop-shadow">
              {player1.character}
            </h3>
            <p className="text-blue-300 font-medium mb-4 relative z-10">
              {player1.customName || 'Jugador 1'}
            </p>
            <motion.div
              className="inline-flex items-center gap-3 text-blue-400 font-bold text-lg relative z-10"
              whileHover={{ x: 10, scale: 1.1 }}
            >
              <span>⚡ INICIAR PRIMERO</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.button>

          {/* Jugador 2 */}
          <motion.button
            onClick={() => onSelect(1)}
            whileHover={{ scale: 1.1, y: -10, rotateY: -10 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-8 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-lg border-2 border-orange-400/50 rounded-2xl hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Efecto de resplandor */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-500/10 rounded-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mb-6 mx-auto shadow-2xl relative z-10"
              whileHover={{ rotate: -10, scale: 1.1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              🚙
            </motion.div>
            <h3 className="text-2xl font-black text-white mb-3 relative z-10 drop-shadow">
              {player2.character}
            </h3>
            <p className="text-orange-300 font-medium mb-4 relative z-10">
              {player2.customName || 'Jugador 2'}
            </p>
            <motion.div
              className="inline-flex items-center gap-3 text-orange-400 font-bold text-lg relative z-10"
              whileHover={{ x: 10, scale: 1.1 }}
            >
              <span>⚡ INICIAR PRIMERO</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 text-gray-300 relative z-10"
        >
          <motion.div 
            className="w-3 h-3 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="w-3 h-3 bg-orange-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="w-3 h-3 bg-red-400 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
          <motion.span 
            className="ml-4 text-lg font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚡ Esperando selección...
          </motion.span>
        </motion.div>
      </motion.div>
    </Modal>
  )
}
