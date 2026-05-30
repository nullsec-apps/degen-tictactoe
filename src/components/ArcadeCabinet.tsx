import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useArcadeTheme } from '../hooks/useArcadeTheme'

export default function ArcadeCabinet({ children }: { children: ReactNode }) {
  const { theme } = useArcadeTheme()
  const logo = (window as any).__NULLSEC__?.logoUrl
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative pixel-noise overflow-x-hidden" style={{ background: 'radial-gradient(ellipse at top, #16201A 0%, #0B0E0C 70%)' }}>
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: 'repeating-linear-gradient(90deg, transparent 0 40px, rgba(57,255,106,0.015) 40px 41px)' }} />
      <div className="w-full max-w-[480px] relative px-4 sm:px-6 py-5 z-10">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="relative rounded-2xl border-2 overflow-hidden bevel scanlines" style={{ borderColor: theme === 'degen' ? '#FF5C0044' : '#39FF6A33', background: 'linear-gradient(180deg,#0d120e 0%,#0B0E0C 100%)', boxShadow: theme === 'degen' ? '0 0 60px rgba(255,92,0,0.12)' : '0 0 40px rgba(57,255,106,0.08)' }}>
          <div className="flex items-center justify-center gap-2 py-3 border-b" style={{ borderColor: '#ffffff10', background: '#0a0f0b' }}>
            {logo ? <img src={logo} className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} alt="" /> : null}
            <span className="font-display font-extrabold tracking-widest text-sm" style={{ color: '#39FF6A', textShadow: '0 0 12px #39FF6A88', fontFamily: 'Sora' }}>POT&nbsp;ARCADE</span>
          </div>
          <div className="p-4 sm:p-5">{children}</div>
        </motion.div>
        <p className="text-center text-[10px] mt-3" style={{ color: '#6F8A72', fontFamily: 'DM Sans' }}>Insert credits. Match the bet. Take the pot.</p>
      </div>
    </div>
  )
}