/**
 * Real-time Gold & Silver Price Engine
 * Simulates live market data with realistic Indian market prices.
 * In production: replace fetchLivePrices() with GoldAPI/Metals API
 */

// ── Base Prices (INR per gram, realistic 2024-25 values) ──────────────────
const BASE_GOLD_24K = 9380.00   // ₹ per gram
const BASE_GOLD_22K = Math.round(BASE_GOLD_24K * 0.9168)
const BASE_SILVER   = 104.50   // ₹ per gram
const BASE_PLATINUM = 2850.00  // ₹ per gram
const VOLATILITY    = 0.0008   // 0.08% max tick (realistic)

let currentPrices = {
  gold24k:     BASE_GOLD_24K,
  gold22k:     BASE_GOLD_22K,
  silver:      BASE_SILVER,
  platinum:    BASE_PLATINUM,
  gold24kPrev: BASE_GOLD_24K,
  gold22kPrev: BASE_GOLD_22K,
  silverPrev:  BASE_SILVER,
  platinumPrev: BASE_PLATINUM,
  gold24kOpen: BASE_GOLD_24K,
  gold22kOpen: BASE_GOLD_22K,
  silverOpen:  BASE_SILVER,
  platinumOpen: BASE_PLATINUM,
  gold24kHigh: BASE_GOLD_24K,
  gold24kLow:  BASE_GOLD_24K,
  silverHigh:  BASE_SILVER,
  silverLow:   BASE_SILVER,
  lastUpdated: Date.now(),
  marketOpen:  true,
  spread:      0.8, // spread percentage
}

// ── History Generators ─────────────────────────────────────────────────────
function generateHistory(basePrice, points = 96) {
  const data = []
  let price = basePrice * (1 - 0.005) // Start slightly lower
  const now = Date.now()
  const interval = (24 * 60 * 60 * 1000) / points

  for (let i = 0; i < points; i++) {
    const hour = Math.floor(i / (points / 24))
    // Simulate market open surge (9-11 AM) and afternoon dip
    const sessionBias = (hour >= 9 && hour <= 11) ? 0.0002 : (hour >= 14 && hour <= 16) ? -0.0001 : 0
    const change = (Math.random() - 0.49 + sessionBias) * basePrice * 0.0015
    price = Math.max(price + change, basePrice * 0.985)
    price = Math.min(price, basePrice * 1.015)
    const ts = now - (points - i) * interval
    data.push({
      time:      new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      timestamp: ts,
      price:     Math.round(price * 100) / 100,
    })
  }
  data[data.length - 1].price = basePrice
  return data
}

function generateWeeklyHistory(basePrice, days = 30) {
  const data = []
  let price = basePrice * 0.96
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const skip = d.getDay() === 0 || d.getDay() === 6
    if (!skip) {
      const change = (Math.random() - 0.47) * price * 0.008
      price = Math.max(price + change, basePrice * 0.90)
      price = Math.min(price, basePrice * 1.10)
      data.push({
        date:  d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        time:  d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        price: Math.round(price * 100) / 100,
      })
    }
  }
  return data
}

function generateMonthlyHistory(months = 13) {
  const data = []
  let value = 620000  // ₹6.2L starting portfolio
  const now = new Date()
  for (let i = months; i >= 0; i--) {
    const d = new Date(now)
    d.setMonth(d.getMonth() - i)
    const growthFactor = i > 6 ? 0.008 : 0.012
    const growth = (Math.random() * growthFactor + 0.002)
    value *= (1 + growth)
    data.push({
      month: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
      value: Math.round(value),
    })
  }
  return data
}

let goldHistory         = generateHistory(BASE_GOLD_24K)
let silverHistory       = generateHistory(BASE_SILVER, 48)
let goldWeeklyHistory   = generateWeeklyHistory(BASE_GOLD_24K, 30)
let silverWeeklyHistory = generateWeeklyHistory(BASE_SILVER, 30)
let portfolioHistory    = generateMonthlyHistory()

// ── Price Tick ──────────────────────────────────────────────────────────────
function tick() {
  const trend = Math.sin(Date.now() / 600000) * 0.25  // slow intraday drift

  // Update gold
  currentPrices.gold24kPrev = currentPrices.gold24k
  currentPrices.gold22kPrev = currentPrices.gold22k
  const goldNoise = (Math.random() - 0.5 + trend * 0.08) * 2
  currentPrices.gold24k += currentPrices.gold24k * VOLATILITY * goldNoise
  currentPrices.gold24k  = Math.max(currentPrices.gold24k, BASE_GOLD_24K * 0.93)
  currentPrices.gold24k  = Math.min(currentPrices.gold24k, BASE_GOLD_24K * 1.07)
  currentPrices.gold24k  = Math.round(currentPrices.gold24k * 100) / 100
  currentPrices.gold22k  = Math.round(currentPrices.gold24k * 0.9168 * 100) / 100

  // Update high/low
  if (currentPrices.gold24k > currentPrices.gold24kHigh) currentPrices.gold24kHigh = currentPrices.gold24k
  if (currentPrices.gold24k < currentPrices.gold24kLow)  currentPrices.gold24kLow  = currentPrices.gold24k

  // Update silver
  currentPrices.silverPrev = currentPrices.silver
  const silverNoise = (Math.random() - 0.48) * 2
  currentPrices.silver += currentPrices.silver * VOLATILITY * 1.4 * silverNoise
  currentPrices.silver  = Math.max(currentPrices.silver, BASE_SILVER * 0.92)
  currentPrices.silver  = Math.min(currentPrices.silver, BASE_SILVER * 1.08)
  currentPrices.silver  = Math.round(currentPrices.silver * 100) / 100
  if (currentPrices.silver > currentPrices.silverHigh) currentPrices.silverHigh = currentPrices.silver
  if (currentPrices.silver < currentPrices.silverLow)  currentPrices.silverLow  = currentPrices.silver

  // Update platinum
  currentPrices.platinumPrev = currentPrices.platinum
  currentPrices.platinum += currentPrices.platinum * VOLATILITY * 0.6 * (Math.random() - 0.48) * 2
  currentPrices.platinum  = Math.round(currentPrices.platinum * 100) / 100

  currentPrices.lastUpdated = Date.now()

  // Append to intraday history
  const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  goldHistory.push({ time: timeStr, timestamp: Date.now(), price: currentPrices.gold24k })
  if (goldHistory.length > 300) goldHistory.shift()
  silverHistory.push({ time: timeStr, timestamp: Date.now(), price: currentPrices.silver })
  if (silverHistory.length > 200) silverHistory.shift()
}

// ── Public API ──────────────────────────────────────────────────────────────
export function getPrices()          { return { ...currentPrices } }
export function getGoldHistory()     { return [...goldHistory] }
export function getSilverHistory()   { return [...silverHistory] }
export function getPortfolioHistory(){ return [...portfolioHistory] }
export function getWeeklyHistory(metal = 'gold') {
  return metal === 'silver' ? [...silverWeeklyHistory] : [...goldWeeklyHistory]
}

export function getChange(current, open) {
  const change = current - open
  const pct    = (change / open) * 100
  return {
    change:    Math.round(change * 100) / 100,
    pct:       Math.round(pct * 100) / 100,
    direction: change >= 0 ? 'up' : 'down',
  }
}

export function getBuyPrice(metalPrice)  { return Math.round(metalPrice * 1.003 * 100) / 100 }
export function getSellPrice(metalPrice) { return Math.round(metalPrice * 0.997 * 100) / 100 }

// Format helpers
export function formatINR(val, decimals = 0) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(val)
}

// Start/stop engine
let intervalId = null
export function startPriceEngine(onTick, intervalMs = 3000) {
  if (intervalId) clearInterval(intervalId)
  // Initial tick immediately
  tick()
  onTick?.(getPrices())
  intervalId = setInterval(() => {
    tick()
    onTick?.(getPrices())
  }, intervalMs)
  return () => { clearInterval(intervalId); intervalId = null }
}

export function stopPriceEngine() {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
}
