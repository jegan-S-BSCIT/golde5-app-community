import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'

const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 15 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.3 } 
})

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, getProductPrice, clearCart, addTransaction, addNotification } = useAppStore()
  const [breakdownOpen, setBreakdownOpen] = useState(true)

  const hasItems = cart.length > 0
  
  // Total Coins count
  const totalCoins = hasItems ? cart.reduce((sum, item) => sum + item.qty, 0) : 1
  
  // Total Qty (Grams)
  const totalQtyGrams = hasItems 
    ? cart.reduce((sum, item) => {
        const match = item.name.match(/(\d+\.?\d*)\s*g/)
        const w = match ? parseFloat(match[1]) : 1
        return sum + (w * item.qty)
      }, 0)
    : 0.1

  // Base price calculation
  const basePrice = hasItems 
    ? cart.reduce((sum, item) => {
        const price = item.customPrice || (getProductPrice ? getProductPrice(item) : 15550)
        return sum + (price * item.qty)
      }, 0)
    : 1937.00

  // Bug Fix Calculations: GST (3%), Flat making charges (₹50), Flat insurance fee (₹10)
  const gst = Math.round(basePrice * 0.03 * 100) / 100
  const makingCharges = 50.00
  const insurance = 10.00
  const netAmount = basePrice + gst + makingCharges + insurance

  const handleProceed = () => {
    navigate('/payment', {
      state: {
        amount: netAmount,
        basePrice,
        gst,
        makingCharges,
        insurance,
        totalCoins,
        totalQtyGrams,
        isCartCheckout: true
      }
    })
  }

  return (
    <div className="space-y-6 pb-28 font-sans text-white bg-[#0B0B0B] min-h-screen -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative">
      
      {/* Top Header */}
      <div className="flex items-center mb-6 border-b border-[#FFB800]/10 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/25 flex items-center justify-center text-[#FFB800] active:scale-95 transition-transform"
        >
          ←
        </button>
        <h1 className="flex-1 text-center font-black text-base mr-10 text-white">Your Cart Summary</h1>
      </div>

      {/* Cart Items Details List */}
      <motion.div {...fadeUp(0)} className="bg-[#1A1A1A] border border-[#FFB800]/15 rounded-2xl p-5 mb-4 shadow-lg shadow-black/30">
        <div className="space-y-4 mb-4 pb-4 border-b border-[#FFB800]/10">
          {hasItems ? (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0B0B0B] rounded-xl flex items-center justify-center text-2xl border border-[#FFB800]/10">
                    {item.img || '🥇'}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs text-white">₹{(item.customPrice || item.price).toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Qty: {item.qty}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0B0B0B] rounded-xl flex items-center justify-center text-2xl border border-[#FFB800]/10">🥇</div>
                <div>
                  <h3 className="font-bold text-xs text-white">Augmont 0.1Gm Gold Coin</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">24K 999.9 Purity (Mock Item)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-xs text-white">₹1,937.00</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Qty: 1</p>
              </div>
            </div>
          )}
        </div>

        {/* Quantities Summary Info Boxes */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-[#0B0B0B] p-3 rounded-xl border border-[#FFB800]/10">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Total Qty</p>
            <p className="font-bold text-lg text-[#FFB800]">{totalQtyGrams} gm</p>
          </div>
          <div className="bg-[#0B0B0B] p-3 rounded-xl border border-[#FFB800]/10">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Total Coins</p>
            <p className="font-bold text-lg text-white">{totalCoins}</p>
          </div>
        </div>
      </motion.div>

      {/* Pricing Summary & Breakdown Table */}
      <motion.div {...fadeUp(0.1)} className="bg-[#1A1A1A] border border-[#FFB800]/15 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-white">Price Summary</h3>
          <button 
            onClick={() => setBreakdownOpen(!breakdownOpen)} 
            className="text-[#FFB800] font-bold text-[9px] uppercase tracking-wider bg-[#0B0B0B] px-2.5 py-1 rounded-md border border-[#FFB800]/10"
          >
            {breakdownOpen ? 'Hide' : 'View'} Breakdown
          </button>
        </div>

        <div className="space-y-3 text-xs text-gray-400 pb-4 border-b border-[#FFB800]/10 mb-4">
          <div className="flex justify-between">
            <span className="font-medium">Base Amount</span>
            <span className="text-white font-semibold">₹{basePrice.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
          </div>
          
          <AnimatePresence initial={false}>
            {breakdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-3 border-t border-[#FFB800]/5 overflow-hidden"
              >
                <div className="flex justify-between">
                  <span>GST (3%)</span>
                  <span className="text-white font-semibold">₹{gst.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Making & Delivery Charges</span>
                  <span className="text-white font-semibold">₹{makingCharges.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance Fee</span>
                  <span className="text-white font-semibold">₹{insurance.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-end pt-1">
          <span className="font-black uppercase tracking-wider text-[10px] text-gray-500">Net Amount</span>
          <span className="font-black text-2xl text-[#FFB800]">₹{netAmount.toLocaleString('en-IN', {minimumFractionDigits:2})}</span>
        </div>
      </motion.div>

      {/* Safety Proof Navigation */}
      <motion.div 
        {...fadeUp(0.2)} 
        onClick={() => navigate('/proof')} 
        className="flex items-center gap-3 bg-[#1A1A1A] border border-[#FFB800]/15 p-4.5 rounded-2xl cursor-pointer active:scale-[0.98] transition-all shadow-md"
      >
        <span className="text-2xl">🛡️</span>
        <div className="flex-1">
          <p className="text-xs font-bold text-white">100% Safe & Secure Vaulting</p>
          <p className="text-[9px] text-gray-500 mt-0.5">View our supplier & vaulting certificates</p>
        </div>
        <span className="text-[#FFB800] text-xs font-bold">View →</span>
      </motion.div>

      {/* Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0B0B0B]/95 border-t border-[#FFB800]/10 z-50 max-w-[430px] mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <button 
          onClick={handleProceed} 
          className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black rounded-[12px] font-bold text-sm shadow-md shadow-[#FFB800]/15 active:scale-95 transition-transform"
        >
          Proceed
        </button>
      </div>

    </div>
  )
}
