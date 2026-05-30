import { useState, useRef, useCallback } from 'react'
import { Cell, checkWinner, isDraw, bestMove } from '../lib/gameLogic'

export function useGhostDemo() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const ref = useRef<any>(null)
  const turnRef = useRef<'X' | 'O'>('X')

  const tick = useCallback(() => {
    setBoard((prev) => {
      if (checkWinner(prev) || isDraw(prev)) {
        turnRef.current = 'X'
        return Array(9).fill(null)
      }
      const m = bestMove(prev, turnRef.current, true)
      if (m === -1) return Array(9).fill(null)
      const nb = [...prev]
      nb[m] = turnRef.current
      turnRef.current = turnRef.current === 'X' ? 'O' : 'X'
      return nb
    })
  }, [])

  const start = useCallback(() => { if (ref.current) return; ref.current = setInterval(tick, 900) }, [tick])
  const stop = useCallback(() => { if (ref.current) { clearInterval(ref.current); ref.current = null } }, [])

  return { board, start, stop }
}