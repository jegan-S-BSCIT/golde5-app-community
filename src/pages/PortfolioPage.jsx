import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { 
  GoldCoinIcon, 
  SilverCoinIcon, 
  GoldBarIcon, 
  BuyGoldIcon, 
  StartSipIcon, 
  SellGoldIcon, 
  ReferIcon 
} from '../components/MetallicIcons'

const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 15 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.4 } 
})

export default function PortfolioPage() {
  const navigate = useNavigate()
  const { holdings, portfolio } = useAppStore()
  const [sipFreq, setSipFreq] = useState('Daily')
  const [sipAmount, setSipAmount] = useState(100)
  const [sipProduct, setSipProduct] = useState('Gold')

  const totalValue = portfolio?.totalValue || 0
  const totalInvested = holdings?.totalInvested || 0
  const gainAmount = totalValue - totalInvested
  const gainPercent = totalInvested > 0 ? (gainAmount / totalInvested) * 100 : 0
  const isGain = gainAmount >= 0

  const quotes = [
    "Smart investors always keep gold in their portfolio.",
    "Gold has protected wealth for over 5,000 years.",
    "A little gold every month builds a powerful future.",
    "Your gold is fully insured and vault-protected.",
    "Start a Gold SIP and grow wealth gram by gram.",
    "Silver combines industrial demand with investment value.",
    "Never Say Never to Gold.",
    "Central banks worldwide store gold as their reserve."
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [quotes.length])

  const goalPlans = [
    { title: "SAVE TO BUY A NEW VEHICLE", icon: "🚗", defaultAmount: 2000 },
    { title: "SAVE FOR KIDS", icon: "👶", defaultAmount: 1000 },
    { title: "SAVE FOR FAMILY MARRIAGE", icon: "💍", defaultAmount: 5000 },
    { title: "EXPLORE THE WORLD", icon: "✈️", defaultAmount: 3000 }
  ]

  // Estimated 12-month savings formula: (amount * frequency_days)
  // where Daily = 365, Weekly = 52, Monthly = 12
  const calcExpected = () => {
    let multiplier = 365
    if (sipFreq === 'Weekly') multiplier = 52
    if (sipFreq === 'Monthly') multiplier = 12
    return (sipAmount * multiplier).toLocaleString('en-IN')
  }

  return (
    <div className="space-y-6 pb-24 text-white bg-[#0B0B0B] min-h-screen font-sans -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative">
      
      {/* Header Info */}
      <div className="flex justify-between items-center px-1 !mt-3">
        <div>
          <h2 className="text-2xl font-black text-white">Welcome to GOLDe5!</h2>
          <p className="text-[12px] text-[#FFB800] font-semibold">Start Your Journey from Rupees to Gold.</p>
        </div>
      </div>

      {/* Slim Quote Ticker */}
      <div className="w-full px-1">
        <div className="min-h-[44px] bg-[#1A1A1A] border-l-[3px] border-[#FFB800] rounded-lg flex items-center px-3 py-1.5 gap-2 w-full">
          {/* Left side: small gold quotation icon (") — fixed, does not scroll */}
          <span className="text-[#FFB800] text-lg font-serif leading-none select-none flex-shrink-0">“</span>
          
          {/* Right side: quote text slides/fades in one at a time (auto every 4 seconds) */}
          <div className="flex-1 min-w-0 flex items-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentQuoteIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-white italic text-[13px] font-sans w-full block leading-snug"
              >
                {quotes[currentQuoteIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Portfolio Card Summary */}
      <motion.section {...fadeUp(0)} className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#FFB800]/20 shadow-[0_0_15px_rgba(255,184,0,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFB800]/5 rounded-full blur-2xl pointer-events-none" />
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Portfolio Value</p>
        <p className="text-3xl font-black text-[#FFB800] mb-2">₹{Math.round(totalValue).toLocaleString('en-IN')}</p>
        <p className={`text-xs font-semibold ${isGain ? 'text-green-400' : 'text-red-400'} mb-5`}>
          {isGain ? 'Gain +' : 'Loss -'}₹{Math.abs(Math.round(gainAmount)).toLocaleString('en-IN')} ({isGain ? '+' : ''}{gainPercent.toFixed(2)}%)
        </p>
        
        <div className="flex justify-between border-t border-[#FFB800]/10 pt-3 text-xs">
          <div>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">Invested</p>
            <p className="font-bold text-white">₹{Math.round(totalInvested).toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">Gold & Silver Balance</p>
            <p className="font-bold text-[#FFB800]">{(holdings?.goldGrams || 0).toFixed(2)}g Gold | {(holdings?.silverGrams || 0).toFixed(2)}g Silver</p>
          </div>
        </div>
      </motion.section>

      {/* Safety Badge */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/20 rounded-xl p-3 flex items-center gap-3">
        <span className="text-xl">🛡️</span>
        <span className="text-[11px] font-bold text-[#FFB800] leading-snug">
          Your gold is protected in high-security vaults.
        </span>
      </div>

      {/* SIP Quick Start Builder */}
      <motion.section {...fadeUp(0.1)} className="bg-[#1A1A1A] p-5 rounded-2xl border border-[#FFB800]/25 shadow-[0_0_20px_rgba(255,184,0,0.05)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <StartSipIcon className="w-5 h-5 inline-block" /> Start a SIP
          </h3>
          {/* Gold / Silver selector toggles */}
          <div className="flex bg-[#0B0B0B] p-1 rounded-lg border border-[#FFB800]/10">
            {['Gold', 'Silver'].map(m => (
              <button 
                key={m} 
                type="button"
                onClick={() => setSipProduct(m)}
                className={`px-3 py-1 rounded-md text-[10px] font-black transition-all duration-200 ${sipProduct === m ? 'bg-[#FFB800] text-black' : 'text-gray-500'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* SIP Frequency switch: [Daily] [Weekly] [Monthly] */}
        <div className="grid grid-cols-3 bg-[#0B0B0B] p-1 rounded-xl mb-4 border border-[#FFB800]/10">
          {['Daily', 'Weekly', 'Monthly'].map(f => (
            <button 
              key={f} 
              type="button"
              onClick={() => setSipFreq(f)} 
              className={`py-2 rounded-lg text-xs font-bold transition-all duration-200 ${sipFreq === f ? 'bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/20' : 'text-gray-500 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Large Input Display Box: Rs [Amount] / [Frequency] */}
        <div className="flex flex-col items-center justify-center bg-[#0B0B0B] border border-[#FFB800]/10 rounded-xl p-4 mb-4">
          <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">SIP Amount</span>
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-lg font-bold text-[#FFB800]">Rs</span>
            <input 
              type="number" 
              value={sipAmount} 
              onChange={(e) => setSipAmount(Math.max(10, Number(e.target.value)))} 
              className="bg-transparent border-none text-3xl font-black text-center text-white outline-none w-28 placeholder:text-gray-700" 
              placeholder="100"
            />
            <span className="text-xs font-bold text-gray-500">/ {sipFreq}</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mb-4 text-center leading-none">
          Your estimated savings in 12 months: <span className="font-extrabold text-[#FFB800]">Rs {calcExpected()}</span>
        </p>
        
        <button 
          onClick={() => navigate('/sip', { state: { metal: sipProduct, amount: sipAmount, freq: sipFreq } })} 
          className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-sm rounded-[12px] shadow-lg shadow-[#FFB800]/15 transition-transform active:scale-95 flex items-center justify-center"
        >
          Start Saving {sipFreq}
        </button>
        <p className="text-[9px] text-gray-500 text-center mt-2.5 font-semibold">✨ SIP payment starts Today</p>
      </motion.section>

      {/* Horizontal Scroll Goal Plans */}
      <motion.section {...fadeUp(0.2)}>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Goal Plans</p>
        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 flex gap-4 pb-2">
          {goalPlans.map((goal, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/sip', { state: { metal: 'Gold', amount: goal.defaultAmount, freq: 'Monthly', name: goal.title } })}
              className="min-w-[195px] p-4 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#201A0B] border border-[#FFB800]/20 hover:border-[#FFB800]/60 flex flex-col justify-between h-32 shadow-lg shadow-black/40 relative overflow-hidden group cursor-pointer transition-all duration-300"
            >
              {/* Subtle Gold Radial Glow */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFB800]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#FFB800]/10 transition-colors" />

              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-xl bg-[#0B0B0B]/80 border border-[#FFB800]/15 flex items-center justify-center text-base shadow-inner">
                  {goal.icon}
                </div>
                <span className="text-[8px] bg-[#FFB800]/10 text-[#FFB800] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-[#FFB800]/10 group-hover:bg-[#FFB800] group-hover:text-black transition-colors duration-300">
                  Save
                </span>
              </div>
              
              <div className="mt-2">
                <p className="text-[10.5px] font-black text-white leading-snug tracking-wide uppercase group-hover:text-[#FFB800] transition-colors duration-200">{goal.title}</p>
                <p className="text-[8.5px] text-gray-400 font-bold mt-1">From ₹{goal.defaultAmount.toLocaleString('en-IN')}/mo →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Shop Preview Section ( Kalyan / Caratlane partner labels) */}
      <motion.section {...fadeUp(0.3)}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <h3 className="text-[13px] font-bold text-white">Shop at GOLDe5</h3>
            <span className="text-[9px] text-gray-500">Partner: Kalyan / Caratlane</span>
          </div>
          <span className="text-[10px] text-[#FFB800] font-bold cursor-pointer hover:underline" onClick={() => navigate('/shop')}>View All</span>
        </div>
        <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 flex gap-3.5">
          {[
            { name: 'Gold Coins & Bars', desc: 'Sourced from Augmont', icon: <GoldCoinIcon className="w-14 h-14" /> },
            { name: 'Silver Coins & Bars', desc: '100% Insured Delivery', icon: <SilverCoinIcon className="w-14 h-14" /> },
            { name: 'Jewellery Vouchers', desc: 'Redeem at Kalyan / Caratlane', icon: <GoldBarIcon className="w-14 h-14" /> }
          ].map((p, i) => (
            <div key={i} onClick={() => navigate('/shop')} className="min-w-[140px] bg-[#1A1A1A] p-4 rounded-2xl border border-[#FFB800]/10 text-center active:scale-95 transition-transform flex flex-col items-center justify-between h-36">
              <div className="h-14 flex items-center justify-center">
                {p.icon}
              </div>
              <div>
                <p className="text-[11px] font-bold text-white leading-tight line-clamp-1 mb-0.5">{p.name}</p>
                <p className="text-[8px] text-gray-500 leading-none mb-1">{p.desc}</p>
              </div>
              <p className="text-[9px] text-[#FFB800] font-bold">Explore →</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FAQs Section */}
      <motion.section {...fadeUp(0.4)} className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">FAQs</h3>
          <span className="text-[10px] text-[#FFB800] font-bold hover:underline cursor-pointer" onClick={() => navigate('/faqs')}>View All</span>
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#FFB800]/10 divide-y divide-[#FFB800]/10 overflow-hidden">
          <div onClick={() => navigate('/kyc')} className="p-4 text-xs font-bold text-gray-300 hover:bg-[#252525] transition-colors cursor-pointer flex justify-between items-center">
            <span>❓ How to do KYC to verify Your Account</span>
            <span className="text-[#FFB800]">→</span>
          </div>
          <div onClick={() => navigate('/more')} className="p-4 text-xs font-bold text-gray-300 hover:bg-[#252525] transition-colors cursor-pointer flex justify-between items-center">
            <span>❓ How to share Referral Code & Earn Instantly</span>
            <span className="text-[#FFB800]">→</span>
          </div>
        </div>
      </motion.section>

    </div>
  )
}
