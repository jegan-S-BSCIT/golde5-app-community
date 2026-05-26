import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

export default function ProcessingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}
  const [progress, setProgress] = useState(0)

  const { 
    holdings, 
    cart, 
    prices, 
    updateDocData, 
    addTransaction, 
    addNotification, 
    clearCart, 
    getProductPrice 
  } = useAppStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 12 + 5
        if (next >= 100) {
          clearInterval(interval)

          const grandTotal = state.grandTotal || 1937
          const method = state.method || 'wallet'
          const isCartCheckout = state.isCartCheckout !== false

          // Update holdings in AppStore
          const currentHoldings = { ...holdings }

          // 1. Deduct wallet cash balance if paid via wallet
          if (method === 'wallet') {
            currentHoldings.cashBalance = Math.round((currentHoldings.cashBalance - grandTotal) * 100) / 100
          }

          // 2. If it's a cart checkout, check if digital assets need to be added to holdings
          if (isCartCheckout) {
            cart.forEach(item => {
              if (item.id === 1) { // Digital Gold
                currentHoldings.goldGrams = Math.round((currentHoldings.goldGrams + item.qty) * 10000) / 10000
                currentHoldings.totalInvested += getProductPrice(item) * item.qty
              } else if (item.id === 6) { // Digital Silver
                currentHoldings.silverGrams = Math.round((currentHoldings.silverGrams + item.qty) * 100) / 100
                currentHoldings.totalInvested += getProductPrice(item) * item.qty
              }
            })
            
            // Sync updated holdings doc
            updateDocData({ holdings: currentHoldings })

            // Add Order transaction
            addTransaction({
              type: 'buy',
              title: 'Order Placed',
              detail: `Bought ${state.totalCoins || cart.length} item(s) (${state.totalQtyGrams || 0.1}g)`,
              amount: -grandTotal
            })

            // Add Order notification
            addNotification({
              title: 'Order Confirmed ✅',
              body: `Payment of ₹${grandTotal.toLocaleString('en-IN')} processed via ${method === 'wallet' ? 'GOLDe5 Wallet' : method === 'upi' ? 'UPI' : method === 'card' ? 'Debit/Credit Card' : 'Net Banking'}`,
              icon: '🛒'
            })

            // Clear Cart
            clearCart()
          } else {
            // Direct buyGold logic (fallback)
            const grams = grandTotal / prices.gold24k
            currentHoldings.goldGrams = Math.round((currentHoldings.goldGrams + grams) * 10000) / 10000
            currentHoldings.totalInvested += grandTotal
            updateDocData({ holdings: currentHoldings })

            addTransaction({
              type: 'buy',
              title: 'Buy Gold',
              detail: `${grams.toFixed(4)}g @ ₹${prices.gold24k.toLocaleString('en-IN')}/g`,
              amount: -grandTotal
            })

            addNotification({
              title: 'Gold Purchased ✅',
              body: `${grams.toFixed(4)}g gold added to portfolio`,
              icon: '🪙'
            })
          }

          setTimeout(() => navigate('/success'), 600)
          return 100
        }
        return next
      })
    }, 400)
    return () => clearInterval(interval)
  }, [navigate, state, holdings, cart, prices, updateDocData, addTransaction, addNotification, clearCart, getProductPrice])

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="z-10 w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 rounded-3xl flex flex-col items-center text-center"
        >
          <h2 className="text-lg font-bold gold-gradient-text mb-8">GOLDe5</h2>

          {/* Spinner */}
          <div className="relative w-28 h-28 mb-8">
            {/* Pulse rings */}
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-primary/10" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-3 rounded-full bg-primary/15" />
            {/* Spinning ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-border-default border-t-primary" />
            {/* Center icon */}
            <div className="absolute inset-6 rounded-full bg-bg-card flex items-center justify-center shadow-lg border border-border-default">
              <span className="text-3xl">🔒</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-text-primary mb-2">Processing Secure Transaction</h3>
          <p className="text-xs text-text-muted mb-6 leading-relaxed px-4">
            Securing your investment on the blockchain. Please do not close the app.
          </p>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-bg-surface rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-gold-bright to-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-1.5 bg-bg-surface px-4 py-1.5 rounded-full">
            <span className="text-[10px]">🛡️</span>
            <span className="text-[10px] font-bold text-primary tracking-wide">256-BIT ENCRYPTION</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
