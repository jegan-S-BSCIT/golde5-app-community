import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

const faqData = [
  {
    q: 'What is GOLDe5 Digital Gold?',
    a: 'GOLDe5 allows you to buy, sell, and accumulate 24K 99.9% pure gold and 999 fine silver electronically. Every purchase is backed by physical metal stored securely in insured, institutional-grade vaults.',
    category: 'General'
  },
  {
    q: 'How is my gold and silver secured?',
    a: 'All physical metal is held in secure vaults managed by IDBI Trusteeship. This ensures your investments are independent of GOLDe5 assets and fully secured against default or loss.',
    category: 'Security'
  },
  {
    q: 'Can I take physical delivery of my holdings?',
    a: 'Yes, you can request physical delivery of your accumulated gold and silver at any time. We mint them into beautiful coins or bars and ship them directly to your doorstep in tamper-proof packaging, fully insured.',
    category: 'Delivery'
  },
  {
    q: 'What is the minimum investment amount?',
    a: 'You can start buying gold or silver for as little as ₹100. This applies to both instant purchases and setting up a recurring weekly or monthly SIP.',
    category: 'SIP & Buy'
  },
  {
    q: 'Are there any hidden storage charges?',
    a: 'No, GOLDe5 offers free vault storage for up to 5 years. There are no maintenance or management fees deducted from your gold balance.',
    category: 'General'
  },
  {
    q: 'How is the live price determined?',
    a: 'Live rates are linked directly to international and domestic bullion markets. Prices update in real-time on our dashboard and are locked when you complete a transaction.',
    category: 'Price'
  }
]

export default function FaqsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleToggle = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  const filteredFaqs = faqData.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          FAQs Help Center
        </h1>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions, safety, deliveries..."
          className="w-full h-[50px] pl-11 pr-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
          >
            Clear
          </button>
        )}
      </div>

      {/* FAQs Collapsible Accordion */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-[#1A1A1A] rounded-2xl border border-[#FFB800]/5 text-gray-500">
            <p className="text-xs font-bold uppercase tracking-wider">No matching questions found</p>
          </div>
        ) : (
          filteredFaqs.map((item, idx) => {
            const isExpanded = expandedIndex === idx
            return (
              <div 
                key={idx}
                className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-2xl overflow-hidden transition-colors"
              >
                {/* Header */}
                <div 
                  onClick={() => handleToggle(idx)}
                  className="flex justify-between items-center p-4.5 cursor-pointer active:bg-[#252525]"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#FFB800] border border-[#FFB800]/30 px-2 py-0.5 rounded bg-[#FFB800]/5">
                      {item.category}
                    </span>
                    <h3 className="text-xs font-bold text-white pt-1">{item.q}</h3>
                  </div>
                  <span className={`text-[#FFB800] text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>

                {/* Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4.5 pt-0 border-t border-[#FFB800]/5 text-[11px] text-gray-400 leading-relaxed font-medium">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>

      {/* Support Banner */}
      <div className="bg-[#1D1600] border border-[#FFB800]/20 rounded-2xl p-4.5 text-center space-y-3">
        <p className="text-[11px] text-gray-300 font-bold leading-normal">
          Can't find what you're looking for? Reach out to our dedicated client support desk.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="h-[36px] px-6 bg-[#FFB800] hover:bg-[#D4A017] text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
        >
          Contact Support
        </button>
      </div>

    </motion.div>
  )
}
