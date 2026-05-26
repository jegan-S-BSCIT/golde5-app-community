import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

export default function SuccessPage() {
  const navigate = useNavigate()
  const { transactions } = useAppStore()
  const lastTx = transactions[0]

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center px-6 relative overflow-hidden max-w-[430px] mx-auto py-6">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFB800]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full text-center space-y-6">
        
        {/* Success Checkmark Circle */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto"
        >
          <motion.svg 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-10 h-10 text-green-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={3}
          >
            <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-black text-white">Payment Successful!</h1>
          <p className="text-xs text-gray-400">Your gold is protected in high-security vaults.</p>
        </motion.div>

        {/* Transaction Invoice Card */}
        {lastTx && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.35 }}
            className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#FFB800]/10 text-left space-y-3 shadow-lg"
          >
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-white">#{lastTx.id.toString().slice(-8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-[#FFB800]">₹{Math.abs(lastTx.amount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Delivery Status</span>
              <span className="text-green-400 font-bold">100% Insured Delivery</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Status</span>
              <span className="text-green-400 font-bold">✓ Completed</span>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }} 
          className="space-y-3 pt-4"
        >
          <button 
            onClick={() => navigate('/portfolio')}
            className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-sm rounded-[12px] shadow-md shadow-[#FFB800]/10 transition-transform active:scale-95 flex items-center justify-center"
          >
            Go to Home
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/shop')}
              className="flex-1 h-[44px] bg-[#1A1A1A] border border-[#FFB800]/10 text-gray-300 font-bold text-xs rounded-[12px] active:scale-95 transition-transform"
            >
              Shop More
            </button>
            <button 
              onClick={() => {
                const text = `I just secured digital gold on GOLDe5! 🪙 Check it out:\nhttps://golde5.app`
                navigator.share?.({ title: 'Secured Gold!', text }) || navigator.clipboard?.writeText(text)
                toast.success('Referral link copied!')
              }} 
              className="flex-1 h-[44px] bg-[#1A1A1A] border border-[#FFB800]/10 text-gray-300 font-bold text-xs rounded-[12px] active:scale-95 transition-transform flex items-center justify-center gap-1.5"
            >
              Share 📤
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
