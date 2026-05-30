import { motion } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trophy, Frown, Equal, RotateCcw, Coins } from 'lucide-react'
import { usd } from '../lib/format'
import type { ResultKind } from '../App'

export default function MatchResultModal({ result, stake, fee, onRematch, onNewStake, onClose }: { result: ResultKind; stake: number; fee: { gross: number; fee: number; net: number; rate: number }; onRematch: () => void; onNewStake: () => void; onClose: () => void }) {
  const cfg = {
    win: { c: '#39FF6A', t: 'YOU SWEEP THE POT', Icon: Trophy },
    lose: { c: '#FF5C00', t: 'OPPONENT TAKES IT', Icon: Frown },
    tie: { c: '#6F8A72', t: 'TIE — REFUNDED', Icon: Equal },
  }[result]
  const Icon = cfg.Icon
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-[360px] border-2 bevel scanlines overflow-hidden" style={{ background: '#0d120e', borderColor: cfg.c + '55', color: '#EAF7E4' }}>
        <div className="text-center pt-2">
          <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bevel" style={{ background: '#0a0f0b', border: `2px solid ${cfg.c}`, boxShadow: `0 0 24px ${cfg.c}66` }}>
              <Icon size={32} style={{ color: cfg.c }} />
            </div>
          </motion.div>
          <h2 className="font-display font-extrabold text-xl mb-1" style={{ color: cfg.c, textShadow: `0 0 16px ${cfg.c}55`, fontFamily: 'Sora' }}>{cfg.t}</h2>
          <div className="rounded-lg p-3 mt-4 text-left" style={{ background: '#0a0f0b', border: '1px solid #ffffff0d' }}>
            {result === 'tie' ? (
              <div className="flex justify-between text-sm"><span style={{ color: '#6F8A72' }}>Stake refunded</span><span className="font-bold" style={{ color: '#39FF6A' }}>{usd(stake)}</span></div>
            ) : (
              <>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: '#6F8A72' }}>Pot</span><span style={{ color: '#EAF7E4' }}>{usd(fee.gross)}</span></div>
                <div className="flex justify-between text-xs"><span style={{ color: '#6F8A72' }}>Rake ({(fee.rate * 100).toFixed(fee.rate >= 0.001 ? 1 : 2)}%)</span><span style={{ color: '#FF5C00' }}>-{usd(fee.fee)}</span></div>
                <Separator className="my-2" style={{ background: '#ffffff10' }} />
                <div className="flex justify-between text-sm"><span className="font-display font-bold" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>{result === 'win' ? 'You receive' : 'Opponent receives'}</span><span className="font-display font-extrabold" style={{ color: cfg.c, fontFamily: 'Sora' }}>{usd(fee.net)}</span></div>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={onRematch} className="flex-1 h-11 font-display font-bold bevel transition-all duration-200 hover:brightness-125" style={{ background: '#16201A', color: '#39FF6A', border: '1px solid #39FF6A44', fontFamily: 'Sora' }}><RotateCcw size={15} className="mr-1.5" /> Rematch</Button>
            <Button onClick={onNewStake} className="flex-1 h-11 font-display font-bold bevel transition-all duration-200 hover:brightness-110" style={{ background: '#39FF6A', color: '#0B0E0C', fontFamily: 'Sora' }}><Coins size={15} className="mr-1.5" /> New stake</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}