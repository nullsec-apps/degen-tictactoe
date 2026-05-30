import { Tv, Flame } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useArcadeTheme } from '../hooks/useArcadeTheme'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useArcadeTheme()
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-1 rounded-lg bevel" style={{ background: '#16201A', border: '1px solid #ffffff0d' }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => setTheme('oldschool')} className="h-7 px-2 rounded text-xs font-display font-bold flex items-center gap-1 transition-all duration-200" style={{ background: theme === 'oldschool' ? '#39FF6A' : 'transparent', color: theme === 'oldschool' ? '#0B0E0C' : '#6F8A72', fontFamily: 'Sora' }}><Tv size={13} /> OG</button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">Old School — muted CRT green</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => setTheme('degen')} className="h-7 px-2 rounded text-xs font-display font-bold flex items-center gap-1 transition-all duration-200" style={{ background: theme === 'degen' ? '#FF5C00' : 'transparent', color: theme === 'degen' ? '#0B0E0C' : '#6F8A72', fontFamily: 'Sora' }}><Flame size={13} /> DEGEN</button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">Degen — full neon overdrive</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}