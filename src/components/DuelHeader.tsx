import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { usd } from '../lib/format'

function Player({ name, mark, color, active, side }: { name: string; mark: string; color: string; active: boolean; side: 'l' | 'r' }) {
  return (
    <div className={`flex items-center gap-2 ${side === 'r' ? 'flex-row-reverse text-right' : ''}`}>
      <div className="relative">
        {active && <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }} transition={{ repeat: Infinity, duration: 1.2 }} className="absolute inset-0 rounded-full" style={{ background: color }} />}
        <Avatar className="h-9 w-9 relative" style={{ border: `2px solid ${color}`, boxShadow: active ? `0 0 12px ${color}` : 'none' }}>
          <AvatarFallback className="text-xs font-display font-bold" style={{ background: '#16201A', color, fontFamily: 'Sora' }}>{mark}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="text-xs font-display font-bold leading-none" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>{name}</p>
        <p className="text-[10px]" style={{ color: '#6F8A72' }}>plays {mark}</p>
      </div>
    </div>
  )
}

export default function DuelHeader({ game, stake }: { game: any; stake: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-3 mb-1 bevel flex items-center justify-between" style={{ background: '#0d120e', border: '1px solid #ffffff0d' }}>
      <Player name="you" mark="X" color="#39FF6A" active={game.turn === 'X' && !game.winner} side="l" />
      <Badge className="bg-transparent border text-[10px] font-display" style={{ borderColor: '#ffffff14', color: '#6F8A72' }}>{usd(stake)} ea</Badge>
      <Player name="cryptoT" mark="O" color="#FF5C00" active={game.turn === 'O' && !game.winner} side="r" />
    </motion.div>
  )
}