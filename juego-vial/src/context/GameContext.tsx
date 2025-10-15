import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from 'react'

type Player = {
  name: string
  customName: string | null
  character: string | null
  position: number
  points: number
}

type GameState = {
  players: [Player, Player]
  currentTurn: 0 | 1
  winner: 0 | 1 | null
}

type GameContextType = GameState & {
  selectCharacter: (playerIndex: 0 | 1, character: string) => void
  setCustomName: (playerIndex: 0 | 1, customName: string) => void
  setTurn: (turn: 0 | 1) => void
  addPoint: (playerIndex: 0 | 1) => void
  reset: () => void
  justReset: boolean
}

const GameContext = createContext<GameContextType | null>(null)

// Clave para localStorage
const STORAGE_KEY = 'juego-vial-state'

// Estado inicial por defecto
const defaultState: GameState = {
  players: [
    { name: 'Jugador 1', customName: null, character: null, position: 0, points: 0 },
    { name: 'Jugador 2', customName: null, character: null, position: 0, points: 0 },
  ],
  currentTurn: 0,
  winner: null,
}

// Función para cargar estado desde localStorage
const loadStateFromStorage = (): GameState => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState) {
      const parsed = JSON.parse(savedState)
      // Validar que la estructura sea correcta
      if (
        parsed.players &&
        Array.isArray(parsed.players) &&
        parsed.players.length === 2 &&
        typeof parsed.currentTurn === 'number' &&
        (parsed.currentTurn === 0 || parsed.currentTurn === 1) &&
        (parsed.winner === null || parsed.winner === 0 || parsed.winner === 1) &&
        // Validar estructura de jugadores
        parsed.players.every((player: any) =>
          typeof player === 'object' &&
          typeof player.name === 'string' &&
          (player.customName === null || typeof player.customName === 'string') &&
          (player.character === null || typeof player.character === 'string') &&
          typeof player.position === 'number' &&
          typeof player.points === 'number'
        )
      ) {
        // Si los puntos no existen en datos antiguos, inicializarlos
        if (parsed.players.some((player: any) => typeof player.points === 'undefined')) {
          parsed.players = parsed.players.map((player: any) => ({
            ...player,
            points: player.points || 0
          }))
        }
        return parsed
      }
    }
  } catch (error) {
    console.error('Error al cargar estado desde localStorage:', error)
  }
  return defaultState
}

// Función para guardar estado en localStorage
const saveStateToStorage = (state: GameState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error al guardar estado en localStorage:', error)
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(loadStateFromStorage)
  const [justReset, setJustReset] = useState(false)

  // Efecto para guardar automáticamente en localStorage cuando cambie el estado
  useEffect(() => {
    saveStateToStorage(state)
  }, [state])

  // Resetear la bandera justReset después de un tiempo
  useEffect(() => {
    if (justReset) {
      const timer = setTimeout(() => setJustReset(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [justReset])

  const api: GameContextType = useMemo(() => ({
    ...state,
    justReset,
    selectCharacter: (playerIndex, character) => {
      setState((s) => {
        const players = [...s.players] as [Player, Player]
        players[playerIndex] = { ...players[playerIndex], character }
        return { ...s, players }
      })
    },
    setCustomName: (playerIndex, customName) => {
      setState((s) => {
        const players = [...s.players] as [Player, Player]
        players[playerIndex] = { ...players[playerIndex], customName, name: customName }
        return { ...s, players }
      })
    },
    setTurn: (turn) => setState((s) => ({ ...s, currentTurn: turn })),
    addPoint: (playerIndex) => {
      setState((s) => {
        const players = [...s.players] as [Player, Player]
        const currentPlayer = players[playerIndex]
        
        // Agregar punto y actualizar posición
        const newPoints = currentPlayer.points + 1
        const newPosition = Math.min(newPoints, 3) // Máximo 3 posiciones (0, 1, 2, 3)
        
        players[playerIndex] = { 
          ...currentPlayer, 
          points: newPoints,
          position: newPosition
        }
        
        // Determinar ganador (3 puntos = posición 3 = meta)
        const winner = newPoints >= 3 ? playerIndex : null
        
        return { ...s, players, winner }
      })
    },
    reset: () => {
      setState(defaultState)
      setJustReset(true)
      // Limpiar localStorage cuando se resetea el juego
      localStorage.removeItem(STORAGE_KEY)
      // También limpiar la decisión del modal
      localStorage.removeItem('juego-vial-modal-decision')
    },
  }), [state, justReset])

  return <GameContext.Provider value={api}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame debe usarse dentro de GameProvider')
  return ctx
}


