import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'
import { 
  GoldWhatsAppIcon, 
  GoldInstagramIcon, 
  GoldTwitterIcon, 
  GoldYoutubeIcon, 
  GoldLogoutIcon 
} from '../components/MetallicIcons'

const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 15 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.3 } 
})

export default function MorePage() {
  const navigate = useNavigate()
  const { user, holdings, logout } = useAppStore()

  // Load dynamic profile details from localStorage
  const [profileName, setProfileName] = useState('Rahul Sharma')
  const [avatar, setAvatar] = useState('')
  const [kycStatus, setKycStatus] = useState('Pending')

  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        if (parsed.name) setProfileName(parsed.name)
      } catch (e) {
        console.error(e)
      }
    } else if (user?.name) {
      setProfileName(user.name)
    }

    const savedAvatar = localStorage.getItem('user_avatar')
    if (savedAvatar) setAvatar(savedAvatar)

    const savedKyc = localStorage.getItem('kyc_status')
    if (savedKyc) setKycStatus(savedKyc)
  }, [user])

  // Mock data fallbacks for portfolio
  const cashBalance = holdings?.cashBalance ?? 3200
  const goldGrams = holdings?.goldGrams ?? 8.42
  const silverGrams = holdings?.silverGrams ?? 120.0
  const referralBonus = 2100
  const totalBalance = holdings?.totalInvested ?? 125000

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('5J98DG')
    toast.success('Referral code copied!')
  }

  return (
    <div className="space-y-6 pb-28 font-sans text-white bg-[#0B0B0B] min-h-screen -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#FFB800]/10 pb-4 mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/25 flex items-center justify-center text-[#FFB800] active:scale-95 transition-transform"
        >
          ←
        </button>
        <div className="text-center flex-1 mr-10">
          <h1 className="text-base font-black text-white uppercase tracking-widest">GOLDe5</h1>
          <p className="text-[9px] text-[#FFB800] uppercase tracking-widest font-bold">App Version v1.0.0</p>
        </div>
      </div>

      {/* Profile Section */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-4 bg-[#1A1A1A] border border-[#FFB800]/10 p-4.5 rounded-2xl">
        {avatar ? (
          <img 
            src={avatar} 
            alt="Profile Avatar" 
            className="w-14 h-14 rounded-full object-cover border border-[#FFB800]/30 shadow-[0_0_15px_rgba(255,184,0,0.2)]" 
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#FFB800] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(255,184,0,0.2)]">
            {profileName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-base font-black text-white">{profileName}</h2>
          <button 
            onClick={() => navigate('/profile')}
            className="text-[10px] text-[#FFB800] font-bold hover:underline tracking-wide uppercase mt-0.5 block text-left"
          >
            View Profile
          </button>
        </div>
      </motion.div>

      {/* PORTFOLIO Section Card */}
      <motion.div {...fadeUp(0.1)} className="bg-[#1A1A1A] border border-[#FFB800]/15 p-5 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFB800]/5 rounded-full blur-xl pointer-events-none" />
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Portfolio holdings</h3>
        
        <div className="space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#FFB800]/10 pb-2.5">
            <span className="text-gray-400">Balance:</span>
            <span className="font-bold text-white">Rs {cashBalance.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between border-b border-[#FFB800]/10 pb-2.5">
            <span className="text-gray-400">Saved Gold:</span>
            <span className="font-bold text-[#FFB800]">{goldGrams} gm</span>
          </div>
          <div className="flex justify-between border-b border-[#FFB800]/10 pb-2.5">
            <span className="text-gray-400">Saved Silver:</span>
            <span className="font-bold text-white">{silverGrams} gm</span>
          </div>
          <div className="flex justify-between border-b border-[#FFB800]/10 pb-2.5">
            <span className="text-gray-400">Referral Bonus:</span>
            <span className="font-bold text-[#FFB800]">Rs {referralBonus.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-black text-gray-400 uppercase tracking-wider text-[10px]">Total Balance:</span>
            <span className="font-black text-[#FFB800] text-sm">Rs {totalBalance.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button 
          onClick={() => toast.success('Delivery request initiated!')}
          className="w-full mt-5 h-[40px] bg-transparent border border-[#FFB800]/30 hover:bg-[#FFB800]/5 text-[#FFB800] rounded-[12px] text-xs font-bold transition-all"
        >
          Request Delivery
        </button>
      </motion.div>

      {/* REFER & EARN Section Card */}
      <motion.div {...fadeUp(0.2)} className="bg-[#1A1A1A] border border-[#FFB800]/15 p-5 rounded-2xl relative overflow-hidden">
        <h3 className="text-xs font-black text-[#FFB800] uppercase tracking-wider mb-2">Refer & Earn</h3>
        <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
          Invite friends, share your code, and earn up to 1% on their transactions when they start a SIP.
        </p>

        <div className="grid grid-cols-2 gap-3 text-center mb-4">
          <div className="bg-[#0B0B0B] border border-[#FFB800]/10 p-3 rounded-xl">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Total Referrals</p>
            <p className="font-bold text-sm text-white mt-1">3</p>
          </div>
          <div className="bg-[#0B0B0B] border border-[#FFB800]/10 p-3 rounded-xl">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Total Earned</p>
            <p className="font-bold text-sm text-[#FFB800] mt-1">₹2,100</p>
          </div>
        </div>

        {/* Copy Referral Code */}
        <div className="flex gap-2 mb-3">
          <button 
            onClick={handleCopyCode}
            className="flex-1 bg-[#0B0B0B] border border-[#FFB800]/15 rounded-xl py-3 px-4 flex items-center justify-between font-bold text-xs text-[#FFB800] active:scale-95 transition-transform"
          >
            <span className="font-bold text-white tracking-widest">5J98DG</span>
            <span className="text-[9px] bg-[#FFB800]/20 px-2 py-0.5 rounded border border-[#FFB800]/20">COPY</span>
          </button>
        </div>

        {/* Share App Button */}
        <button 
          onClick={() => { navigator.clipboard.writeText('https://golde5.app/refer/5J98DG'); toast.success('Referral link copied to clipboard!') }}
          className="w-full h-[44px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-xs uppercase rounded-[12px] shadow-md shadow-[#FFB800]/10 transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span>🔗</span> Share App & Earn Rewards
        </button>
      </motion.div>

      {/* Settings Menu List */}
      <motion.div {...fadeUp(0.3)} className="space-y-4">
        
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Account & Settings</h3>
          <div className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-2xl overflow-hidden divide-y divide-[#FFB800]/10">
            {[
              { label: 'Profile Settings', path: '/profile' },
              { label: 'Nominee Details', path: '/nominee' },
              { label: 'KYC Details', path: '/kyc', isKyc: true },
              { label: 'My Orders', path: '/orders' },
              { label: 'Notifications', path: '/notifications' },
              { label: 'FAQs', path: '/faqs' },
              { label: 'Policies', path: '/policies' }
            ].map(item => (
              <div 
                key={item.label} 
                onClick={() => navigate(item.path)} 
                className="flex justify-between items-center px-4 py-3.5 active:bg-[#252525] cursor-pointer transition-colors"
              >
                <span className="text-xs text-gray-300 font-semibold">{item.label}</span>
                {item.isKyc ? (
                  kycStatus === 'Verified' ? (
                    <span className="text-green-400 font-bold text-[10px] flex items-center gap-1 bg-green-500/10 border border-green-500/25 px-2 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  ) : kycStatus === 'Submitted' ? (
                    <span className="text-yellow-400 font-bold text-[10px] flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/25 px-2 py-0.5 rounded-full">
                      ⏳ Under Review
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold text-[10px] flex items-center gap-1 bg-red-500/10 border border-red-500/25 px-2 py-0.5 rounded-full">
                      ⚠ Pending
                    </span>
                  )
                ) : (
                  <span className="text-gray-500 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Contact Details & Social Links */}
      <motion.div {...fadeUp(0.4)} className="pt-6 border-t border-[#FFB800]/10 text-center">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Contact Details</h3>
        <div className="flex justify-center flex-wrap gap-5 text-[11px] text-gray-400 mb-8 px-2 font-medium">
          <button onClick={() => navigate('/contact')} className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors bg-transparent border-none outline-none cursor-pointer">
            <GoldWhatsAppIcon className="w-3.5 h-3.5" /> Support Center
          </button>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors">
            <GoldInstagramIcon className="w-3.5 h-3.5" /> Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors">
            <GoldTwitterIcon className="w-3.5 h-3.5" /> Twitter/X
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors">
            <GoldYoutubeIcon className="w-3.5 h-3.5" /> YouTube
          </a>
        </div>

        {/* Log Out */}
        <button 
          onClick={handleLogout} 
          className="flex items-center justify-center gap-2 mx-auto text-red-400 hover:text-red-500 font-extrabold text-xs uppercase tracking-wider py-2 active:scale-95 transition-transform"
        >
          <GoldLogoutIcon className="w-4 h-4" /> Log Out
        </button>
        
        <p className="text-[9px] text-gray-600 mt-6 font-mono uppercase tracking-widest">© SpixCapital · RBI Compliant</p>
      </motion.div>

    </div>
  )
}
