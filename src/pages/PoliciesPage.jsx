import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function PoliciesPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('privacy') // 'privacy', 'terms', 'refund'

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
          Legal & Policies
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#1A1A1A] p-1 border border-[#FFB800]/10 rounded-xl">
        {[
          { id: 'privacy', label: 'Privacy' },
          { id: 'terms', label: 'Terms' },
          { id: 'refund', label: 'Refund' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors relative ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-white'}`}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activePolicyTab"
                className="absolute inset-0 bg-[#FFB800] rounded-lg -z-10"
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-2xl p-5 space-y-4 shadow-md max-h-[500px] overflow-y-auto custom-scrollbar text-xs leading-relaxed text-gray-300">
        
        {activeTab === 'privacy' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-4 text-left"
          >
            <h2 className="text-xs font-black text-[#FFB800] uppercase tracking-wider">Privacy Policy</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Last updated: May 2026</p>
            
            <p>
              Your privacy is extremely important to GOLDe5. This policy explains how we collect, store, share, and protect your personal information in accordance with RBI guidelines and Indian financial rules.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">1. Information Collection</h3>
            <p>
              We collect identity information (PAN, Aadhaar details) to comply with Know Your Customer (KYC) directives. We also record transaction logs, banking references, and contact details to manage orders and vault compliance.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">2. Vault Data Security</h3>
            <p>
              To confirm ownership of physical bullion, holdings balances are shared securely with IDBI Trusteeship. No personal banking credentials or raw document files are sold to third-party providers.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">3. Policy Amendments</h3>
            <p>
              We reserve the right to modify this Privacy Policy. Users will be notified of changes via transactional notifications and our dashboard banner updates.
            </p>
          </motion.div>
        )}

        {activeTab === 'terms' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-4 text-left"
          >
            <h2 className="text-xs font-black text-[#FFB800] uppercase tracking-wider">Terms of Service</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Last updated: May 2026</p>

            <p>
              By accessing the GOLDe5 mobile app and web services, you agree to comply with the legal conditions outlined in these Terms of Service.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">1. Digital Bullion Transactions</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Live metal rates displayed are linked to live markets and include 3% Goods and Services Tax (GST).
              </li>
              <li>
                Transactions once authorized cannot be reversed or cancelled due to instant physical lock-ins.
              </li>
              <li>
                Holdings remain digital until you submit a physical delivery conversion request.
              </li>
            </ul>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">2. Vault Custody & Trustee</h3>
            <p>
              Your physical gold and silver are held in institutional secure vaults. GOLDe5 acts as the platform, while IDBI Trusteeship represents client interests.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">3. User Liability</h3>
            <p>
              You are responsible for keeping your OTP and account credentials safe. Any suspicious behavior should be immediately flagged to our help desk.
            </p>
          </motion.div>
        )}

        {activeTab === 'refund' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-4 text-left"
          >
            <h2 className="text-xs font-black text-[#FFB800] uppercase tracking-wider">Cancellation & Refund</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Last updated: May 2026</p>

            <p>
              Please read our Cancellation and Refund policy carefully before completing purchases.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">1. Purchase Order Locks</h3>
            <p>
              Due to real-time physical bullion allocations in independent vaults, all completed orders are final. No refunds or cancellations are allowed once a purchase transaction succeeds.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">2. SIP Cancellations</h3>
            <p>
              You can pause, edit, or terminate an active SIP (Systematic Investment Plan) at any time. Terminating an active SIP does not trigger a refund of previously bought gold; it only stops future automatic debits.
            </p>

            <h3 className="font-bold text-white text-xs mt-3 uppercase tracking-wide">3. Failed Bank Transactions</h3>
            <p>
              If money is debited from your account but the gold is not credited due to a payment gateway failure, the amount will be automatically returned to your bank account within 3 to 5 business days.
            </p>
          </motion.div>
        )}

      </div>

      {/* Info Badge */}
      <p className="text-[9px] text-gray-600 text-center font-mono uppercase tracking-widest mt-4">
        RBI regulated & audited by IDBI Trusteeship Services
      </p>

    </motion.div>
  )
}
