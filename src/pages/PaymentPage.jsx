import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'

const paymentMethods = [
  { id: 'upi',        label: 'UPI',           sub: 'Pay via any UPI app',          icon: '📱' },
  { id: 'netbanking', label: 'Net Banking',    sub: 'HDFC, SBI, ICICI, Axis...',    icon: '🏦' },
  { id: 'card',       label: 'Debit/Credit Card', sub: 'Visa, Mastercard, RuPay', icon: '💳' },
  { id: 'wallet',     label: 'GOLDe5 Wallet',  sub: 'Instant · No charges',        icon: '💰' },
]

export default function PaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}
  const { getCartTotal, holdings, cart } = useAppStore()
  
  const total = state.basePrice !== undefined ? state.basePrice : getCartTotal()
  const gst = state.gst !== undefined ? state.gst : Math.round(total * 0.03 * 100) / 100
  const makingCharges = state.makingCharges !== undefined ? state.makingCharges : 0
  const insurance = state.insurance !== undefined ? state.insurance : 0
  const grandTotal = state.amount !== undefined ? state.amount : Math.round((total + gst + makingCharges + insurance) * 100) / 100

  const [method, setMethod]   = useState('wallet')
  const [upiId, setUpiId]     = useState('')
  const [processing, setProcessing] = useState(false)

  const handlePay = () => {
    if (method === 'upi' && !upiId.includes('@')) {
      toast.error('Enter a valid UPI ID (e.g. name@upi)')
      return
    }
    if (method === 'wallet' && holdings.cashBalance < grandTotal) {
      toast.error('Insufficient wallet balance')
      return
    }
    setProcessing(true)
    navigate('/processing', {
      state: {
        grandTotal,
        gst,
        makingCharges,
        insurance,
        method,
        totalCoins: state.totalCoins || cart.reduce((sum, item) => sum + item.qty, 0),
        totalQtyGrams: state.totalQtyGrams || 0.1,
        isCartCheckout: state.isCartCheckout !== undefined ? state.isCartCheckout : true,
        upiId: method === 'upi' ? upiId : null
      }
    })
  }

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-text-primary">Payment</h1>
        <p className="text-xs text-text-muted mt-0.5">Secure · Encrypted · RBI Compliant</p>
      </motion.div>

      {/* Order Summary Banner */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="p-4 rounded-xl bg-bg-card border border-border-default flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
          <p className="text-lg font-extrabold text-primary">₹{grandTotal.toLocaleString('en-IN')}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-muted">Incl. GST ₹{gst.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 mt-1">
            <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span className="text-[10px] text-success font-semibold">AES-256 Secured</span>
          </div>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Payment Method</p>
        {paymentMethods.map((m, i) => (
          <motion.button key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
            onClick={() => setMethod(m.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${method === m.id ? 'border-primary bg-primary/5' : 'border-border-default bg-bg-card hover:border-border-hover'}`}>
            <span className="text-2xl">{m.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-text-primary">{m.label}</p>
              <p className="text-[10px] text-text-muted">{m.sub}</p>
              {m.id === 'wallet' && (
                <p className={`text-[10px] font-bold mt-0.5 ${holdings.cashBalance >= grandTotal ? 'text-success' : 'text-error'}`}>
                  Balance: ₹{holdings.cashBalance.toLocaleString('en-IN')} {holdings.cashBalance < grandTotal ? '(insufficient)' : '✓'}
                </p>
              )}
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${method === m.id ? 'border-primary' : 'border-border-default'}`}>
              {method === m.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* UPI Input */}
      {method === 'upi' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1.5">UPI ID</label>
          <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi"
            className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary transition-all" />
        </motion.div>
      )}

      {/* Security badges */}
      <div className="flex gap-2">
        {[['🔒','Secure Payment'],['✅','RBI Licensed'],['🛡️','Insured Delivery']].map(([icon, label]) => (
          <div key={label} className="flex-1 p-2 rounded-xl bg-bg-card border border-border-default text-center">
            <span className="text-lg block">{icon}</span>
            <span className="text-[8px] text-text-muted font-semibold leading-tight block mt-1">{label}</span>
          </div>
        ))}
      </div>

      <button onClick={handlePay} disabled={processing}
        className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-bg-primary font-extrabold text-base transition-all shadow-lg shadow-primary/25 active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-2">
        {processing ? (
          <><span className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" /> Processing…</>
        ) : (
          <>Pay ₹{grandTotal.toLocaleString('en-IN')} →</>
        )}
      </button>
    </div>
  )
}
