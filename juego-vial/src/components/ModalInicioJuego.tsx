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

  return (
    <Modal isOpen={isOpen}>
      <motion.div
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0, opacity: 0, rotateY: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-10 max-w-none w-full mx-0 text-center shadow-2xl relative overflow-hidden max-h-[92vh] min-h-[70vh] md:min-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-yellow-400 hover:scrollbar-thumb-yellow-300 scrollbar-thumb-rounded-full"
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
            whileHover={{ scale: 1.03, y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="relative h-96 md:h-[26rem] lg:h-[30rem] overflow-hidden rounded-2xl border-2 border-blue-400/60 hover:border-blue-300 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            {/* Fondo con blur */}
            <div
              className="absolute inset-0 bg-center bg-cover filter blur-sm md:blur-[0.9px] "
              style={{
                backgroundImage: getCharacterImage(player1.character) ? `url(${getCharacterImage(player1.character)})` : undefined,
              }}
            />
            {/* Overlays para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(59,130,246,0.25), transparent 40%)' }}
            />
            {/* Texto sobre la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-2xl font-black text-white drop-shadow">
                {player1.customName || 'Jugador 1'}
              </p>
              <h3 className="text-blue-200 font-semibold">
                {player1.character}
              </h3>
              <motion.div
                className="mt-3 inline-flex items-center gap-2 text-white/90 font-bold"
                whileHover={{ x: 6 }}
              >
                <span className="px-3 py-1 rounded-full bg-blue-600/70 border border-white/20">⚡ Iniciar primero</span>
              </motion.div>
            </div>
          </motion.button>

          {/* Jugador 2 */}
          <motion.button
            onClick={() => onSelect(1)}
            whileHover={{ scale: 1.03, y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="relative h-96 md:h-[26rem] lg:h-[30rem] overflow-hidden rounded-2xl border-2 border-orange-400/60 hover:border-orange-300 shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 group"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Fondo con blur */}
            <div
              className="absolute inset-0 bg-center bg-cover filter blur-sm md:blur-[0.9px]"
              style={{
                backgroundImage: getCharacterImage(player2.character) ? `url(${getCharacterImage(player2.character)})` : undefined,
              }}
            />
            {/* Overlays para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ backgroundImage: 'radial-gradient(circle at 80% 10%, rgba(249,115,22,0.25), transparent 40%)' }}
            />
            {/* Texto sobre la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-2xl font-black text-white drop-shadow">
                {player2.customName || 'Jugador 2'}
              </p>
              <h3 className="text-orange-200 font-semibold">
                {player2.character}
              </h3>
              <motion.div
                className="mt-3 inline-flex items-center gap-2 text-white/90 font-bold"
                whileHover={{ x: 6 }}
              >
                <span className="px-3 py-1 rounded-full bg-orange-600/70 border border-white/20">⚡ Iniciar primero</span>
              </motion.div>
            </div>
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
