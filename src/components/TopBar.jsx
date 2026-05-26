import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { ChangeIndicator } from './SkeletonLoader'

export default function TopBar() {
  const { user, prices, getGoldChange, notifications, markNotificationRead } = useAppStore()
  const [showNotifs, setShowNotifs] = useState(false)
  const unread = notifications.filter(n => !n.read).length
  const goldChange = getGoldChange()

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 pb-2 bg-transparent safe-top">
      <div className="bg-[#111111]/80 backdrop-blur-2xl border border-primary/20 rounded-[20px] shadow-[0_4px_30px_rgba(212,175,55,0.08)] flex items-center justify-between p-3">
        
        {/* Left Side: Live Gold Price */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_#22C55E]" />
            <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest">Gold 24K</span>
          </div>
          <p className="text-[15px] font-bold text-text-primary tracking-tight">₹{prices.gold24k.toLocaleString('en-IN')}<span className="text-[10px] text-text-muted">/g</span></p>
          <div className="mt-0.5">
            <ChangeIndicator change={goldChange.change} pct={goldChange.pct} size="text-[10px]" />
          </div>
        </div>

        {/* Right Side: Profile & Notifications */}
        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col items-end">
            <p className="text-[12px] font-bold text-text-primary">{user?.name || 'Investor'}</p>
            <p className="text-[10px] text-primary font-semibold tracking-wide">Welcome back!</p>
          </div>
          
          <div className="relative">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative w-10 h-10 rounded-full border border-border-default bg-bg-card flex items-center justify-center overflow-hidden hover:border-primary transition-all active:scale-95">
              {/* Profile placeholder image - in real app would be user.photoURL */}
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-bg-card flex items-center justify-center text-primary font-bold text-sm">
                {(user?.name || 'G').charAt(0).toUpperCase()}
              </div>
              {unread > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-bg-card shadow-sm" />}
            </button>

            <AnimatePresence>
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-72 bg-bg-card border border-border-default rounded-2xl shadow-2xl shadow-black/60 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border-default flex items-center justify-between bg-bg-surface">
                      <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Notifications</h3>
                      {unread > 0 && <span className="text-[9px] font-bold bg-primary text-bg-primary px-2 py-0.5 rounded-full shadow-md">{unread} new</span>}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-text-muted">No notifications yet.</div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => { markNotificationRead(n.id); setShowNotifs(false) }}
                            className={`w-full text-left px-4 py-3 border-b border-border-default/40 hover:bg-white/[0.03] transition-colors ${!n.read ? 'bg-primary/[0.05]' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl mt-0.5">{n.icon || '🔔'}</span>
                              <div className="flex-1">
                                <p className="text-[12px] font-bold text-text-primary leading-tight mb-0.5">{n.title}</p>
                                <p className="text-[11px] text-text-muted leading-snug">{n.body}</p>
                                <p className="text-[9px] text-text-muted/60 mt-1.5">{n.time}</p>
                              </div>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0 shadow-[0_0_5px_rgba(212,175,55,0.5)]" />}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </header>
  )
}

