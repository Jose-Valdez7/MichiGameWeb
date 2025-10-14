import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useState } from 'react'

const opciones = [
  { id: 'piedra', icon: '🪨' },
  { id: 'papel', icon: '📄' },
  { id: 'tijera', icon: '✂️' },
]

type Choice = 'piedra' | 'papel' | 'tijera'

export default function PiedraPapelTijera() {
  const { players, setTurn } = useGame()
  const [player1Choice, setPlayer1Choice] = useState<Choice | null>(null)
  const [player2Choice, setPlayer2Choice] = useState<Choice | null>(null)
  const [winner, setWinner] = useState<0 | 1 | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0)

  const determineWinner = (choice1: Choice, choice2: Choice): 0 | 1 | 'tie' => {
    if (choice1 === choice2) return 'tie'
    
    const rules = {
      piedra: 'tijera',
      papel: 'piedra',
      tijera: 'papel'
    }
    
    return rules[choice1] === choice2 ? 0 : 1
  }

  const handleChoice = (choice: Choice) => {
    if (currentPlayer === 0) {
      setPlayer1Choice(choice)
      setCurrentPlayer(1)
    } else {
      setPlayer2Choice(choice)
      
      // Determinar ganador
      const result = determineWinner(player1Choice!, choice)
      if (result !== 'tie') {
        setWinner(result)
        setTurn(result)
      } else {
        // Empate, reiniciar
        setPlayer1Choice(null)
        setPlayer2Choice(null)
        setCurrentPlayer(0)
      }
    }
  }

  const resetGame = () => {
    setPlayer1Choice(null)
    setPlayer2Choice(null)
    setWinner(null)
    setCurrentPlayer(0)
  }

  return (
    <div className="min-h-dvh p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Piedra, Papel o Tijera</h1>

      <div className="card p-4 mb-4">
        <p className="text-lg font-bold text-center">
          Turno de: <span className="text-primary">{players[currentPlayer].customName || players[currentPlayer].name}</span>
        </p>
        <div className="flex gap-4 mt-2">
          <div className={`p-2 rounded ${player1Choice ? 'bg-success text-white' : 'bg-gray-200'}`}>
            {players[0].customName || players[0].name}: {player1Choice ? opciones.find(o => o.id === player1Choice)?.icon : 'Esperando...'}
          </div>
          <div className={`p-2 rounded ${player2Choice ? 'bg-success text-white' : 'bg-gray-200'}`}>
            {players[1].customName || players[1].name}: {player2Choice ? opciones.find(o => o.id === player2Choice)?.icon : 'Esperando...'}
          </div>
        </div>
      </div>

      {winner !== null && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="card p-6 text-center"
        >
          <h2 className="text-2xl font-bold text-success mb-2">
            ¡{players[winner].customName || players[winner].name} gana!
          </h2>
          <p className="text-lg">Comenzará primero en el tablero</p>
        </motion.div>
      )}

      {(!player1Choice || !player2Choice) && winner === null && (
        <div className="flex gap-4">
          {opciones.map((o) => (
            <motion.button 
              key={o.id} 
              whileHover={{ y: -6 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChoice(o.id as Choice)}
              className="card text-5xl p-6 hover:bg-primary/20 transition-colors"
            >
              {o.icon}
            </motion.button>
          ))}
        </div>
      )}

      {winner !== null && (
        <div className="flex gap-4">
          <button onClick={resetGame} className="btn btn-secondary">
            Jugar de nuevo
          </button>
          <Link to="/tablero" className="btn btn-primary">
            Ir al juego
          </Link>
        </div>
      )}

      <p className="text-white/90 text-center">
        Quien gane comienza primero en el juego de educación vial.
      </p>
    </div>
  )
}


