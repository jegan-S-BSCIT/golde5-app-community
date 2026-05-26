import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.4 } })

export default function SmsPermissionPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0B0B0B] font-sans flex flex-col px-6 max-w-[430px] mx-auto relative overflow-hidden py-6">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-[#FFB800]/5 blur-[120px] pointer-events-none" />
      
      <motion.div {...fadeUp(0)} className="flex-1 flex flex-col justify-center items-center text-center mt-10">
        <div className="w-24 h-24 bg-[#1A1A1A] rounded-full border border-[#FFB800]/30 flex items-center justify-center text-4xl mb-8 shadow-[0_0_30px_rgba(255,184,0,0.15)]">
          💬
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
          Allow SMS for Updates & Notifications
        </h1>
        
        <p className="text-sm text-gray-400 mb-10 max-w-[290px] mx-auto leading-relaxed">
          Get instant alerts for transactions, withdrawals, and important updates.
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="pb-8 space-y-4">
        <button 
          onClick={() => navigate('/portfolio')}
          className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black rounded-[12px] font-bold text-sm shadow-[0_4px_15px_rgba(255,184,0,0.2)] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Security Alerts On →
        </button>
        
        <button 
          onClick={() => navigate('/portfolio')}
          className="w-full h-[48px] bg-transparent border border-[#333] hover:border-gray-600 text-gray-400 rounded-[12px] font-bold text-sm active:scale-95 transition-transform"
        >
          Skip for Now
        </button>

        <p className="text-center text-[10px] text-gray-500 uppercase tracking-wider pt-4">
          Your information is safe with us
        </p>
      </motion.div>
    </div>
  )
}
