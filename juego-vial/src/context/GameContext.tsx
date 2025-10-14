import { createContext, useContext, useMemo, useState, ReactNode } from 'react'

type Player = {
  name: string
  character: string | null
  position: number
}

type GameState = {
  players: [Player, Player]
  currentTurn: 0 | 1
  winner: 0 | 1 | null
}

type GameContextType = GameState & {
  selectCharacter: (playerIndex: 0 | 1, character: string) => void
  setTurn: (turn: 0 | 1) => void
  advance: (playerIndex: 0 | 1) => void
  reset: () => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    players: [
      { name: 'Jugador 1', character: null, position: 0 },
      { name: 'Jugador 2', character: null, position: 0 },
    ],
    currentTurn: 0,
    winner: null,
  })

  const api: GameContextType = useMemo(() => ({
    ...state,
    selectCharacter: (playerIndex, character) => {
      setState((s) => {
        const players = [...s.players] as [Player, Player]
        players[playerIndex] = { ...players[playerIndex], character }
        return { ...s, players }
      })
    },
    setTurn: (turn) => setState((s) => ({ ...s, currentTurn: turn })),
    advance: (playerIndex) => {
      setState((s) => {
        const players = [...s.players] as [Player, Player]
        const next = Math.min(players[playerIndex].position + 1, 3)
        players[playerIndex] = { ...players[playerIndex], position: next }
        const winner = next >= 3 ? playerIndex : null
        return { ...s, players, winner }
      })
    },
    reset: () => setState({
      players: [
        { name: 'Jugador 1', character: null, position: 0 },
        { name: 'Jugador 2', character: null, position: 0 },
      ],
      currentTurn: 0,
      winner: null,
    }),
  }), [state])

  return <GameContext.Provider value={api}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame debe usarse dentro de GameProvider')
  return ctx
}


