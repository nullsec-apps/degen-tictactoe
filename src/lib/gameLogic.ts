export type Cell = 'X' | 'O' | null
export const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

export function checkWinner(b: Cell[]): { winner: Cell; line: number[] } | null {
  for (const l of LINES) {
    const [a, c, d] = l
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line: l }
  }
  return null
}

export function isDraw(b: Cell[]) { return b.every(Boolean) && !checkWinner(b) }

export function bestMove(b: Cell[], mark: 'X' | 'O', random = false): number {
  const empty = b.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0)
  if (empty.length === 0) return -1
  if (random) return empty[Math.floor(Math.random() * empty.length)]
  const opp = mark === 'X' ? 'O' : 'X'
  for (const i of empty) { const t = [...b]; t[i] = mark; if (checkWinner(t)?.winner === mark) return i }
  for (const i of empty) { const t = [...b]; t[i] = opp; if (checkWinner(t)?.winner === opp) return i }
  if (b[4] === null) return 4
  const corners = [0, 2, 6, 8].filter((i) => b[i] === null)
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)]
  return empty[Math.floor(Math.random() * empty.length)]
}