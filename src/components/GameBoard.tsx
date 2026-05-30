import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import BoardCell from './BoardCell'
import type { ResultKind } from '../App'
import { useArcadeSound } from '../hooks/useArcadeSound'

export default function GameBoard({ game, stake, onResult }: { game: any; stake: number; onResult: (k: ResultKind) => void }) {
  const sound = useArcadeSound()
  const fired = useRef(false)

  useEffect(() => {
    if (game.winner || game.draw) return
    if (game.turn === 'O') {
      const t = setTimeout(() => {
        const move = game.bestMove('O')
        if (move !== -1) { game.play(move); sound.blip() }
      }, 650)
      return () => clearTimeout(t)
    }
  }, [game.turn, game.winner, game.draw])

  useEffect(() => {
    if (fired.current) return
    if (game.winner) { fired.current = true; setTimeout(() => onResult(game.winner === 'X' ? 'win' : 'lose'), 900) }
    else if (game.draw) { fired.current = true; setTimeout(() => onResult('tie'), 700) }
  }, [game.winner, game.draw])

  useEffect(() => { fired.current = false }, [game.resetKey])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="my-3">
      <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bevel" style={{ background: '#0a0f0b', border: '2px solid #39FF6A22' }}>
        {game.board.map((cell: any, i: number) => (
          <BoardCell
            key={i}
            value={cell}
            isWinning={game.line?.includes(i)}
            dimmed={!!game.winner && !game.line?.includes(i)}
            disabled={!!cell || !!game.winner || game.draw || game.turn !== 'X'}
            onClick={() => { if (game.turn === 'X' && !cell && !game.winner) { game.play(i); sound.blip() } }}
          />
        ))}
      </div>
      <p className="text-center text-[11px] mt-2 font-display font-bold tracking-widest" style={{ color: game.turn === 'X' ? '#39FF6A' : '#6F8A72', fontFamily: 'Sora' }}>
        {game.winner ? (game.winner === 'X' ? 'YOU WIN' : 'OPPONENT WINS') : game.draw ? 'DRAW' : game.turn === 'X' ? 'YOUR MOVE — TAP A CELL' : 'OPPONENT THINKING...'}
      </p>
    </motion.div>
  )
}