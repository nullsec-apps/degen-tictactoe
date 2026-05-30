import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Loader2, Coins, X } from 'lucide-react'
import { usd } from '../lib/format'
import { useArcadeSound } from '../hooks/useArcadeSound'

const STEPS = ['Approve USDC', 'Deposit to escrow', 'Searching opponent', 'Opponent locked!']

export default function BetLockPanel({ stake, onMatched, onCancel }: { stake: number; onMatched: () => void; onCancel: () => void }) {
  const [step, setStep] = useState(0)
  const sound = useArcadeSound()

  useEffect(() => {
    if (step >= STEPS.length) { const t = setTimeout(onMatched, 700); return () => clearTimeout(t) }
    const t = setTimeout(() => { sound.coin(); setStep((s) => s + 1) }, step === 2 ? 1600 : 900)
    return () => clearTimeout(t)
  }, [step])

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="rounded-xl p-5 mt-4 bevel" style={{ background: '#0d120e', border: '1px solid #39FF6A22' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><Coins size={18} style={{ color: '#39FF6A' }} /><span className="font-display font-bold" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>Locking {usd(stake)}</span></div>
        <button onClick={onCancel} className="text-xs transition-all duration-200 hover:brightness-150" style={{ color: '#6F8A72' }}><X size={16} /></button>
      </div>
      <Progress value={Math.min(100, (step / STEPS.length) * 100)} className="h-2 mb-4" style={{ background: '#0a0f0b' }} />
      <div className="space-y-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 text-sm">
            {i < step ? <CheckCircle2 size={16} style={{ color: '#39FF6A' }} /> : i === step ? <Loader2 size={16} className="animate-spin" style={{ color: '#FF5C00' }} /> : <div className="w-4 h-4 rounded-full" style={{ border: '1.5px solid #ffffff22' }} />}
            <span style={{ color: i <= step ? '#EAF7E4' : '#6F8A72', fontFamily: 'DM Sans' }}>{s}</span>
          </div>
        ))}
      </div>
      {step >= STEPS.length && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-center"><Badge className="bg-transparent border" style={{ borderColor: '#39FF6A', color: '#39FF6A' }}>Pot locked! Starting duel...</Badge></motion.div>
      )}
      {step === 0 && <Button onClick={onCancel} className="w-full h-10 mt-4 text-xs font-display transition-all duration-200 hover:brightness-125" style={{ background: 'transparent', color: '#6F8A72', border: '1px solid #ffffff14', fontFamily: 'Sora' }}>Cancel</Button>}
    </motion.div>
  )
}