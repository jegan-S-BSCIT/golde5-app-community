import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PriceTick, ChangeIndicator } from './SkeletonLoader'

const navItems = [
  { path: '/portfolio', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { path: '/sip', label: 'SIP', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { path: '/shop', label: 'Shop', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { path: '/checkout', label: 'Checkout', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z' },
  { path: '/more', label: 'More', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()
  const { prices, priceLoading, getGoldChange, user } = useAppStore()
  const goldChange = priceLoading ? null : getGoldChange()
  const isAdmin = user?.role === 'admin' || user?.uid === 'admin_test'
  
  const items = isAdmin ? [...navItems, { path: '/admin', label: 'Admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }] : navItems

  return (
    <aside className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-bg-secondary border-r border-border-default z-40 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      {/* Brand */}
      <div className="h-14 flex items-center px-4 border-b border-border-default">
        <button onClick={onToggle} className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shadow-lg shrink-0">
            <span className="text-white font-extrabold text-sm">G5</span>
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-base font-extrabold tracking-tight gold-gradient-text leading-none">GOLDe5</h1>
              <p className="text-[9px] text-text-muted tracking-widest uppercase">Digital Gold</p>
            </motion.div>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {!collapsed && <p className="px-3 mb-2 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Menu</p>}
        {items.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          return (
            <NavLink key={item.path} to={item.path} title={item.label}
              className={`relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 no-select ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'} ${isActive ? 'text-primary bg-primary/8' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'}`}
            >
              {isActive && <motion.div layoutId="sidebarIndicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Live Gold Price */}
      {!collapsed && (
        <div className="mx-2 mb-2 p-3 rounded-xl bg-bg-card border border-border-default">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Live Gold</p>
            <span className="flex items-center gap-1 text-[8px] text-text-muted"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />LIVE</span>
          </div>
          {priceLoading ? (
            <div className="shimmer h-5 w-20 rounded" />
          ) : (
            <>
              <PriceTick value={prices.gold24k} prevValue={prices.gold24kPrev} size="text-base" />
              <span className="text-[10px] text-text-muted">/g</span>
              {goldChange && <div className="mt-0.5"><ChangeIndicator change={goldChange.change} pct={goldChange.pct} size="text-[9px]" /></div>}
            </>
          )}
        </div>
      )}

      {/* User */}
      <div className={`border-t border-border-default ${collapsed ? 'px-2 py-3' : 'px-3 py-3'}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-1'}`}>
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-text-primary truncate">{user.name}</p>
              <p className="text-[10px] text-text-muted">Verified ✓</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
