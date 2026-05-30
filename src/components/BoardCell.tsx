import { motion } from 'framer-motion'
import { useArcadeSound } from '../hooks/useArcadeSound'

export default function BoardCell({ value, onClick, disabled, isWinning, dimmed }: { value: 'X' | 'O' | null; onClick: () => void; disabled: boolean; isWinning?: boolean; dimmed?: boolean }) {
  const sound = useArcadeSound()
  const color = value === 'X' ? '#39FF6A' : '#FF5C00'
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.9 }}
      onClick={() => { if (!disabled) { onClick(); sound.haptic() } }}
      disabled={disabled}
      className="aspect-square rounded-lg flex items-center justify-center font-display font-extrabold text-4xl sm:text-5xl relative overflow-hidden bevel transition-all duration-200"
      style={{
        background: isWinning ? '#39FF6A22' : '#0d120e',
        border: isWinning ? '2px solid #39FF6A' : '1px solid #ffffff0d',
        cursor: disabled ? 'default' : 'pointer',
        filter: dimmed ? 'grayscale(1) brightness(0.5)' : 'none',
        boxShadow: isWinning ? '0 0 20px #39FF6A66 inset' : 'none',
        fontFamily: 'Sora',
      }}
    >
      {isWinning && <motion.div initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} className="absolute inset-y-0 w-1/3" style={{ background: 'linear-gradient(90deg,transparent,#39FF6A44,transparent)' }} />}
      {value && (
        <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300 }} style={{ color, textShadow: `0 0 16px ${color}88` }}>{value}</motion.span>
      )}
    </motion.button>
  )
}