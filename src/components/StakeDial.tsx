import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Coins, ArrowDownToLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { computeFee } from '../lib/computeFee'
import { usd } from '../lib/format'

const STAKES = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function StakeDial({ stake, setStake, onLock }: { stake: number; setStake: (n: number) => void; onLock: (n: number) => void }) {
  const idx = STAKES.indexOf(stake) === -1 ? 1 : STAKES.indexOf(stake)
  const fee = computeFee(stake)
  const go = (d: number) => { const ni = Math.max(0, Math.min(STAKES.length - 1, idx + d)); setStake(STAKES[ni]) }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="py-4">
      <p className="text-center font-display font-bold text-lg mb-1" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>Choose your stake</p>
      <p className="text-center text-xs mb-5" style={{ color: '#6F8A72', fontFamily: 'DM Sans' }}>Both players lock equal amounts. Winner takes all.</p>

      <div className="flex items-center justify-center gap-3 mb-5">
        <Button onClick={() => go(-1)} disabled={idx === 0} className="h-12 w-12 p-0 bevel transition-all duration-200 hover:brightness-125 disabled:opacity-40" style={{ background: '#16201A', color: '#6F8A72', border: '1px solid #ffffff14' }}><ChevronLeft size={22} /></Button>
        <div className="relative w-44 h-44 rounded-2xl flex flex-col items-center justify-center bevel overflow-hidden" style={{ background: 'radial-gradient(circle, #0f1812 0%, #0a0f0b 100%)', border: '2px solid #39FF6A33' }}>
          <div className="pointer-events-none absolute inset-0 scanlines" />
          <motion.div key={stake} initial={{ scale: 0.6, opacity: 0, rotateY: -40 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} transition={{ type: 'spring', stiffness: 260 }} className="flex flex-col items-center">
            <Coins size={28} style={{ color: '#39FF6A' }} className="mb-1" />
            <span className="font-display font-extrabold text-5xl" style={{ color: '#39FF6A', textShadow: '0 0 24px #39FF6A66', fontFamily: 'Sora' }}>${stake % 1 === 0 ? stake : stake.toFixed(1)}</span>
            <span className="text-[10px] mt-1 tracking-widest" style={{ color: '#6F8A72' }}>USDC STAKE</span>
          </motion.div>
        </div>
        <Button onClick={() => go(1)} disabled={idx === STAKES.length - 1} className="h-12 w-12 p-0 bevel transition-all duration-200 hover:brightness-125 disabled:opacity-40" style={{ background: '#16201A', color: '#6F8A72', border: '1px solid #ffffff14' }}><ChevronRight size={22} /></Button>
      </div>

      <div className="flex gap-1.5 justify-center mb-5 overflow-x-auto pb-1">
        {STAKES.map((s) => (
          <button key={s} onClick={() => setStake(s)} className="shrink-0 h-9 px-3 rounded-md text-xs font-bold font-display transition-all duration-200 hover:brightness-110" style={{ background: s === stake ? '#39FF6A' : '#16201A', color: s === stake ? '#0B0E0C' : '#6F8A72', border: '1px solid ' + (s === stake ? '#39FF6A' : '#ffffff10'), fontFamily: 'Sora' }}>${s % 1 === 0 ? s : s.toFixed(1)}</button>
        ))}
      </div>

      <div className="rounded-xl p-4 mb-4 bevel" style={{ background: '#0d120e', border: '1px solid #ffffff0d' }}>
        <div className="flex justify-between text-xs mb-1"><span style={{ color: '#6F8A72' }}>Total pot</span><span className="font-bold" style={{ color: '#EAF7E4' }}>{usd(fee.gross)}</span></div>
        <div className="flex justify-between text-xs mb-1"><span style={{ color: '#6F8A72' }}>Dev rake ({(fee.rate * 100).toFixed(stake <= 5 ? 1 : 2)}%)</span><span style={{ color: '#FF5C00' }}>-{usd(fee.fee)}</span></div>
        <div className="flex justify-between text-sm pt-2 mt-1 border-t" style={{ borderColor: '#ffffff0d' }}><span className="font-display font-bold" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>You win</span><span className="font-display font-extrabold" style={{ color: '#39FF6A', fontFamily: 'Sora' }}>{usd(fee.net)}</span></div>
        <div className="mt-2"><Badge className="bg-transparent border text-[10px]" style={{ borderColor: stake <= 5 ? '#39FF6A44' : '#FF5C0044', color: stake <= 5 ? '#39FF6A' : '#FF5C00' }}>{stake <= 5 ? '0.1% fee tier' : '0.01% fee tier'}</Badge></div>
      </div>

      <Button onClick={() => onLock(stake)} className="w-full h-14 font-display font-bold text-base tracking-wide bevel transition-all duration-200 hover:brightness-110 active:translate-y-0.5" style={{ background: '#39FF6A', color: '#0B0E0C', boxShadow: '0 4px 0 #1ea845, 0 0 24px #39FF6A44', fontFamily: 'Sora' }}>
        <ArrowDownToLine className="mr-2" size={20} /> PULL THE SLOT — LOCK {usd(stake)}
      </Button>
    </motion.div>
  )
}