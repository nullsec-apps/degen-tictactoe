import { useState, useEffect, useCallback } from 'react'

type Theme = 'oldschool' | 'degen'
const KEY = 'pot-arcade-theme'

export function useArcadeTheme() {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem(KEY) as Theme) || 'degen')
  useEffect(() => { localStorage.setItem(KEY, theme) }, [theme])
  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  return { theme, setTheme }
}