import { useCallback } from 'react'

let ctx: AudioContext | null = null
function getCtx() { if (!ctx) { try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)() } catch { return null } } return ctx }

function tone(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.06) {
  const c = getCtx(); if (!c) return
  const o = c.createOscillator(); const g = c.createGain()
  o.type = type; o.frequency.value = freq
  g.gain.value = vol
  o.connect(g); g.connect(c.destination)
  o.start(); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
  o.stop(c.currentTime + dur)
}

export function useArcadeSound() {
  const blip = useCallback(() => tone(660, 0.08, 'square'), [])
  const coin = useCallback(() => { tone(880, 0.08, 'square'); setTimeout(() => tone(1320, 0.12, 'square'), 70) }, [])
  const victory = useCallback(() => { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.18, 'square'), i * 110)) }, [])
  const haptic = useCallback(() => { try { navigator.vibrate?.(20) } catch {} tone(440, 0.05, 'triangle') }, [])
  return { blip, coin, victory, haptic }
}