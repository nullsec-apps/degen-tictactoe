import { Badge } from '@/components/ui/badge'
import { RECENT } from '../lib/sampleData'

export default function DuelTicker() {
  const items = [...RECENT, ...RECENT]
  return (
    <div className="mb-3">
      <div className="relative overflow-hidden rounded-lg bevel" style={{ background: '#0a0f0b', border: '1px solid #ffffff0a' }}>
        <div className="flex gap-6 py-2 whitespace-nowrap animate-[ticker_24s_linear_infinite]" style={{ animationName: 'ticker' }}>
          {items.map((r, i) => (
            <span key={i} className="text-[11px] inline-flex items-center gap-1.5">
              {r.tie ? (
                <><span style={{ color: '#6F8A72' }}>{r.a} vs {r.b}</span><span style={{ color: '#6F8A72' }}>· tie → refunded</span></>
              ) : (
                <><span className="font-display font-bold" style={{ color: '#39FF6A', fontFamily: 'Sora' }}>{r.winner}</span><span style={{ color: '#6F8A72' }}>won</span><span className="font-bold" style={{ color: '#39FF6A' }}>${r.amount.toFixed(2)}</span><span style={{ color: '#6F8A72' }}>vs {r.loser}</span></>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <Badge className="bg-transparent border text-[10px]" style={{ borderColor: '#ffffff14', color: '#6F8A72' }}>&lt;$5: 0.1% fee · $5–$10: 0.01% fee</Badge>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}