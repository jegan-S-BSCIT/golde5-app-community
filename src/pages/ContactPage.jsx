import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { 
  GoldWhatsAppIcon, 
  GoldInstagramIcon, 
  GoldTwitterIcon,
  GoldYoutubeIcon
} from '../components/MetallicIcons'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function ContactPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) {
      toast.error('Please enter your query or message')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success('Support ticket created! We will reply within 4 hours. ✓')
      setMessage('')
    }, 1200)
  }

  return (
    <motion.div 
      {...slideIn}
      className="space-y-6 pb-28 font-sans text-white bg-[#0B0B0B] min-h-screen -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#FFB800]/10 pb-4 mb-2">
        <button 
          onClick={() => navigate('/more')} 
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/25 flex items-center justify-center text-[#FFB800] active:scale-95 transition-transform"
        >
          ←
        </button>
        <h1 className="text-sm font-black text-white uppercase tracking-widest flex-1 text-center mr-10">
          Support Center
        </h1>
      </div>

      {/* Support Direct Contact Cards */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Direct Channels</h3>
        
        {/* WhatsApp Card */}
        <a 
          href="https://wa.me/919999999999" 
          target="_blank" 
          rel="noreferrer"
          className="flex justify-between items-center bg-[#1A1A1A] border border-[#FFB800]/10 hover:border-[#FFB800]/30 p-4 rounded-2xl active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <GoldWhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Chat on WhatsApp</h4>
              <p className="text-[10px] text-gray-500 font-medium">Instant reply · 24/7 Availability</p>
            </div>
          </div>
          <span className="text-[#FFB800] text-xs">→</span>
        </a>

        {/* Email Support */}
        <a 
          href="mailto:support@golde5.app"
          className="flex justify-between items-center bg-[#1A1A1A] border border-[#FFB800]/10 hover:border-[#FFB800]/30 p-4 rounded-2xl active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center">
              <span className="text-xl">✉</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Email Client Desk</h4>
              <p className="text-[10px] text-gray-500 font-medium">support@golde5.app · Response in 4 hrs</p>
            </div>
          </div>
          <span className="text-[#FFB800] text-xs">→</span>
        </a>
      </div>

      {/* Quick Ticket Form */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/10 p-5 rounded-2xl space-y-4">
        <h3 className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest border-b border-[#FFB800]/10 pb-2">Quick Message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Explain Your Query</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Tell us about order issues, SIP debits, verification delays, etc..."
              className="w-full p-4 rounded-xl bg-[#0B0B0B] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-[44px] bg-[#FFB800] hover:bg-[#D4A017] disabled:bg-gray-700 disabled:text-gray-400 active:scale-[0.98] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              'Submit Support Message'
            )}
          </button>
        </form>
      </div>

      {/* Social Handles */}
      <div className="space-y-3 pt-2">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 text-center">Join the Community</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Instagram', icon: <GoldInstagramIcon className="w-4 h-4" />, url: 'https://instagram.com' },
            { label: 'Twitter/X', icon: <GoldTwitterIcon className="w-4 h-4" />, url: 'https://twitter.com' },
            { label: 'YouTube', icon: <GoldYoutubeIcon className="w-4 h-4" />, url: 'https://youtube.com' }
          ].map(social => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3.5 bg-[#1A1A1A] border border-[#FFB800]/10 rounded-xl hover:border-[#FFB800]/30 transition-all text-gray-400 hover:text-white"
            >
              {social.icon}
              <span className="text-[9px] font-bold mt-1.5">{social.label}</span>
            </a>
          ))}
        </div>
      </div>

    </motion.div>
  )
}
