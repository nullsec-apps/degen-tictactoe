import { motion } from 'framer-motion'
import { Coins, Zap, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HeroIntro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} className="text-center py-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring' }} className="flex justify-center mb-4">
        <div className="grid grid-cols-3 gap-1">
          {['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: i % 2 ? 0.4 : 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.04, type: 'spring', stiffness: 260 }} className="w-7 h-7 flex items-center justify-center rounded font-display font-bold text-sm bevel" style={{ background: '#0d120e', color: c === 'X' ? '#39FF6A' : '#FF5C00', textShadow: `0 0 8px ${c === 'X' ? '#39FF6A' : '#FF5C00'}88`, fontFamily: 'Sora' }}>{c}</motion.div>
          ))}
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="font-display font-extrabold text-3xl sm:text-4xl leading-tight mb-3" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>
        Match the bet.<br /><span style={{ color: '#39FF6A', textShadow: '0 0 20px #39FF6A66' }}>Take the pot.</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-sm leading-relaxed mb-5 px-2" style={{ color: '#6F8A72', fontFamily: 'DM Sans' }}>
        Classic 3-in-a-row, real USDC on the line. Both players lock equal stakes from $0.5 to $10 — winner sweeps everything minus a featherweight fee.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
        <Button onClick={onStart} className="w-full h-14 text-base font-display font-bold tracking-wide bevel transition-all duration-200 hover:brightness-110 active:translate-y-0.5" style={{ background: '#39FF6A', color: '#0B0E0C', boxShadow: '0 4px 0 #1ea845, 0 0 24px #39FF6A44', fontFamily: 'Sora' }}>
          <Coins className="mr-2" size={20} /> PICK YOUR STAKE
        </Button>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        <Badge className="bg-transparent border text-[11px]" style={{ borderColor: '#39FF6A44', color: '#39FF6A' }}><ShieldCheck size={12} className="mr-1" /> &lt;$5 bets: 0.1% fee</Badge>
        <Badge className="bg-transparent border text-[11px]" style={{ borderColor: '#FF5C0044', color: '#FF5C00' }}><Zap size={12} className="mr-1" /> $5–$10: 0.01% fee</Badge>
      </motion.div>
    </motion.div>
  )
}