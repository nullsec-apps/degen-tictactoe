import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Coins } from 'lucide-react'
import { usd } from '../lib/format'
import type { ResultKind } from '../App'

export default function PotMeter({ stake, fee, locked, winner }: { stake: number; fee: { gross: number; net: number; fee: number }; locked: boolean; winner: ResultKind | null }) {
  const coins = Math.min(14, Math.round(fee.gross * 2))
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-4 mb-3 bevel relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#0f1812,#0a0f0b)', border: '1px solid #39FF6A22' }}>
      <div className="pointer-events-none absolute inset-0 scanlines" />
      <div className="flex items-center justify-between relative">
        <div>
          <p className="text-[10px] tracking-widest" style={{ color: '#6F8A72' }}>LIVE POT</p>
          <motion.p key={fee.gross} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="font-display font-extrabold text-3xl" style={{ color: '#39FF6A', textShadow: '0 0 18px #39FF6A55', fontFamily: 'Sora' }}>{usd(fee.gross)}</motion.p>
        </div>
        <div className="flex items-end gap-1 h-16">
          {Array.from({ length: coins }).map((_, i) => (
            <motion.div key={i} initial={{ height: 0, opacity: 0 }} animate={{ height: 8 + (i % 5) * 3, opacity: 1 }} transition={{ delay: i * 0.04, type: 'spring' }} className="w-2.5 rounded-sm" style={{ background: i % 2 ? '#FF5C00' : '#39FF6A', boxShadow: `0 0 6px ${i % 2 ? '#FF5C00' : '#39FF6A'}88`, alignSelf: 'flex-end' }} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 relative">
        <Badge className="bg-transparent border text-[10px]" style={{ borderColor: '#39FF6A44', color: '#39FF6A' }}><Coins size={11} className="mr-1" /> YOU {usd(stake)}</Badge>
        <span className="text-[10px] font-display font-bold" style={{ color: '#6F8A72', fontFamily: 'Sora' }}>VS</span>
        <Badge className="bg-transparent border text-[10px]" style={{ borderColor: '#FF5C0044', color: '#FF5C00' }}><Coins size={11} className="mr-1" /> OPP {usd(stake)}</Badge>
      </div>
      {winner && (
        <motion.div initial={{ opacity: 0, x: winner === 'win' ? 60 : -60 }} animate={{ opacity: 1, x: 0 }} className="mt-2 text-center text-[11px] font-display font-bold relative" style={{ color: winner === 'win' ? '#39FF6A' : winner === 'tie' ? '#6F8A72' : '#FF5C00', fontFamily: 'Sora' }}>
          {winner === 'win' ? `POT SLAMS TO YOU → ${usd(fee.net)}` : winner === 'tie' ? 'TIE → STAKES REFUNDED' : 'POT SWEPT BY OPPONENT'}
        </motion.div>
      )}
    </motion.div>
  )
}