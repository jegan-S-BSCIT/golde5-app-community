import { create } from 'zustand'
import { startPriceEngine, getPrices, getChange, getGoldHistory, getSilverHistory, getPortfolioHistory } from '../services/priceEngine'
import { db, auth, hasFirebaseConfig } from '../services/firebase'
import { onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { sendGoldPurchaseEmail, sendSipCreationEmail, sendWelcomeEmail } from '../services/emailService'

// ── Referral code generator ─────────────────────────────────────────────────
const genCode = (name) => `G5-${name?.replace(/\s/g,'')?.toUpperCase()?.slice(0,4) || 'USER'}-${Math.random().toString(36).slice(2,6).toUpperCase()}`

let dbListeners = []

const clearListeners = () => {
  dbListeners.forEach(unsubscribe => { if (typeof unsubscribe === 'function') unsubscribe() })
  dbListeners = []
}

export const useAppStore = create((set, get) => ({

  // ── Auth ────────────────────────────────────────────────────────────────
  isAuthenticated: false,
  user: null,
  confirmationResult: null,

  setConfirmationResult: (res) => set({ confirmationResult: res }),

  initAuthListener: () => {
    // When Firebase auth state changes, sync the user and data
    auth.onAuthStateChanged?.((firebaseUser) => {
      if (firebaseUser) {
        get().login(firebaseUser)
      } else {
        set({ isAuthenticated: false, user: null })
        clearListeners()
      }
    })
  },

  login: async (firebaseUser) => {
    const uid = firebaseUser?.uid || 'user_1'
    set({ isAuthenticated: true })
    
    // Subscribe to User Document
    const subscribeToData = () => {
      if (!hasFirebaseConfig) {
        // Mock fallback sync
        const unsubscribe = db._subscribe('users', (data) => {
          if (!data[uid]) {
             // Create initial user doc
             data[uid] = {
               uid, name: 'Rahul Sharma', phone: firebaseUser?.phoneNumber || '+91 98765 43210',
               kycStatus: 'verified', referralCode: genCode('Rahul Sharma'), referralCount: 3, referralEarnings: 0.3,
               holdings: { goldGrams: 8.42, silverGrams: 1540.0, cashBalance: 3200.00, totalInvested: 125000.00 },
               transactions: [
                 { id: 1, type: 'buy', title: 'Buy Gold', date: 'May 05, 2025', detail: '2.5g @ ₹9,200/g', amount: -23000, status: 'Completed' },
               ],
               activeSIPs: [
                 { id: 1, name: 'Gold Monthly SIP', amount: 2500, frequency: 'Monthly', metalType: 'Gold', startDate: 'May 10, 2026', nextDate: 'Jun 10', status: 'active' },
                 { id: 2, name: 'Silver Weekly SIP', amount: 500, frequency: 'Weekly', metalType: 'Silver', startDate: 'May 01, 2026', nextDate: 'May 24', status: 'active' }
               ],
               goals: [],
               cart: [],
               notifications: [
                 { id: 1, title: 'Gold Price Drops by 0.5%!', body: 'Gold prices are down today. Start a quick purchase or top up your active SIP before they rebound.', time: '2 hours ago', read: false, icon: '📈' },
                 { id: 2, title: 'SIP Installment Success', body: 'Your weekly SIP installment of ₹500 has been debited. 0.058 gm Gold credited to your vault.', time: 'Yesterday', read: false, icon: '🔄' },
                 { id: 3, title: 'Security Login Attempt', body: 'A login request was made on your GOLDe5 account from Chrome on Windows at 10:14 AM.', time: '2 days ago', read: true, icon: '🔐' }
               ]
             }
          }
          const userDoc = data[uid]
          set({
            user: { uid, name: userDoc.name, phone: userDoc.phone, kycStatus: userDoc.kycStatus, referralCode: userDoc.referralCode, referralCount: userDoc.referralCount },
            holdings: userDoc.holdings,
            transactions: userDoc.transactions,
            activeSIPs: userDoc.activeSIPs,
            goals: userDoc.goals,
            cart: userDoc.cart,
            notifications: userDoc.notifications
          })
        })
        dbListeners.push(unsubscribe)
      } else {
        // Real Firestore sync
        const unsubUser = onSnapshot(doc(db, 'users', uid), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data()
            set({
              user: { uid, name: data.name, phone: data.phone, kycStatus: data.kycStatus, referralCode: data.referralCode },
              holdings: data.holdings || { goldGrams: 0, silverGrams: 0, cashBalance: 0, totalInvested: 0 },
              transactions: data.transactions || [],
              activeSIPs: data.activeSIPs || [],
              goals: data.goals || [],
              cart: data.cart || [],
              notifications: data.notifications || []
            })
          } else {
            // Setup new user
            const initialData = {
              uid, name: 'New User', phone: firebaseUser.phoneNumber, kycStatus: 'pending', referralCode: genCode('User'),
              holdings: { goldGrams: 0, silverGrams: 0, cashBalance: 0, totalInvested: 0 },
              transactions: [], activeSIPs: [], goals: [], cart: [], notifications: []
            }
            setDoc(doc(db, 'users', uid), initialData)
            sendWelcomeEmail(firebaseUser.email || 'info@golde5.com', 'New User')
          }
        })
        dbListeners.push(unsubUser)
      }
    }
    
    subscribeToData()
    get().addNotification({ title: 'Welcome back! 👋', body: `Logged in securely`, icon: '🔐' })
  },

  logout: async () => {
    const { logoutUser } = await import('../services/authService')
    await logoutUser()
    set({ isAuthenticated: false, user: null, confirmationResult: null })
    clearListeners()
  },

  updateDocData: async (updates) => {
    const { user } = get()
    if (!user) return
    if (!hasFirebaseConfig) {
      db._mockState.users[user.uid] = { ...db._mockState.users[user.uid], ...updates }
      db._notify('users', db._mockState.users)
    } else {
      await updateDoc(doc(db, 'users', user.uid), updates)
    }
  },

  updateUser: (updates) => {
    get().updateDocData({ ...updates })
  },

  // ── Live Prices ─────────────────────────────────────────────────────────
  prices: getPrices(),
  priceLoading: true,
  goldHistory: [],
  silverHistory: [],
  portfolioHistory: [],
  priceChartRange: '1D',

  initPriceEngine: () => {
    const stop = startPriceEngine((prices) => {
      const state = get()
      if (!state.holdings) return
      const goldValue    = state.holdings.goldGrams * prices.gold24k
      const silverValue  = state.holdings.silverGrams * prices.silver
      const totalValue   = goldValue + silverValue + state.holdings.cashBalance
      set({
        prices,
        priceLoading: false,
        goldHistory:  getGoldHistory(),
        silverHistory: getSilverHistory(),
        portfolio: {
          ...state.portfolio,
          totalValue:  Math.round(totalValue * 100) / 100,
          goldValue:   Math.round(goldValue * 100) / 100,
          silverValue: Math.round(silverValue * 100) / 100,
          todayChange: getChange(prices.gold24k, prices.gold24kOpen),
        },
      })
    }, 3000)
    set({ portfolioHistory: getPortfolioHistory() })
    return stop
  },

  getGoldChange:   () => { const p = get().prices; return getChange(p.gold24k, p.gold24kOpen) },
  getSilverChange: () => { const p = get().prices; return getChange(p.silver, p.silverOpen) },
  setPriceChartRange: (range) => set({ priceChartRange: range }),

  // ── Holdings ────────────────────────────────────────────────────────────
  holdings: { goldGrams: 0, silverGrams: 0, cashBalance: 0, totalInvested: 0 },
  portfolio: { totalValue: 0, goldValue: 0, silverValue: 0, todayChange: { change: 0, pct: 0, direction: 'up' } },

  buyGold: (amount) => {
    const { prices, holdings } = get()
    const grams   = amount / prices.gold24k
    const updated = {
      ...holdings,
      goldGrams:     Math.round((holdings.goldGrams + grams) * 10000) / 10000,
      cashBalance:   Math.round((holdings.cashBalance - amount) * 100) / 100,
      totalInvested: holdings.totalInvested + amount,
    }
    get().updateDocData({ holdings: updated })
    const tx = { id: Date.now(), type: 'buy', title: 'Buy Gold', detail: `${grams.toFixed(4)}g @ ₹${prices.gold24k.toLocaleString('en-IN')}/g`, amount: -amount, date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) }
    get().addTransaction(tx)
    get().addNotification({ title: 'Gold Purchased ✅', body: `${grams.toFixed(4)}g gold added to portfolio`, icon: '🪙' })
    get().updateGoalProgress(amount)
    sendGoldPurchaseEmail(get().user?.email || 'info@golde5.com', get().user?.name, tx)
  },

  buySilver: (amount) => {
    const { prices, holdings } = get()
    const grams   = amount / prices.silver
    const updated = {
      ...holdings,
      silverGrams:   Math.round((holdings.silverGrams + grams) * 100) / 100,
      cashBalance:   Math.round((holdings.cashBalance - amount) * 100) / 100,
      totalInvested: holdings.totalInvested + amount,
    }
    get().updateDocData({ holdings: updated })
    get().addTransaction({ type: 'buy', title: 'Buy Silver', detail: `${grams.toFixed(2)}g @ ₹${prices.silver.toLocaleString('en-IN')}/g`, amount: -amount })
  },

  sellGold: (grams) => {
    const { prices, holdings } = get()
    const amount  = Math.round(grams * prices.gold24k * 0.997 * 100) / 100
    const updated = {
      ...holdings,
      goldGrams:   Math.round((holdings.goldGrams - grams) * 10000) / 10000,
      cashBalance: Math.round((holdings.cashBalance + amount) * 100) / 100,
    }
    get().updateDocData({ holdings: updated })
    get().addTransaction({ type: 'sell', title: 'Sell Gold', detail: `${grams}g @ ₹${prices.gold24k.toLocaleString('en-IN')}/g`, amount })
    get().addNotification({ title: 'Gold Sold 💰', body: `₹${amount.toLocaleString('en-IN')} credited to wallet`, icon: '💸' })
  },

  addFunds: (amount) => {
    const h = { ...get().holdings, cashBalance: get().holdings.cashBalance + amount }
    get().updateDocData({ holdings: h })
    get().addTransaction({ type: 'deposit', title: 'Wallet Top-up', detail: 'Bank Transfer / UPI', amount })
    get().addNotification({ title: 'Funds Added 💳', body: `₹${amount.toLocaleString('en-IN')} added to wallet`, icon: '🏦' })
  },

  withdraw: (amount) => {
    const h = { ...get().holdings, cashBalance: get().holdings.cashBalance - amount }
    get().updateDocData({ holdings: h })
    get().addTransaction({ type: 'withdraw', title: 'Withdrawal', detail: 'Bank Transfer (1-2 days)', amount: -amount })
    get().addNotification({ title: 'Withdrawal Initiated 🏧', body: `₹${amount.toLocaleString('en-IN')} will be credited in 1-2 days`, icon: '🏧' })
  },

  // ── Transactions ─────────────────────────────────────────────────────────
  transactions: [],

  addTransaction: (tx) => {
    const transaction = {
      id: Date.now(), ...tx,
      date:   new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Completed',
    }
    const transactions = [transaction, ...get().transactions].slice(0, 100)
    get().updateDocData({ transactions })
  },

  // ── Active SIPs ──────────────────────────────────────────────────────────
  activeSIPs: [],

  createSIP: (sip) => {
    const newSip = {
      id: Date.now(), ...sip,
      startDate:         new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalInvested: 0, gramsAccumulated: 0, returns: 0, status: 'active',
      nextDate: new Date(Date.now() + (sip.frequency === 'Daily' ? 86400000 : sip.frequency === 'Weekly' ? 604800000 : 2592000000))
        .toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    }
    const sips = [...get().activeSIPs, newSip]
    get().updateDocData({ activeSIPs: sips })
    get().addNotification({ title: 'SIP Created ✅', body: `${newSip.name} — ₹${sip.amount.toLocaleString('en-IN')} ${sip.frequency}`, icon: '🔄' })
    sendSipCreationEmail(get().user?.email || 'info@golde5.com', get().user?.name, newSip)
    return newSip
  },

  pauseSIP: (id) => {
    const sips = get().activeSIPs.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s)
    get().updateDocData({ activeSIPs: sips })
  },

  deleteSIP: (id) => {
    const sips = get().activeSIPs.filter(s => s.id !== id)
    get().updateDocData({ activeSIPs: sips })
  },

  // ── Goals ────────────────────────────────────────────────────────────────
  goals: [],

  addGoal: (goal) => {
    const newGoal = { id: Date.now(), saved: 0, ...goal, color: goal.color || '#D4AF37' }
    const goals = [...get().goals, newGoal]
    get().updateDocData({ goals })
    toast.success(`Goal "${goal.name}" created!`)
  },

  deleteGoal: (id) => {
    const goals = get().goals.filter(g => g.id !== id)
    get().updateDocData({ goals })
  },

  updateGoalProgress: (amount) => {
    const goals = get().goals.map(g => ({ ...g, saved: Math.min(g.target, g.saved + amount * 0.1) }))
    get().updateDocData({ goals })
  },

  // ── Cart & Shop ──────────────────────────────────────────────────────────
  cart: [],
  products: [
    { id: 1, name: 'Digital Gold',    desc: '24K 999.9 Pure Gold',  priceMultiplier: 1,     unit: 'per gram',  category: 'gold',   badge: 'Best Seller', img: '🪙', stock: 999 },
    { id: 2, name: 'Gold Coin 1g',    desc: 'BIS Hallmarked',        priceMultiplier: 1.035, unit: 'each',      category: 'gold',   badge: 'Popular',     img: '🥇', stock: 48 },
    { id: 3, name: 'Gold Coin 5g',    desc: 'BIS Hallmarked',        priceMultiplier: 5.1,   unit: 'each',      category: 'gold',   badge: null,          img: '🥇', stock: 23 },
    { id: 4, name: 'Gold Coin 10g',   desc: 'BIS Hallmarked',        priceMultiplier: 10.15, unit: 'each',      category: 'gold',   badge: 'Premium',     img: '🏅', stock: 12 },
    { id: 5, name: 'Gold Bar 10g',    desc: '24K 999.9 Pure Gold',   priceMultiplier: 10.2,  unit: 'each',      category: 'gold',   badge: 'Exclusive',   img: '🧱', stock: 5  },
    { id: 6, name: 'Digital Silver',  desc: '999 Fine Silver',       priceMultiplier: 1,     unit: 'per gram',  category: 'silver', badge: null,          img: '🪩', stock: 999 },
    { id: 7, name: 'Silver Coin 10g', desc: '999 Fine Silver',       priceMultiplier: 11.9,  unit: 'each',      category: 'silver', badge: 'New',         img: '🪩', stock: 67 },
    { id: 8, name: 'Silver Bar 100g', desc: '999 Fine Silver',       priceMultiplier: 106,   unit: 'each',      category: 'silver', badge: null,          img: '🧱', stock: 15 },
  ],

  getProductPrice: (product) => {
    const p    = get().prices
    const base = product.category === 'gold' ? p.gold24k : p.silver
    return Math.round(base * product.priceMultiplier * 100) / 100
  },

  addToCart: (product) => {
    const cart     = get().cart
    const existing = cart.find(i => i.id === product.id)
    const updated  = existing
      ? cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...product, qty: 1 }]
    get().updateDocData({ cart: updated })
  },

  removeFromCart: (id) => {
    const updated = get().cart.filter(i => i.id !== id)
    get().updateDocData({ cart: updated })
  },

  updateCartQty: (id, qty) => {
    const updated = qty <= 0
      ? get().cart.filter(i => i.id !== id)
      : get().cart.map(i => i.id === id ? { ...i, qty } : i)
    get().updateDocData({ cart: updated })
  },

  clearCart: () => { get().updateDocData({ cart: [] }) },

  getCartTotal: () => {
    const state = get()
    return state.cart.reduce((sum, item) => sum + state.getProductPrice(item) * item.qty, 0)
  },

  // ── Notifications ────────────────────────────────────────────────────────
  notifications: [],

  addNotification: (n) => {
    const notif  = { id: Date.now(), time: 'Just now', read: false, ...n }
    const notifs = [notif, ...get().notifications].slice(0, 50)
    get().updateDocData({ notifications: notifs })
  },

  markNotificationRead:  (id) => {
    const notifs = get().notifications.map(n => n.id === id ? { ...n, read: true } : n)
    get().updateDocData({ notifications: notifs })
  },

  markAllRead: () => {
    const notifs = get().notifications.map(n => ({ ...n, read: true }))
    get().updateDocData({ notifications: notifs })
  },

  clearNotifications: () => { get().updateDocData({ notifications: [] }) },

  // ── Referrals ────────────────────────────────────────────────────────────
  referrals: [
    { id: 1, name: 'Priya S.',     date: 'Mar 12, 2025', status: 'completed', bonus: 0.1 },
    { id: 2, name: 'Karan M.',     date: 'Apr 02, 2025', status: 'completed', bonus: 0.1 },
    { id: 3, name: 'Anita R.',     date: 'Apr 28, 2025', status: 'pending',   bonus: 0.1 },
  ],

  addReferral: (name) => {
    const ref  = { id: Date.now(), name, date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }), status: 'pending', bonus: 0.1 }
    const refs = [...get().referrals, ref]
    set({ referrals: refs })
  },

  // ── UI State ────────────────────────────────────────────────────────────
  showWithdrawModal: false,
  showAddFundsModal: false,
  showBuyModal:      false,
  showSellModal:     false,

  setModal: (key, val) => set({ [key]: val }),

}))
