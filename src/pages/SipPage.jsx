import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 15 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.4 } 
})

export default function SipPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const incoming = location.state || null

  // Active Tab state: 'SIP' or 'Coins'
  const [activeTab, setActiveTab] = useState('SIP')

  // Zustand Store
  const { activeSIPs, createSIP, pauseSIP, deleteSIP } = useAppStore()

  // Add incoming SIP if redirected from Home
  useEffect(() => {
    if (incoming && incoming.amount) {
      createSIP({
        name: incoming.name || `${incoming.metal} ${incoming.freq} SIP`,
        amount: incoming.amount,
        frequency: incoming.freq || 'Daily',
        metalType: incoming.metal || 'Gold',
      })
      // Clear navigation state to prevent duplicate creation on page reload
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [incoming, createSIP, navigate, location.pathname])

  const sips = activeSIPs || []

  // Mock Coins & Bars Purchased
  const purchasedCoins = [
    {
      id: 1,
      name: 'Augmont 1Gm Gold Coin (999.9 Purity)',
      metal: 'Gold',
      qty: 2,
      purchaseDate: '2026-03-15',
      status: 'Stored in Vault'
    },
    {
      id: 2,
      name: '10Gm Silver Coin (999 Purity)',
      metal: 'Silver',
      qty: 5,
      purchaseDate: '2026-04-20',
      status: 'Stored in Vault'
    },
    {
      id: 3,
      name: 'Augmont 0.5Gm Gold Coin',
      metal: 'Gold',
      qty: 1,
      purchaseDate: '2026-05-05',
      status: 'Delivered'
    }
  ]

  return (
    <div className="space-y-6 pb-24 text-white bg-[#0B0B0B] min-h-screen font-sans -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative">
      
      {/* Top Navigation Header */}
      <div className="flex items-center gap-4 border-b border-[#FFB800]/10 pb-4 mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] active:scale-95 transition-all"
        >
          ←
        </button>
        <div>
          <h2 className="text-lg font-black text-white">SIP Portal</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Coins & Bars</p>
        </div>
      </div>

      {/* Two Tabs: [SIP] [Coins & Bars] */}
      <div className="flex bg-[#1A1A1A] p-1.5 rounded-[12px] border border-[#FFB800]/10">
        <button 
          onClick={() => setActiveTab('SIP')} 
          className={`flex-1 py-2.5 rounded-[8px] text-xs font-bold transition-all duration-200 ${activeTab === 'SIP' ? 'bg-[#FFB800] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
        >
          SIP
        </button>
        <button 
          onClick={() => setActiveTab('Coins')} 
          className={`flex-1 py-2.5 rounded-[8px] text-xs font-bold transition-all duration-200 ${activeTab === 'Coins' ? 'bg-[#FFB800] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
        >
          Coins & Bars
        </button>
      </div>

      {/* SIP Tab List */}
      {activeTab === 'SIP' && (
        <motion.div {...fadeUp(0)} className="space-y-4">
          {sips.length === 0 ? (
            <div className="text-center py-20 bg-[#1A1A1A] rounded-2xl border border-[#FFB800]/10 p-6">
              <span className="text-5xl block mb-4">🔄</span>
              <h3 className="text-base font-bold mb-2">No Active SIP Plans Yet</h3>
              <p className="text-xs text-gray-400 mb-6 max-w-[240px] mx-auto leading-relaxed">
                Start your gold or silver SIP with as little as Rs 100 today.
              </p>
              <button 
                onClick={() => navigate('/portfolio')} 
                className="h-[44px] px-8 bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-xs rounded-[12px] shadow-lg shadow-[#FFB800]/15 transition-transform active:scale-95"
              >
                Start SIP From Home
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active SIPs ({sips.length})</span>
                {incoming && (
                  <span className="text-[9px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-bold">
                    ✓ New SIP Active
                  </span>
                )}
              </div>

              {sips.map((sip) => (
                <div 
                  key={sip.id} 
                  className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#FFB800]/15 relative overflow-hidden"
                >
                  {/* Metal indicator badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#0B0B0B] px-3 py-1 rounded-full border border-[#FFB800]/10">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sip.metalType === 'Gold' ? '#FFB800' : '#BDC3C7' }}></span>
                    <span className="text-[10px] font-bold text-white uppercase">{sip.metalType}</span>
                  </div>

                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">
                    SIP Installment {sip.status === 'paused' && <span className="text-red-400 font-bold ml-1.5">(Paused)</span>}
                  </p>
                  <p className="text-2xl font-black text-[#FFB800] mb-4">
                    ₹{sip.amount.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-gray-400">/ {sip.frequency}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-y-2.5 pt-3 border-t border-[#FFB800]/10 text-xs mb-4">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">Start Date</p>
                      <p className="font-semibold text-white">{sip.startDate}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">Next Auto-debit</p>
                      <p className="font-semibold text-white">{sip.nextDate || sip.nextDeduction}</p>
                    </div>
                  </div>

                  {/* Actions: Pause/Resume and Cancel */}
                  <div className="flex gap-2 border-t border-[#FFB800]/10 pt-3">
                    <button
                      onClick={() => pauseSIP(sip.id)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        sip.status === 'paused' 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20' 
                          : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20'
                      }`}
                    >
                      {sip.status === 'paused' ? 'Resume' : 'Pause'}
                    </button>
                    <button
                      onClick={() => deleteSIP(sip.id)}
                      className="flex-1 py-1.5 rounded-lg text-[10px] font-bold bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      Cancel SIP
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => navigate('/portfolio')} 
                className="w-full h-[48px] border border-[#FFB800]/30 hover:bg-[#FFB800]/5 text-[#FFB800] rounded-[12px] font-bold text-xs transition-colors mt-2"
              >
                + Create Another SIP Plan
              </button>
            </>
          )}
        </motion.div>
      )}

      {/* Coins & Bars Purchased Tab List */}
      {activeTab === 'Coins' && (
        <motion.div {...fadeUp(0)} className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Your Vault Inventory ({purchasedCoins.length})</span>
          </div>

          {purchasedCoins.map((coin) => (
            <div 
              key={coin.id} 
              className="bg-[#1A1A1A] rounded-2xl p-4.5 border border-[#FFB800]/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0B0B0B] rounded-xl flex items-center justify-center border border-[#FFB800]/15">
                  {coin.metal === 'Gold' ? (
                    <span className="text-2xl">🪙</span>
                  ) : (
                    <span className="text-2xl">🥈</span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">{coin.name}</h4>
                  <p className="text-[9px] text-gray-500 mt-1">Purchased: {coin.purchaseDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-[#FFB800]">{coin.qty} Qty</p>
                <span className="inline-block text-[8px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full mt-1.5 font-bold">
                  {coin.status}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

    </div>
  )
}
