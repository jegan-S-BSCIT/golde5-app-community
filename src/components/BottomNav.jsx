import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

const tabs = [
  { path: '/portfolio', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { path: '/sip', label: 'SIP', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { path: '/shop', label: 'Shop', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', hasBadge: true },
  { path: '/more', label: 'More', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export default function BottomNav() {
  const location = useLocation()
  const { cart } = useAppStore()
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 max-w-[398px] mx-auto">
      <div className="bg-[#1A1A1A]/90 backdrop-blur-xl border border-[#FFB800]/15 shadow-xl rounded-[20px] overflow-hidden">
        <div className="flex items-center justify-around h-[64px] px-2 relative">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/')
            return (
              <NavLink 
                key={tab.path} 
                to={tab.path} 
                className="relative flex flex-col items-center justify-center gap-1 w-16 h-full select-none z-10 transition-transform active:scale-95"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 bg-[#FFB800]/5 rounded-[12px] m-1 border border-[#FFB800]/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                
                <div className="relative flex items-center justify-center">
                  <svg 
                    className={`w-[20px] h-[20px] transition-colors duration-200 ${isActive ? 'text-[#FFB800]' : 'text-gray-500'}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={isActive ? 2.5 : 1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  
                  {tab.hasBadge && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] bg-[#FFB800] text-[8px] font-black text-black rounded-full flex items-center justify-center px-0.5 shadow-md shadow-[#FFB800]/10">
                      {cartCount}
                    </span>
                  )}
                </div>
                
                <span className={`text-[9px] font-extrabold tracking-wider transition-colors duration-200 uppercase ${isActive ? 'text-[#FFB800]' : 'text-gray-500'}`}>
                  {tab.label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
