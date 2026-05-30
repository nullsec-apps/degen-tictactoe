export function usd(n: number) { return '$' + n.toFixed(2) }
export function truncate(a: string) { return a.slice(0, 6) + '...' + a.slice(-4) }
export function stakeLabel(n: number) { return n <= 5 ? 'Low roller' : 'High roller' }