import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import { useGhostDemo } from '../hooks/useGhostDemo'
import { TABLES } from '../lib/sampleData'

export default function WaitingRoom({ stake, onQuickJoin }: { stake?: number; onQuickJoin: (s: number) => void }) {
  const ghost = useGhostDemo()
  useEffect(() => { ghost.start(); return () => ghost.stop() }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4">
      <div className="relative">
        <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bevel" style={{ background: '#0a0f0b', border: '1px solid #ffffff0d', opacity: 0.45 }}>
          {ghost.board.map((c, i) => (
            <div key={i} className="aspect-square rounded-lg flex items-center justify-center font-display font-extrabold text-3xl bevel" style={{ background: '#0d120e', fontFamily: 'Sora' }}>
              {c && <span style={{ color: c === 'X' ? '#39FF6A' : '#FF5C00', textShadow: `0 0 8px ${c === 'X' ? '#39FF6A' : '#FF5C00'}66` }}>{c}</span>}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Badge className="text-[11px] font-display" style={{ background: '#16201Acc', color: '#39FF6A', border: '1px solid #39FF6A44', backdropFilter: 'blur(2px)' }}>
            <Users size={11} className="mr-1" /> {stake ? `Searching $${stake} table...` : `3 players hunting a $1 table`}
          </Badge>
        </div>
      </div>

      <p className="text-[11px] font-display font-bold tracking-widest mt-4 mb-2" style={{ color: '#6F8A72', fontFamily: 'Sora' }}>OPEN TABLES — QUICK JOIN</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABLES.map((t) => (
          <motion.button key={t.stake} whileTap={{ scale: 0.95 }} whileHover={{ y: -2 }} onClick={() => onQuickJoin(t.stake)} className="shrink-0 rounded-lg px-3 py-2 bevel text-left transition-all duration-200" style={{ background: '#16201A', border: '1px solid #39FF6A22' }}>
            <p className="font-display font-bold text-sm" style={{ color: '#39FF6A', fontFamily: 'Sora' }}>${t.stake % 1 === 0 ? t.stake : t.stake.toFixed(1)}</p>
            <p className="text-[10px] whitespace-nowrap" style={{ color: '#6F8A72' }}>{t.waiting} waiting</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}