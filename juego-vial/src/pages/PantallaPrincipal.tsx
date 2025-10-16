import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSound } from '../hooks/useSound'

import ModalPregunta from '../components/ModalPregunta'
import ModalGanador from '../components/ModalGanador'
import senalPare from '../assets/Imagenes michivial/señaletica de pare - Edited (1).png'
import gatoauto from '../assets/Imagenes michivial/Michimovil vista frontal.png'
import movilis from '../assets/Imagenes michivial/michimobilis.png'
import cliclistas from '../assets/Imagenes michivial/gatobicileta.png'
import riesgos from '../assets/Imagenes michivial/Gato_en construccion 1.png'
import peatones from '../assets/Imagenes michivial/gatocruzando.png'

const imagenes = [
  { id: 1, icon: '🚦', name: 'Señales', imageSrc: senalPare, category: 'transito', categoryName: 'Educación Vial' },
  { id: 2, icon: '🚸', name: 'Movilis', imageSrc: movilis, category: 'movilis', categoryName: 'Movilis' },
  { id: 3, icon: '🚗', name: 'Vehículos', imageSrc: gatoauto, category: 'transito', categoryName: 'Educación Vial' },
  { id: 4, icon: '🚶', name: 'Peatones', imageSrc: peatones, category: 'transito', categoryName: 'Educación Vial' },
  { id: 5, icon: '🛣️', name: 'Riesgos', imageSrc: riesgos, category: 'riesgos', categoryName: 'Riesgos Naturales' },
  { id: 6, icon: '🅿️', name: 'cliclistas', imageSrc: cliclistas, category: 'transito', categoryName: 'Educación Vial' },
]

export default function PantallaPrincipal() {
  const { players, currentTurn, addPoint, setTurn, reset } = useGame()
  const navigate = useNavigate()
  const [imagenesBloqueadas, setImagenesBloqueadas] = useState<Set<number>>(new Set())
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [gameFinished, setGameFinished] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [questionSelectedAnswer, setQuestionSelectedAnswer] = useState<number | null>(null)
  const [questionIsCorrect, setQuestionIsCorrect] = useState<boolean | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)


  const { playSound, stopAllSounds } = useSound()
  const currentPlayer = players[currentTurn]

  // Solo música de fondo
  const backgroundMusic = '/sounds/Treasure Trove Cove - Banjo-Kazooie (GilvaSunner Reupload).mp3'

  // Función para activar el audio
  const enableAudio = () => {
    setAudioEnabled(true)
    // Reproducir música de fondo
    playSound(backgroundMusic, { volume: 0.3, loop: true })
  }

  // Función para desactivar el audio
  const disableAudio = () => {
    setAudioEnabled(false)
    // Detener todos los sonidos
    stopAllSounds()
  }

  // Inicializar el juego cuando se llega por primera vez desde FightIntro
  useEffect(() => {
    // Inicializar si ambos jugadores tienen personajes seleccionados
    if (players[0]?.character && players[1]?.character) {
      if (!isInitialized) {
      // Resetear el estado del juego para empezar limpio
      setGameFinished(false)
      setImagenesBloqueadas(new Set())
      setShowQuestionModal(false)
      setShowWinnerModal(false)
      setSelectedImageId(null)
      setIsInitialized(true)
        // NO cambiar el turno aquí - respetar la selección del modal
        // El turno ya fue establecido por setStartingPlayer en el modal
        
        // Reproducir música de fondo
        if (audioEnabled) {
          playSound(backgroundMusic, { volume: 0.3, loop: true })
        }
      }
    }
    // Removido el else que reseteaba isInitialized
  }, [players, isInitialized, currentTurn])

  // Limpiar sonidos al desmontar el componente
  useEffect(() => {
    return () => {
      stopAllSounds()
    }
  }, [stopAllSounds])

  // Verificar si hay un ganador
  useEffect(() => {
    const winner = players.find(player => player.points >= 3)
    if (winner && !gameFinished) {
      setGameFinished(true)
      setShowWinnerModal(true)
    }
  }, [players, gameFinished])

  const handleImageClick = (imageId: number) => {
    // No permitir clic si la imagen está bloqueada, el juego terminó, o no está inicializado
    if (imagenesBloqueadas.has(imageId) || gameFinished || !isInitialized) {
      return
    }
    
    setSelectedImageId(imageId)
    setQuestionSelectedAnswer(null)
    setQuestionIsCorrect(null)
    setShowQuestionModal(true)
    
    // Ocultar banner mientras el modal de preguntas está abierto
    window.dispatchEvent(new CustomEvent('toggle-banner', { detail: { hidden: true } }))
  }

  const handleQuestionAnswered = (isCorrect: boolean) => {
    setShowQuestionModal(false)
    // Mostrar banner al cerrar el modal
    window.dispatchEvent(new CustomEvent('toggle-banner', { detail: { hidden: false } }))
    
    
    if (isCorrect && selectedImageId) {
      // Bloquear la imagen y dar punto
      setImagenesBloqueadas(prev => new Set(prev).add(selectedImageId))
      addPoint(currentTurn)
    }
    
    // Cambiar turno
    setTurn(currentTurn === 0 ? 1 : 0)
    setSelectedImageId(null)
    setQuestionSelectedAnswer(null)
    setQuestionIsCorrect(null)
  }

  const handleSemaphoreUpdate = (selectedAnswer: number | null, isCorrect: boolean | null) => {
    setQuestionSelectedAnswer(selectedAnswer)
    setQuestionIsCorrect(isCorrect)
  }

  const handleWinnerModalClose = () => {
    setShowWinnerModal(false)
    // Aquí podrías navegar a la pantalla de preguntas original si quieres
  }

  const resetGame = () => {
    // Reiniciar el estado del juego
    reset()
    setImagenesBloqueadas(new Set())
    setGameFinished(false)
    setShowWinnerModal(false)
    setSelectedImageId(null)
    setShowQuestionModal(false)
    
    // Pequeño delay para asegurar que el reset se complete antes de navegar
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

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

  return (
    <>
      {/* Panel flotante con info del jugador (cuando hay pregunta abierta) */}
      {showQuestionModal && (
        <div className="fixed top-6 left-6 z-50">
          <div className="relative">
            {/* Glow decorativo */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />
            <div className="relative flex items-center gap-4 bg-black/60 backdrop-blur-lg border-2 border-white/20 rounded-3xl px-4 py-3 md:px-5 md:py-4 shadow-2xl">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/40 shadow overflow-hidden bg-center bg-cover"
                style={{ backgroundImage: getCharacterImage(currentPlayer.character) ? `url(${getCharacterImage(currentPlayer.character)})` : undefined }}
              />
              <div className="text-left leading-snug">
                <p className="text-white font-black text-lg md:text-2xl drop-shadow">
                  {currentPlayer.customName || currentPlayer.name}
                </p>
                <p className="text-blue-200 text-sm md:text-base">
                  Puntos: <span className="font-extrabold text-yellow-300">{currentPlayer.points}/3</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Semáforo flotante - solo cuando el modal de preguntas está abierto */}
      {showQuestionModal && (
        <motion.div 
            className="fixed top-8 right-12 w-23 h-36 bg-gray-800 rounded-xl border-2 border-white shadow-2xl z-50"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            delay: 0.5, 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
        >
          {/* Estructura del semáforo */}
          <div className="w-full h-full p-3 flex flex-col justify-between">
            {/* Luz roja */}
            <div className={`w-16 h-16 rounded-full border-2 ${
              questionSelectedAnswer !== null && !questionIsCorrect 
                ? 'bg-red-500 border-red-300 shadow-red-500/50 shadow-lg animate-pulse' 
                : 'bg-gray-600 border-white'
            }`} />
            
            {/* Luz amarilla */}
            <div className={`w-16 h-16 rounded-full border-2 ${
              questionSelectedAnswer === null
                ? 'bg-yellow-500 border-yellow-300 shadow-yellow-500/50 shadow-lg animate-pulse'
                : 'bg-gray-600 border-white'
            }`} />
            
            {/* Luz verde */}
            <div className={`w-16 h-16 rounded-full border-2 ${
              questionSelectedAnswer !== null && questionIsCorrect
                ? 'bg-green-500 border-green-300 shadow-green-500/50 shadow-lg animate-pulse'
                : 'bg-gray-600 border-white'
            }`} />
          </div>
          
          {/* Etiqueta del semáforo */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-800 rounded border border-white">
          </div>
        </motion.div>
      )}

    <div className="min-h-dvh p-6 flex flex-col items-center gap-6 relative overflow-hidden">
      {/* Botón para activar audio - Posición discreta */}
      {!audioEnabled && (
        <motion.button
          onClick={enableAudio}
          className="fixed bottom-6 right-6 z-40 bg-black/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/30 hover:bg-black/40 transition-all duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔊 Activar Sonidos
        </motion.button>
      )}

      {/* Botón para desactivar audio - Posición discreta */}
      {audioEnabled && (
        <motion.button
          onClick={disableAudio}
          className="fixed bottom-6 right-6 z-40 bg-black/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/30 hover:bg-black/40 transition-all duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔇 Desactivar Sonidos
        </motion.button>
      )}

      {/* Fondo épico con gradiente dramático */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
      
      {/* Efectos de partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
          </div>
          
       {/* Contenido principal */}
       <div className="relative z-0 flex flex-col items-center gap-6 w-full">
      
       {/* Arena de Batalla */}
       <div className="relative w-full max-w-6xl">
         {/* Efectos de batalla de fondo */}
         <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl"></div>
         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-orange-600/20 rounded-3xl"></div>
         
         {/* Líneas de energía entre jugadores */}
         <motion.div 
           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-20 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full opacity-60"
           animate={{ 
             scaleY: [1, 1.2, 1],
             opacity: [0.6, 1, 0.6]
           }}
           transition={{ duration: 2, repeat: Infinity }}
         />
         
         <div className="relative flex justify-between items-center p-6">
           {/* Jugador 1 - Lado Izquierdo */}
           <motion.div 
             className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 backdrop-blur-xl border-2 border-blue-400 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex-1 max-w-xs"
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
             style={{
               backgroundImage: getCharacterImage(players[0].character) ? `url(${getCharacterImage(players[0].character)})` : undefined,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat'
             }}
           >
             {/* Overlay épico */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 to-blue-800/70 rounded-2xl"></div>
             
             {/* Efectos de energía */}
             <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
             <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
             
             <div className="relative z-10 text-center">
               <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl mb-3 mx-auto relative">
                 {getCharacterImage(players[0].character) ? (
                   <img 
                     src={getCharacterImage(players[0].character) || ''} 
                     alt={players[0].character || 'Jugador 1'}
                     className="w-full h-full object-cover"
                   />
                 ) : (
                   <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
                     🚗
                   </div>
                 )}
                 {/* Aura del personaje */}
                 <div className="absolute inset-0 border-2 border-blue-300 rounded-full animate-ping opacity-30"></div>
          </div>
          
               <h3 className="text-xl font-black text-white mb-2 drop-shadow-2xl">{players[0].customName || 'Jugador 1'}</h3>
               <p className="text-sm text-blue-200 font-bold mb-3">{players[0].character}</p>
               
               {/* Barra de vida épica */}
               <div className="relative">
                 <div className="w-full bg-gray-800 rounded-full h-3 mb-2 border border-gray-600">
                   <motion.div 
                     className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-3 rounded-full relative overflow-hidden"
                     initial={{ width: 0 }}
                     animate={{ width: `${(players[0].points / 3) * 100}%` }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                   >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                   </motion.div>
                 </div>
                 <p className="text-xs text-yellow-300 font-bold">{players[0].points}/3 PUNTOS</p>
               </div>
             </div>
           </motion.div>

           {/* VS Central - Arena */}
           <motion.div 
             className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-xl border-2 border-yellow-400/60 rounded-3xl p-6 shadow-2xl mx-8 relative"
             initial={{ scale: 0, rotate: -180 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
           >
             {/* Efectos de energía central */}
             <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl animate-pulse"></div>
             
             <div className="relative z-10 text-center">
               <motion.div
                 className="text-4xl font-black text-yellow-400 mb-4 drop-shadow-2xl"
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 ⚔️ VS ⚔️
               </motion.div>
               
               <h3 className="text-lg font-black text-yellow-300 mb-4 drop-shadow">LE TOCA A:</h3>
               
               <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 mb-4 shadow-2xl relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-pulse opacity-50"></div>
                 <div className="relative z-10 w-12 h-12 mx-auto flex items-center justify-center">
                   <span className="text-black font-black text-xl">
                     {isInitialized ? (currentPlayer.customName || `J${currentTurn + 1}`) : '...'}
                   </span>
          </div>
        </div>
               
               <p className="text-sm text-yellow-200 font-bold">
                 {isInitialized ? '🎯 ¡ELIGE UNA PREGUNTA!' : '🔄 PREPARANDO ARENA...'}
               </p>
             </div>
           </motion.div>

           {/* Jugador 2 - Lado Derecho */}
           <motion.div 
             className="bg-gradient-to-br from-orange-600/30 to-red-800/30 backdrop-blur-xl border-2 border-orange-400 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex-1 max-w-xs"
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
             style={{
               backgroundImage: getCharacterImage(players[1].character) ? `url(${getCharacterImage(players[1].character)})` : undefined,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat'
             }}
           >
             {/* Overlay épico */}
             <div className="absolute inset-0 bg-gradient-to-br from-orange-900/85 to-red-800/70 rounded-2xl"></div>
             
             {/* Efectos de energía */}
             <div className="absolute -top-2 -left-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
             <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
             
             <div className="relative z-10 text-center">
               <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-400 shadow-2xl mb-3 mx-auto relative">
                 {getCharacterImage(players[1].character) ? (
                   <img 
                     src={getCharacterImage(players[1].character) || ''} 
                     alt={players[1].character || 'Jugador 2'}
                     className="w-full h-full object-cover"
                   />
                 ) : (
                   <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl">
                     🚙
                   </div>
                 )}
                 {/* Aura del personaje */}
                 <div className="absolute inset-0 border-2 border-orange-300 rounded-full animate-ping opacity-30"></div>
      </div>

               <h3 className="text-xl font-black text-white mb-2 drop-shadow-2xl">{players[1].customName || 'Jugador 2'}</h3>
               <p className="text-sm text-orange-200 font-bold mb-3">{players[1].character}</p>
               
               {/* Barra de vida épica */}
               <div className="relative">
                 <div className="w-full bg-gray-800 rounded-full h-3 mb-2 border border-gray-600">
                   <motion.div 
                     className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-3 rounded-full relative overflow-hidden"
                     initial={{ width: 0 }}
                     animate={{ width: `${(players[1].points / 3) * 100}%` }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                   >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                   </motion.div>
                 </div>
                 <p className="text-xs text-yellow-300 font-bold">{players[1].points}/3 PUNTOS</p>
               </div>
             </div>
           </motion.div>
         </div>
       </div>
      {/* Grid de Cartas de Batalla - Estilo Épico */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {imagenes.map((imagen, index) => {
          const isBlocked = imagenesBloqueadas.has(imagen.id)
          const isCurrentPlayerTurn = !gameFinished && isInitialized
          
          
          // Colores de batalla según categoría
          const battleColors = {
            transito: { 
              primary: 'from-blue-600/40 to-blue-800/40', 
              secondary: 'from-blue-500/20 to-blue-700/20',
              border: 'border-blue-400/60', 
              hover: 'hover:border-blue-300', 
              shadow: 'hover:shadow-blue-500/30',
              glow: 'from-blue-400/30 to-blue-600/30',
              accent: 'bg-blue-500/20 text-blue-300 border-blue-400/40'
            },
            movilis: { 
              primary: 'from-purple-600/40 to-purple-800/40', 
              secondary: 'from-purple-500/20 to-purple-700/20',
              border: 'border-purple-400/60', 
              hover: 'hover:border-purple-300', 
              shadow: 'hover:shadow-purple-500/30',
              glow: 'from-purple-400/30 to-purple-600/30',
              accent: 'bg-purple-500/20 text-purple-300 border-purple-400/40'
            },
            riesgos: { 
              primary: 'from-red-600/40 to-red-800/40', 
              secondary: 'from-red-500/20 to-red-700/20',
              border: 'border-red-400/60', 
              hover: 'hover:border-red-300', 
              shadow: 'hover:shadow-red-500/30',
              glow: 'from-red-400/30 to-red-600/30',
              accent: 'bg-red-500/20 text-red-300 border-red-400/40'
            }
          }
          
          const colors = battleColors[imagen.category as keyof typeof battleColors]
          
          return (
            <motion.div
              key={imagen.id}
              className="relative group"
              initial={{ scale: 0, opacity: 0, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 80 }}
            >
              {/* Carta de Batalla Épica */}
            <button
              onClick={() => handleImageClick(imagen.id)}
              disabled={isBlocked || !isCurrentPlayerTurn}
              className={`
                  relative w-full h-64 rounded-3xl border-2 transition-all duration-500 overflow-hidden
                ${isBlocked 
                    ? 'bg-gradient-to-br from-gray-600/40 to-gray-800/40 border-gray-500/50 cursor-not-allowed opacity-60' 
                    : isCurrentPlayerTurn 
                      ? `bg-gradient-to-br ${colors.primary} ${colors.border} ${colors.hover} hover:shadow-2xl ${colors.shadow} cursor-pointer` 
                      : 'bg-gradient-to-br from-gray-500/30 to-gray-700/30 border-gray-400/50 cursor-not-allowed opacity-75'
                  }
                `}
              >
                {/* Efectos de Energía de Batalla */}
                {!isBlocked && isCurrentPlayerTurn && (
                  <>
                    {/* Resplandor de Poder */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.glow} rounded-3xl`}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Líneas de Energía */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Partículas de Energía */}
                    <div className="absolute top-3 right-3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse group-hover:animate-bounce"></div>
                    <div className="absolute bottom-3 left-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse group-hover:animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute top-1/2 right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse group-hover:animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                  </>
                )}
                
                {/* Contenido de la Carta */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                  {/* Icono de Batalla */}
                  <motion.div 
                    className="relative mb-4"
                    animate={!isBlocked && isCurrentPlayerTurn ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {isBlocked ? (
                      <div className="text-6xl relative">
                        <span className="text-6xl">🔒</span>
                        {/* Efecto de aura para bloqueado */}
                        <div className="absolute inset-0 border-2 border-gray-400 rounded-full animate-ping opacity-30"></div>
                      </div>
                    ) : imagen.imageSrc ? (
                      <div className="relative">
                        <img src={imagen.imageSrc} alt={imagen.name} className="w-32 h-32 object-contain drop-shadow-2xl" />
                        {/* Aura del icono */}
                        {isCurrentPlayerTurn && (
                          <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-ping opacity-40"></div>
                        )}
                      </div>
                    ) : (
                      <div className="relative">
                        <span className="text-6xl drop-shadow-2xl">{imagen.icon}</span>
                        {/* Aura del emoji */}
                        {isCurrentPlayerTurn && (
                          <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-ping opacity-40"></div>
                        )}
              </div>
                    )}
                  </motion.div>
                  
                  {/* Título de Batalla */}
                  <h3 className="text-lg font-black text-white mb-3 drop-shadow-2xl text-center group-hover:text-yellow-300 transition-colors duration-300 uppercase">
                    {isBlocked ? '✅ VICTORIA' : imagen.name.toUpperCase()}
              </h3>
                  
                  {/* Indicador de Poder de Categoría */}
                  {!isBlocked && (
                    <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${colors.accent} group-hover:scale-110 transition-transform duration-300`}>
                      {imagen.categoryName}
                    </div>
                  )}
                  
                  {/* Mensaje de Victoria */}
              {isBlocked && (
                    <motion.p 
                      className="text-sm text-green-300 font-bold mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      🎯 PODER DOMINADO
                    </motion.p>
                  )}
                  
                  {/* Indicador de Poder Activo */}
                  {!isBlocked && isCurrentPlayerTurn && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-black text-black group-hover:scale-110 transition-transform duration-300">
                      ⚡
                    </div>
                  )}
                </div>
                
                {/* Efecto de Aura de Batalla */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-yellow-400/50 group-hover:shadow-yellow-400/20 transition-all duration-500`}></div>
            </button>
              
              {/* Sombra de Batalla */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent rounded-3xl group-hover:from-black/20 transition-all duration-500"></div>
            </motion.div>
          )
        })}
      </div>

      {/* Mensaje de estado si no está inicializado - Estilo épico */}
      {!isInitialized && (
        <motion.div 
          className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-lg border border-yellow-400/50 rounded-2xl p-6 shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div 
              className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-yellow-300 font-bold text-lg">
              ⚡ Esperando que ambos jugadores seleccionen sus personajes...
            </p>
          </div>
        </motion.div>
      )}

      {/* Botón de reinicio - solo cuando hay ganador - Estilo épico */}
      {gameFinished && (
        <motion.button 
          onClick={resetGame}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          🆕 Empezar Nuevo Juego
        </motion.button>
      )}


      {/* Modales */}

      <ModalPregunta
        isOpen={showQuestionModal}
        onClose={() => {
          setShowQuestionModal(false)
          window.dispatchEvent(new CustomEvent('toggle-banner', { detail: { hidden: false } }))
        }}
        onAnswer={handleQuestionAnswered}
        imageId={selectedImageId}
        currentPlayer={currentPlayer}
        onSemaphoreUpdate={handleSemaphoreUpdate}
      />

      <ModalGanador
        isOpen={showWinnerModal}
        onClose={handleWinnerModalClose}
        winner={players.find(player => player.points >= 3)}
        onContinue={resetGame}
      />
    </div>
    </div>
    </>
  )
}
