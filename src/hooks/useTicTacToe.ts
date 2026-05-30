import { useState, useCallback } from 'react'
import { Cell, checkWinner, isDraw, bestMove } from '../lib/gameLogic'

export function useTicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<'X' | 'O'>('X')
  const [resetKey, setResetKey] = useState(0)

  const res = checkWinner(board)
  const winner = res?.winner ?? null
  const line = res?.line ?? null
  const draw = !winner && isDraw(board)

  const play = useCallback((i: number) => {
    setBoard((prev) => {
      if (prev[i] || checkWinner(prev)) return prev
      const nb = [...prev]
      nb[i] = turn
      return nb
    })
    setTurn((t) => (t === 'X' ? 'O' : 'X'))
  }, [turn])

  const bestMoveFor = useCallback((mark: 'X' | 'O') => bestMove(board, mark), [board])

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null))
    setTurn('X')
    setResetKey((k) => k + 1)
  }, [])

  return { board, turn, winner, line, draw, play, reset, resetKey, bestMove: bestMoveFor }
}