export function computeFee(stake: number) {
  const gross = stake * 2
  const rate = stake <= 5 ? 0.001 : 0.0001
  const fee = gross * rate
  return { gross, fee, net: gross - fee, rate }
}