import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

const mockOrders = [
  {
    id: 'G5-ORD-88219',
    type: 'gold',
    title: 'GOLDe5 24K Gold Coin (1Gm)',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200',
    date: 'May 19, 2026',
    price: 8420,
    qty: 1,
    status: 'Active',
    step: 2, // Dispatched
    timeline: [
      { title: 'Order Placed', desc: 'May 19, 10:14 AM', done: true },
      { title: 'Payment Confirmed', desc: 'May 19, 10:15 AM', done: true },
      { title: 'Dispatched', desc: 'May 20, 04:30 PM', done: true },
      { title: 'Out for Delivery', desc: 'In Transit', done: false },
      { title: 'Delivered', desc: 'Pending delivery', done: false }
    ]
  },
  {
    id: 'G5-ORD-77102',
    type: 'silver',
    title: 'GOLDe5 999 Fine Silver Bar (100Gm)',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200',
    date: 'May 12, 2026',
    price: 11500,
    qty: 1,
    status: 'Delivered',
    step: 4, // Delivered
    timeline: [
      { title: 'Order Placed', desc: 'May 12, 02:20 PM', done: true },
      { title: 'Payment Confirmed', desc: 'May 12, 02:22 PM', done: true },
      { title: 'Dispatched', desc: 'May 13, 11:00 AM', done: true },
      { title: 'Out for Delivery', desc: 'May 15, 09:15 AM', done: true },
      { title: 'Delivered', desc: 'May 15, 03:45 PM', done: true }
    ]
  },
  {
    id: 'G5-ORD-61205',
    type: 'gold',
    title: 'GOLDe5 24K Gold Bar (5Gm)',
    image: 'https://images.unsplash.com/photo-1574607383476-f517f562d47e?w=200',
    date: 'Apr 28, 2026',
    price: 41200,
    qty: 1,
    status: 'Cancelled',
    step: 1, // Cancelled after Payment
    timeline: [
      { title: 'Order Placed', desc: 'Apr 28, 09:00 AM', done: true },
      { title: 'Payment Failed / Cancelled', desc: 'Refund Initiated', done: true, isError: true }
    ]
  }
]

export default function OrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Active') // 'Active', 'Delivered', 'Cancelled'
  const [trackingOrderId, setTrackingOrderId] = useState(null)

  const { transactions } = useAppStore()

  const orderTransactions = (transactions || [])
    .filter(t => t.isOrder || (t.type === 'buy' && t.orderId))
    .map(t => {
      const firstItem = t.orderItems?.[0] || { name: t.title || 'GOLDe5 Item', img: '🪙', price: Math.abs(t.amount), qty: 1 }
      const totalQty = t.orderItems ? t.orderItems.reduce((sum, item) => sum + item.qty, 0) : 1
      return {
        id: t.orderId || `G5-ORD-${t.id}`,
        type: firstItem.category || 'gold',
        title: t.orderItems ? t.orderItems.map(item => `${item.name} (x${item.qty})`).join(', ') : (t.title || 'GOLDe5 Purchase'),
        image: firstItem.img && typeof firstItem.img === 'string' && firstItem.img.length > 4 ? firstItem.img : 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200', // default fallback
        emoji: firstItem.img || '🪙',
        date: t.date || 'Today',
        price: Math.abs(t.amount),
        qty: totalQty,
        status: t.status || 'Active',
        step: t.step !== undefined ? t.step : 1,
        timeline: t.timeline || [
          { title: 'Order Placed', desc: t.date || 'Today', done: true },
          { title: 'Payment Confirmed', desc: 'Completed', done: true },
          { title: 'Dispatched', desc: 'Pending', done: false },
          { title: 'Out for Delivery', desc: 'In Transit', done: false },
          { title: 'Delivered', desc: 'Pending delivery', done: false }
        ]
      }
    })

  const allOrders = [...orderTransactions, ...mockOrders]
  const filteredOrders = allOrders.filter(o => o.status === activeTab)

  const toggleTracking = (orderId) => {
    if (trackingOrderId === orderId) {
      setTrackingOrderId(null)
    } else {
      setTrackingOrderId(orderId)
    }
  }

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
          My Orders
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#1A1A1A] p-1 border border-[#FFB800]/10 rounded-xl">
        {['Active', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setTrackingOrderId(null) }}
            className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors relative ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-white'}`}
          >
            {activeTab === tab && (
              <motion.div 
                layoutId="activeOrderTab"
                className="absolute inset-0 bg-[#FFB800] rounded-lg -z-10"
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-10">{tab} Orders</span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-[#1A1A1A] rounded-2xl border border-[#FFB800]/5 text-gray-500">
            <span className="text-3xl block mb-2">📦</span>
            <p className="text-xs font-bold uppercase tracking-wider">No {activeTab} Orders Found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-2xl p-4.5 space-y-4 shadow-md"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-[#FFB800]/10 pb-3">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{order.id}</p>
                  <p className="text-[9px] text-[#FFB800] font-black uppercase tracking-widest mt-0.5">{order.date}</p>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  order.status === 'Active' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25' :
                  order.status === 'Delivered' ? 'text-green-400 bg-green-500/10 border-green-500/25' :
                  'text-red-400 bg-red-500/10 border-red-500/25'
                }`}>
                  {order.status}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex gap-3">
                <div className="w-[50px] h-[50px] rounded-xl overflow-hidden bg-[#0B0B0B] border border-[#FFB800]/10 shrink-0 flex items-center justify-center text-2xl">
                  {order.image && order.image.startsWith('http') ? (
                    <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                  ) : (
                    <span>{order.emoji || '🪙'}</span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-xs font-bold text-white leading-snug">{order.title}</h3>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span>Qty: {order.qty}</span>
                    <span className="font-extrabold text-[#FFB800] text-xs">₹{order.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action and Tracking Section */}
              <div className="pt-2">
                <button
                  onClick={() => toggleTracking(order.id)}
                  className="w-full h-[36px] bg-transparent border border-[#FFB800]/25 hover:bg-[#FFB800]/5 text-[#FFB800] text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>📍</span> {trackingOrderId === order.id ? 'Hide Tracking Details' : 'Track Order / Details'}
                </button>

                {/* Animated Timeline Stepper */}
                <AnimatePresence>
                  {trackingOrderId === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-4 border-t border-[#FFB800]/10 pt-4"
                    >
                      <h4 className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest mb-3.5">Shipping Timeline</h4>
                      
                      <div className="relative pl-6 space-y-5 border-l border-[#FFB800]/15 ml-2.5">
                        {order.timeline.map((step, idx) => {
                          const isActive = idx <= order.step
                          return (
                            <div key={idx} className="relative">
                              {/* Step dot indicator */}
                              <div className={`absolute -left-[31px] w-3 h-3 rounded-full border-2 ${
                                step.isError ? 'bg-red-500 border-red-500' :
                                isActive ? 'bg-[#FFB800] border-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.5)]' : 'bg-[#0B0B0B] border-[#FFB800]/20'
                              }`} />
                              <div className="space-y-0.5">
                                <p className={`text-xs font-bold leading-none ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                  {step.title}
                                </p>
                                <p className="text-[9px] text-gray-500 font-medium">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          ))
        )}
      </div>

    </motion.div>
  )
}
