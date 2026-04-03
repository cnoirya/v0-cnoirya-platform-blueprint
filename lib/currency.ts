export function formatUSDT(amount: number, decimals = 2) {
  const n = Number(amount) || 0
  return `USDT ${n.toFixed(decimals)}`
}