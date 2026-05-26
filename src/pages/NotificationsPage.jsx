import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/useAppStore'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

const initialNotifications = [
  {
    id: 1,
    title: 'Gold Price Drops by 0.5%!',
    message: 'Gold prices are down today. Start a quick purchase or top up your active SIP before they rebound.',
    time: '2 hours ago',
    unread: true,
    category: 'Price Alert'
  },
  {
    id: 2,
    title: 'SIP Installment Success',
    message: 'Your weekly SIP installment of ₹500 has been debited. 0.058 gm Gold credited to your vault.',
    time: 'Yesterday',
    unread: true,
    category: 'Transaction'
  },
  {
    id: 3,
    title: 'Security Login Attempt',
    message: 'A login request was made on your GOLDe5 account from Chrome on Windows at 10:14 AM.',
    time: '2 days ago',
    unread: false,
    category: 'Security'
  }
]

export default function NotificationsPage() {
  const navigate = useNavigate()
  
  // Toggle switches states (persisted/mocked)
  const [switches, setSwitches] = useState({
    txAlerts: true,
    sipReminders: true,
    priceAlerts: false,
    promoOffers: true,
    securityAlerts: true
  })

  const { notifications: storeNotifications, markAllRead, markNotificationRead } = useAppStore()

  // Notifications history mapping
  const notifications = (storeNotifications || []).map(item => {
    let category = 'Alert'
    if (item.icon === '🔐' || item.icon === '👤') category = 'Security'
    else if (item.icon === '🪙' || item.icon === '💸' || item.icon === '🏦' || item.icon === '🏧') category = 'Transaction'
    else if (item.icon === '🔄') category = 'SIP'
    else if (item.icon === '🛒') category = 'Order'

    return {
      id: item.id,
      title: item.title,
      message: item.body || item.message,
      time: item.time || 'Just now',
      unread: !item.read,
      category: item.category || category
    }
  })

  const handleToggle = (key) => {
    setSwitches(prev => {
      const updated = { ...prev, [key]: !prev[key] }
      toast.success('Notification preferences updated')
      return updated
    })
  }

  const markAllAsRead = () => {
    markAllRead()
    toast.success('All notifications marked as read ✓')
  }

  const handleNotificationClick = (id) => {
    markNotificationRead(id)
  }

  const hasUnread = notifications.some(n => n.unread)

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
          Notifications
        </h1>
      </div>

      {/* Switch Settings Section */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/10 p-5 rounded-2xl space-y-4">
        <h3 className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest border-b border-[#FFB800]/10 pb-2">Preferences</h3>
        
        {/* Toggle Rows */}
        {[
          { label: 'Transaction Alerts', key: 'txAlerts', desc: 'Confirmations, deposits, and orders' },
          { label: 'SIP Reminders', key: 'sipReminders', desc: 'Upcoming and missed weekly/monthly SIPs' },
          { label: 'Price Alerts', key: 'priceAlerts', desc: 'Drastic drops or highs in Gold & Silver prices' },
          { label: 'Promotional Offers', key: 'promoOffers', desc: 'Cashbacks, referrals, and deposit bonuses' },
          { label: 'Security Alerts', key: 'securityAlerts', desc: 'Logins from new devices and profile edits' }
        ].map(item => (
          <div key={item.key} className="flex justify-between items-center py-1">
            <div className="space-y-0.5 max-w-[75%]">
              <p className="text-xs font-bold text-white leading-none">{item.label}</p>
              <p className="text-[10px] text-gray-500 font-medium leading-tight">{item.desc}</p>
            </div>
            {/* Toggle Switch */}
            <button
              onClick={() => handleToggle(item.key)}
              className={`w-[40px] h-[22px] rounded-full p-0.5 transition-colors relative flex items-center ${switches[item.key] ? 'bg-[#FFB800]' : 'bg-gray-700'}`}
            >
              <motion.div 
                layout
                className={`w-[18px] h-[18px] rounded-full bg-black ${switches[item.key] ? 'ml-auto' : 'mr-auto'}`}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Notifications Listing Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Notification History</h3>
          {hasUnread && (
            <button 
              onClick={markAllAsRead}
              className="text-[9px] text-[#FFB800] font-black uppercase tracking-widest hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {notifications.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleNotificationClick(item.id)}
                className={`bg-[#1A1A1A] border p-4.5 rounded-2xl relative transition-all active:scale-[0.99] cursor-pointer ${
                  item.unread 
                    ? 'border-l-4 border-l-[#FFB800] border-y-[#FFB800]/10 border-r-[#FFB800]/10 shadow-[0_0_15px_rgba(255,184,0,0.03)]' 
                    : 'border-[#FFB800]/5 border-l-[#FFB800]/10'
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      item.unread ? 'text-[#FFB800] border-[#FFB800]/30 bg-[#FFB800]/5' : 'text-gray-500 border-gray-800'
                    }`}>
                      {item.category}
                    </span>
                    {item.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                    )}
                  </div>
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">{item.time}</span>
                </div>

                {/* Message */}
                <h4 className={`text-xs font-bold ${item.unread ? 'text-white' : 'text-gray-400'}`}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium mt-1">
                  {item.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </motion.div>
  )
}
