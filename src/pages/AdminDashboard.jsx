import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { useNavigate } from 'react-router-dom'
import { CardSkeleton } from '../components/SkeletonLoader'
import toast from 'react-hot-toast'

// Generic Modal Component
function AdminModal({ title, onClose, children }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-lg max-h-[80vh] overflow-y-auto bg-bg-card rounded-2xl border border-border-default p-5 space-y-4"
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border-default pb-3 mb-2">
          <h3 className="text-base font-bold text-text-primary">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 text-text-muted">✕</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const { user, isAuthenticated, products } = useAppStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Modals state
  const [activeModal, setActiveModal] = useState(null) // 'users' | 'shop' | 'transactions' | 'config' | null

  // Simulated live stats
  const [stats, setStats] = useState({ totalUsers: 1542, totalAUM: 45000000, liveSips: 890 })

  // Mock list of users
  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Rahul Sharma', email: 'rahul@example.com', kyc: 'verified', aum: 125000 },
    { id: 'u2', name: 'Priya Patel', email: 'priya@example.com', kyc: 'pending', aum: 45000 },
    { id: 'u3', name: 'Amit Kumar', email: 'amit@example.com', kyc: 'verified', aum: 890000 },
  ])

  // System config state
  const [config, setConfig] = useState({ goldSpread: 3.5, silverSpread: 4.2, buyLimit: 500000 })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      setTimeout(() => setLoading(false), 800)
    }
  }, [isAuthenticated, navigate])

  const handleUpdateConfig = () => {
    toast.success('System configuration updated successfully', { icon: '⚙️' })
    setActiveModal(null)
  }

  const handleSuspendUser = (id) => {
    toast(`User suspended temporarily`, { icon: '🛑' })
  }

  if (loading) return <div className="p-5 space-y-4"><CardSkeleton /><CardSkeleton /></div>

  return (
    <div className="p-5 space-y-6 pb-24 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-text-primary">Admin Control Center</h1>
        <p className="text-sm text-text-muted">Platform Overview & Management</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-bg-card border border-border-default shadow-sm">
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Total Users</p>
          <p className="text-xl font-bold text-primary">{stats.totalUsers.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 rounded-xl bg-bg-card border border-border-default shadow-sm">
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Total AUM</p>
          <p className="text-xl font-bold text-success">₹{(stats.totalAUM / 10000000).toFixed(2)} Cr</p>
        </div>
        <div className="p-4 rounded-xl bg-bg-card border border-border-default shadow-sm col-span-2">
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-1">Active SIPs</p>
          <p className="text-xl font-bold text-text-primary">{stats.liveSips.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-3">
        <h2 className="text-sm font-bold text-text-primary">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setActiveModal('users')} className="py-3 rounded-xl bg-bg-surface border border-border-default text-sm font-semibold hover:border-primary hover:bg-primary/5 transition-colors text-text-primary">
            👥 Manage Users
          </button>
          <button onClick={() => setActiveModal('shop')} className="py-3 rounded-xl bg-bg-surface border border-border-default text-sm font-semibold hover:border-primary hover:bg-primary/5 transition-colors text-text-primary">
            🛍️ Update Shop
          </button>
          <button onClick={() => setActiveModal('transactions')} className="py-3 rounded-xl bg-bg-surface border border-border-default text-sm font-semibold hover:border-primary hover:bg-primary/5 transition-colors text-text-primary">
            📊 View Transactions
          </button>
          <button onClick={() => setActiveModal('config')} className="py-3 rounded-xl bg-bg-surface border border-border-default text-sm font-semibold hover:border-primary hover:bg-primary/5 transition-colors text-text-primary">
            ⚙️ System Config
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'users' && (
          <AdminModal title="User Management" onClose={() => setActiveModal(null)}>
            <div className="space-y-3">
              <input type="text" placeholder="Search by name, email, or UID..." className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-2 text-sm outline-none mb-2" />
              {usersList.map(u => (
                <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-surface border border-border-default">
                  <div>
                    <p className="text-sm font-bold text-text-primary">{u.name}</p>
                    <p className="text-[10px] text-text-muted">{u.email} · AUM: ₹{u.aum.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${u.kyc === 'verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{u.kyc.toUpperCase()}</span>
                    <button onClick={() => handleSuspendUser(u.id)} className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold rounded hover:bg-error/20">Suspend</button>
                  </div>
                </div>
              ))}
            </div>
          </AdminModal>
        )}

        {activeModal === 'shop' && (
          <AdminModal title="Shop Management" onClose={() => setActiveModal(null)}>
            <div className="space-y-3">
              <p className="text-xs text-text-muted mb-2">Adjust stock and product visibility.</p>
              {products.slice(0,4).map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-surface border border-border-default">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.img}</span>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{p.name}</p>
                      <p className="text-[10px] text-text-muted">Stock: {p.stock}</p>
                    </div>
                  </div>
                  <button onClick={() => toast.success('Stock replenished!')} className="text-[10px] px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary/10 font-bold transition-all">Add +50</button>
                </div>
              ))}
              <button className="w-full py-2.5 rounded-xl border border-dashed border-border-default hover:border-primary text-xs text-primary font-bold">+ Add New Product</button>
            </div>
          </AdminModal>
        )}

        {activeModal === 'transactions' && (
          <AdminModal title="Live Transactions" onClose={() => setActiveModal(null)}>
            <div className="text-center py-6">
              <span className="w-2 h-2 rounded-full bg-success inline-block animate-pulse mb-2" />
              <p className="text-sm text-text-primary font-bold">Listening to live network events...</p>
              <p className="text-xs text-text-muted mt-1">Global transaction feed (simulated)</p>
            </div>
            <div className="space-y-2 opacity-60">
              <div className="p-3 bg-bg-surface rounded-xl flex justify-between items-center"><span className="text-xs">User #9122 bought 2.5g Gold</span><span className="text-xs text-success font-bold">+₹22,500</span></div>
              <div className="p-3 bg-bg-surface rounded-xl flex justify-between items-center"><span className="text-xs">User #4410 started SIP</span><span className="text-xs text-primary font-bold">₹5,000/mo</span></div>
              <div className="p-3 bg-bg-surface rounded-xl flex justify-between items-center"><span className="text-xs">User #8821 sold 10g Silver</span><span className="text-xs text-warning font-bold">-₹850</span></div>
            </div>
          </AdminModal>
        )}

        {activeModal === 'config' && (
          <AdminModal title="System Configuration" onClose={() => setActiveModal(null)}>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Gold Buy/Sell Spread (%)</label>
                <input type="number" step="0.1" value={config.goldSpread} onChange={e => setConfig({...config, goldSpread: e.target.value})} className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-2 text-sm text-text-primary outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Silver Buy/Sell Spread (%)</label>
                <input type="number" step="0.1" value={config.silverSpread} onChange={e => setConfig({...config, silverSpread: e.target.value})} className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-2 text-sm text-text-primary outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Daily KYC-Free Buy Limit (₹)</label>
                <input type="number" value={config.buyLimit} onChange={e => setConfig({...config, buyLimit: e.target.value})} className="w-full bg-bg-input border border-border-default rounded-xl px-4 py-2 text-sm text-text-primary outline-none focus:border-primary" />
              </div>
              <button onClick={handleUpdateConfig} className="w-full py-3 rounded-xl bg-primary text-bg-primary font-bold text-sm hover:bg-primary-dark transition-all mt-4">
                Save Configuration
              </button>
            </div>
          </AdminModal>
        )}
      </AnimatePresence>
    </div>
  )
}
