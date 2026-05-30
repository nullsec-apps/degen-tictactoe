import { motion } from 'framer-motion'
import { Receipt } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { usd } from '../lib/format'

export default function RakeReceipt({ fee }: { fee: { gross: number; fee: number; net: number; rate: number } }) {
  return (
    <motion.div initial={{ opacity: 0, y: -20, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.3, type: 'spring' }} className="rounded-lg p-3 mt-3 bevel" style={{ background: '#0d120e', border: '1px dashed #FF5C0044' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Receipt size={13} style={{ color: '#FF5C00' }} />
        <span className="text-[11px] font-display font-bold tracking-widest" style={{ color: '#FF5C00', fontFamily: 'Sora' }}>RAKE RECEIPT</span>
      </div>
      <div className="flex justify-between text-xs mb-1"><span style={{ color: '#6F8A72' }}>Gross pot</span><span style={{ color: '#EAF7E4' }}>{usd(fee.gross)}</span></div>
      <div className="flex justify-between text-xs"><span style={{ color: '#6F8A72' }}>Dev fee ({(fee.rate * 100).toFixed(fee.rate >= 0.001 ? 1 : 2)}%)</span><motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: '#FF5C00' }}>-{usd(fee.fee)}</motion.span></div>
      <Separator className="my-2" style={{ background: '#ffffff10' }} />
      <div className="flex justify-between text-sm"><span className="font-display font-bold" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>Net payout</span><span className="font-display font-extrabold" style={{ color: '#39FF6A', fontFamily: 'Sora' }}>{usd(fee.net)}</span></div>
    </motion.div>
  )
}