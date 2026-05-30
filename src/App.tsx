import { useState, useCallback } from 'react'
import { Toaster } from 'sonner'
import { AnimatePresence } from 'framer-motion'
import ArcadeCabinet from './components/ArcadeCabinet'
import HeroIntro from './components/HeroIntro'
import WalletConnect from './components/WalletConnect'
import StakeDial from './components/StakeDial'
import PotMeter from './components/PotMeter'
import RakeReceipt from './components/RakeReceipt'
import GameBoard from './components/GameBoard'
import DuelHeader from './components/DuelHeader'
import WaitingRoom from './components/WaitingRoom'
import DuelTicker from './components/DuelTicker'
import MatchResultModal from './components/MatchResultModal'
import ThemeSwitcher from './components/ThemeSwitcher'
import BetLockPanel from './components/BetLockPanel'
import ErrorBoundary from './components/ErrorBoundary'
import { useTicTacToe } from './hooks/useTicTacToe'
import { computeFee } from './lib/computeFee'
import { useArcadeSound } from './hooks/useArcadeSound'

export type Phase = 'intro' | 'stake' | 'matching' | 'playing' | 'result'
export type ResultKind = 'win' | 'lose' | 'tie'

export default function App() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [stake, setStake] = useState(1)
  const [result, setResult] = useState<ResultKind>('win')
  const sound = useArcadeSound()
  const game = useTicTacToe()

  const handleLockStake = useCallback((s: number) => {
    setStake(s)
    setPhase('matching')
    sound.coin()
  }, [sound])

  const handleMatched = useCallback(() => {
    game.reset()
    setPhase('playing')
  }, [game])

  const handleResult = useCallback((kind: ResultKind) => {
    setResult(kind)
    setPhase('result')
    if (kind === 'win') sound.victory()
  }, [sound])

  const handleClose = useCallback(() => {
    setPhase('intro')
    game.reset()
  }, [game])

  const fee = computeFee(stake)

  return (
    <ErrorBoundary>
      <ArcadeCabinet>
        <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: '#16201A', color: '#EAF7E4', border: '1px solid #39FF6A33', fontFamily: 'DM Sans' } }} />
        <div className="flex items-center justify-between gap-2 mb-3">
          <ThemeSwitcher />
          <WalletConnect />
        </div>
        <DuelTicker />

        <AnimatePresence mode="wait">
          {phase === 'intro' && <HeroIntro key="intro" onStart={() => setPhase('stake')} />}
          {phase === 'stake' && <StakeDial key="stake" stake={stake} setStake={setStake} onLock={handleLockStake} />}
          {phase === 'matching' && <BetLockPanel key="lock" stake={stake} onMatched={handleMatched} onCancel={() => setPhase('stake')} />}
        </AnimatePresence>

        {(phase === 'matching' || phase === 'intro') && <WaitingRoom stake={phase === 'matching' ? stake : undefined} onQuickJoin={(s) => { setStake(s); setPhase('matching') }} />}

        {(phase === 'playing' || phase === 'result') && (
          <>
            <PotMeter stake={stake} fee={fee} locked={phase === 'playing' || phase === 'result'} winner={phase === 'result' ? result : null} />
            <DuelHeader game={game} stake={stake} />
            <GameBoard game={game} stake={stake} onResult={handleResult} />
            {phase === 'result' && result !== 'tie' && <RakeReceipt fee={fee} />}
          </>
        )}

        {phase === 'result' && (
          <MatchResultModal
            result={result}
            stake={stake}
            fee={fee}
            onRematch={() => { game.reset(); setPhase('playing') }}
            onNewStake={() => { handleClose(); setPhase('stake') }}
            onClose={handleClose}
          />
        )}
      </ArcadeCabinet>
    </ErrorBoundary>
  )
}