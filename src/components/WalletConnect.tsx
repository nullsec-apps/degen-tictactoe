import { useState } from 'react'
import { Wallet, Copy, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { truncate } from '../lib/format'

export default function WalletConnect() {
  const [addr, setAddr] = useState<string | null>(null)
  const [bal, setBal] = useState(0)

  const connect = () => {
    const a = '0x' + Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
    setAddr(a)
    setBal(Math.round((20 + Math.random() * 180) * 100) / 100)
    toast.success('Wallet connected on Base')
  }

  if (!addr) {
    return (
      <Button onClick={connect} className="h-9 px-3 text-xs font-display font-bold bevel transition-all duration-200 hover:brightness-125" style={{ background: '#16201A', color: '#39FF6A', border: '1px solid #39FF6A44', fontFamily: 'Sora' }}>
        <Wallet size={14} className="mr-1.5" /> Connect
      </Button>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-9 px-2.5 text-xs font-mono bevel transition-all duration-200 hover:brightness-110" style={{ background: '#16201A', color: '#EAF7E4', border: '1px solid #ffffff14' }}>
          <span className="w-2 h-2 rounded-full mr-2" style={{ background: '#39FF6A', boxShadow: '0 0 6px #39FF6A' }} />
          {truncate(addr)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border" style={{ background: '#16201A', borderColor: '#ffffff14', color: '#EAF7E4' }}>
        <div className="px-2 py-2">
          <p className="text-[10px]" style={{ color: '#6F8A72' }}>USDC Balance</p>
          <p className="font-display font-bold text-lg" style={{ color: '#39FF6A', fontFamily: 'Sora' }}>${bal.toFixed(2)}</p>
        </div>
        <DropdownMenuItem onClick={() => { navigator.clipboard?.writeText(addr); toast.success('Address copied') }} className="text-xs cursor-pointer"><Copy size={13} className="mr-2" /> Copy address</DropdownMenuItem>
        <DropdownMenuItem onClick={() => { setAddr(null); toast('Disconnected') }} className="text-xs cursor-pointer"><LogOut size={13} className="mr-2" /> Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}