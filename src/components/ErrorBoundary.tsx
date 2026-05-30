import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

export default class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0B0E0C' }}>
          <div className="text-center max-w-xs">
            <AlertTriangle size={40} style={{ color: '#FF5C00' }} className="mx-auto mb-3" />
            <p className="font-display font-bold text-lg mb-1" style={{ color: '#EAF7E4', fontFamily: 'Sora' }}>Cabinet glitched out</p>
            <p className="text-sm mb-4" style={{ color: '#6F8A72', fontFamily: 'DM Sans' }}>The arcade hit a snag. Reload to drop back in.</p>
            <button onClick={() => location.reload()} className="h-11 px-5 rounded-lg font-display font-bold text-sm" style={{ background: '#39FF6A', color: '#0B0E0C' }}>Restart</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}