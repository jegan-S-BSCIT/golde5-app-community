import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'

const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 15 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.3 } 
})

function ProductImage({ src, alt, className = "" }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[#1A1A1A] flex items-center justify-center ${className}`}>
      {loading && !error && (
        <div className="absolute inset-0 shimmer bg-[#222] flex items-center justify-center">
          <div className="w-5 h-5 border border-[#FFB800]/25 border-t-[#FFB800] rounded-full animate-spin" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 bg-[#FFB800]/10 flex flex-col items-center justify-center border border-[#FFB800]/20 rounded-xl">
          <span className="text-2xl filter drop-shadow-md select-none">🪙</span>
          <span className="text-[8px] text-[#FFB800] uppercase font-bold tracking-widest mt-1">GOLDe5</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
    </div>
  )
}

export default function ShopPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [sortByPrice, setSortByPrice] = useState(false) // toggle low to high
  const { cart } = useAppStore()
  
  const products = [
    { id: 2, name: 'Augmont 0.1Gm Gold Coin', price: 1937.00, weight: '0.1g', img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400', type: 'Gold', category: 'Coins', badge: 'POPULAR' },
    { id: 3, name: 'Augmont 0.5Gm Gold Coin', price: 8351.00, weight: '0.5g', img: 'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400', type: 'Gold', category: 'Coins' },
    { id: 4, name: '1Gm Gold Coin', price: 16368.00, weight: '1g', img: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400', type: 'Gold', category: 'Coins' },
    { id: 5, name: 'AUGMONT 1G', price: 16368.00, weight: '1g', img: 'https://images.unsplash.com/photo-1574607383476-f517f562d47e?w=400', type: 'Gold', category: 'Coins', badge: 'EXCLUSIVE' },
    { id: 7, name: '10Gm Silver Coin', price: 3133.00, weight: '10g', img: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400', type: 'Silver', category: 'Coins' },
    { id: 8, name: '20Gm Silver Coin', price: 6266.00, weight: '20g', img: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400', type: 'Silver', category: 'Coins' },
    { id: 13, name: '50Gm Silver Bar', price: 15665.00, weight: '50g', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', type: 'Silver', category: 'Coins' },
    { id: 14, name: '100Gm Silver Bar', price: 31330.00, weight: '100g', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', type: 'Silver', category: 'Coins', badge: 'BESTSELLER' },
    { id: 9, name: 'Kalyan Jewellers Voucher', price: 5000.00, weight: 'Voucher', img: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400', type: 'Gold', category: 'Voucher', badge: 'JEWELLERY' },
    { id: 10, name: 'Caratlane E-Gift Card', price: 10000.00, weight: 'Voucher', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', type: 'Gold', category: 'Voucher' },
    { id: 11, name: 'Kalyan Gold Bracelet', price: 135000.00, weight: '20g', img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400', type: 'Gold', category: 'Designs', badge: 'HANDCRAFTED' },
    { id: 12, name: 'Caratlane Gold Chain', price: 70000.00, weight: '10g', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', type: 'Gold', category: 'Designs' }
  ]

  const renderProductIcon = (imgKey, type, name, category) => {
    if (category === 'Voucher') {
      return (
        <svg className="w-16 h-12 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="80" rx="10" fill="url(#voucherGrad)" />
          <rect x="5" y="5" width="90" height="70" rx="8" fill="none" stroke="#FFECA6" strokeWidth="0.8" opacity="0.3" />
          <text x="50" y="32" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
            GOLDe5
          </text>
          <text x="50" y="48" fill="#FFB800" fontSize="6.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">
            GIFT VOUCHER
          </text>
          <text x="50" y="62" fill="#FFF" fontSize="5" opacity="0.6" fontFamily="sans-serif" textAnchor="middle">
            Kalyan & Caratlane
          </text>
          <defs>
            <linearGradient id="voucherGrad" x1="0" y1="0" x2="100" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A1E00" />
              <stop offset="50%" stopColor="#0E0A00" />
              <stop offset="100%" stopColor="#4A3400" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
    const n = name.toLowerCase()
    if (n.includes('bar') || n.includes('1g') || n.includes('bracelet') || n.includes('chain')) {
      return type === 'Gold' ? <GoldBarIcon className="w-16 h-16" /> : <SilverBarIcon className="w-16 h-16" />
    }
    return type === 'Gold' ? <GoldCoinIcon className="w-16 h-16" /> : <SilverCoinIcon className="w-16 h-16" />
  }

  // Filter & Sort
  const processedProducts = useMemo(() => {
    let list = filter === 'All' ? products : products.filter(p => p.category === filter)
    if (sortByPrice) {
      list = [...list].sort((a, b) => a.price - b.price)
    }
    return list
  }, [filter, sortByPrice])

  return (
    <div className="space-y-5 pb-24 text-white bg-[#0B0B0B] min-h-screen font-sans -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#FFB800]/10 pb-4 mb-1">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] active:scale-95 transition-transform"
          >
            ←
          </button>
          <div>
            <h1 className="text-lg font-black text-white">GOLDe5 Shop</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Coins & Vouchers</p>
          </div>
        </div>
        
        {/* Right Header Icons */}
        <div className="flex items-center gap-3.5 text-gray-400">
          <button className="hover:text-white text-base" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }}>🔗</button>
          <button className="hover:text-white text-base" onClick={() => toast('Search active')}>🔍</button>
          <button className="hover:text-white relative text-lg" onClick={() => navigate('/checkout')}>
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FFB800] text-black font-extrabold text-[8px] rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Info Strip */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/20 rounded-xl p-2.5 text-[8.5px] text-[#FFB800] uppercase text-center font-bold tracking-wider leading-relaxed">
        Secure Home Delivery | 100% 999 Pure | Delivery within 10-14 days | Insured Shipping
      </div>

      {/* Live Price Bar */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-xl px-4 py-3 flex justify-between items-center text-[10.5px] font-bold">
        <div className="flex flex-col gap-0.5">
          <span className="text-[#FFB800]">Gold 24K: ₹15,550/gm (+0.24%)</span>
          <span className="text-gray-400">Silver: ₹3,133/10gm (-0.55%)</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0B0B0B] border border-[#FFB800]/10 px-2 py-1 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[8.5px] text-gray-500 uppercase tracking-widest font-black">Live</span>
        </div>
      </div>

      {/* Sort By Option & Filter Toggle */}
      <div className="flex items-center justify-between bg-[#1A1A1A] border border-[#FFB800]/10 rounded-xl px-4 py-2.5">
        <button 
          onClick={() => setSortByPrice(!sortByPrice)} 
          className="text-xs text-gray-400 font-bold flex items-center gap-1 hover:text-white"
        >
          <span>📶</span> Sort By Price: {sortByPrice ? 'Low to High' : 'Default'}
        </button>
        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Filters</span>
      </div>

      {/* Filter Tabs: [All] [Coins] [Voucher] [Designs] */}
      <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
        {['All', 'Coins', 'Voucher', 'Designs'].map(t => (
          <button 
            key={t} 
            onClick={() => setFilter(t)} 
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${filter === t ? 'bg-[#FFB800] text-black border-[#FFB800] shadow-md shadow-[#FFB800]/10' : 'bg-[#1A1A1A] text-gray-400 border-[#FFB800]/10 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* "Book Today, Buy Later!" Banner */}
      <motion.div {...fadeUp(0.1)} className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] border border-[#FFB800]/25 p-4.5 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black text-[#FFB800] uppercase tracking-wide">Book Today, Buy Later!</h3>
          <p className="text-[9.5px] text-gray-400 mt-1 max-w-[200px] leading-relaxed">
            Save on future Gold purchase by booking it at today's price
          </p>
        </div>
        <button 
          onClick={() => navigate('/portfolio')}
          className="h-[32px] px-3 bg-[#FFB800] text-black text-[9px] font-black rounded-lg whitespace-nowrap active:scale-95 transition-all uppercase"
        >
          Explore Products →
        </button>
      </motion.div>

      {/* Product Grid (2 columns) */}
      <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-3 pb-8">
        {processedProducts.map(p => (
          <div 
            key={p.id} 
            onClick={() => navigate(`/product/${p.id}`)} 
            className="bg-[#1A1A1A] rounded-2xl p-3.5 relative flex flex-col active:scale-[0.98] transition-all border border-[#FFB800]/10 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          >
            {/* Heart symbol */}
            <button 
              onClick={(e) => { e.stopPropagation(); toast.success('Added to Wishlist!') }} 
              className="absolute top-2.5 right-2.5 text-gray-500 hover:text-[#FFB800] z-10 text-base"
            >
              ♡
            </button>
            {p.badge && (
              <span className="absolute top-2.5 left-2.5 text-[7.5px] bg-[#FFB800] text-black font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                {p.badge}
              </span>
            )}
            
            {/* Product image container */}
            <div className="w-full aspect-square mb-3 mt-2">
              <ProductImage src={p.img} alt={p.name} className="w-full h-full rounded-xl" />
            </div>

            {/* Details */}
            <h4 className="text-xs font-bold mb-1 leading-snug line-clamp-2 text-white">{p.name}</h4>
            <p className="text-[9px] text-[#FFB800] font-semibold tracking-wider mb-2">{p.weight}</p>
            
            <p className="text-sm font-black text-white mt-auto pt-2 border-t border-[#FFB800]/10">
              ₹{p.price.toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </motion.div>

    </div>
  )
}
