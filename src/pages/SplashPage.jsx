import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0B0B0B] font-sans max-w-[430px] mx-auto py-6">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFB800]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Logo & Info */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="w-24 h-24 rounded-3xl bg-[#1A1A1A] shadow-[0_0_30px_rgba(255,184,0,0.15)] flex items-center justify-center mb-6 border border-[#FFB800]/35">
          <span className="text-4xl font-black text-[#FFB800] tracking-tighter">G5</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-black text-white tracking-wider uppercase mb-1"
        >
          GOLDe5
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white text-xs font-bold uppercase tracking-wider mt-1.5"
        >
          Your gold is FULLY PROTECTED!
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-[#FFB800] text-[9px] uppercase tracking-[0.2em] font-extrabold mt-1"
        >
          From the house of SpixCapital
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute bottom-16 flex flex-col items-center gap-3"
      >
        <div className="w-32 h-[3px] bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-[#FFB800] rounded-full"
          />
        </div>
        <p className="text-[8px] text-gray-500 tracking-[0.25em] uppercase font-bold">Securing Your Assets...</p>
      </motion.div>
    </div>
  )
}
