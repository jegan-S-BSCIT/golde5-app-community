import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'

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

const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 15 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.3 } 
})

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  
  // Delivery section state
  const [pincode, setPincode] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState(null)
  
  const { addToCart, cart } = useAppStore()

  // Full product catalog mapped for detail screen
  const products = [
    { 
      id: 2, 
      name: 'Augmont 0.1Gm Gold Coin (999 Purity)', 
      price: 1937.00, 
      weight: '0.1g', 
      type: 'Gold', 
      sku: 'AUG-GLD-01', 
      purity: '24K (999.9)', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400'
      ]
    },
    { 
      id: 3, 
      name: 'Augmont 0.5Gm Gold Coin (999 Purity)', 
      price: 8351.00, 
      weight: '0.5g', 
      type: 'Gold', 
      sku: 'AUG-GLD-05', 
      purity: '24K (999.9)', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400'
      ]
    },
    { 
      id: 4, 
      name: '1Gm Gold Coin (999 Purity)', 
      price: 16368.00, 
      weight: '1g', 
      type: 'Gold', 
      sku: 'AUG-GLD-10', 
      purity: '24K (999.9)', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400'
      ]
    },
    { 
      id: 5, 
      name: 'AUGMONT 1G Bar', 
      price: 16368.00, 
      weight: '1g', 
      type: 'Gold', 
      sku: 'AUG-BAR-10', 
      purity: '24K (999.9)', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1574607383476-f517f562d47e?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400'
      ]
    },
    { 
      id: 7, 
      name: '10Gm Silver Coin (999 Purity)', 
      price: 3133.00, 
      weight: '10g', 
      type: 'Silver', 
      sku: 'AUG-SLV-10', 
      purity: '999 Fine', 
      isSilver: true,
      images: [
        'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400'
      ]
    },
    { 
      id: 8, 
      name: '20Gm Silver Coin (999 Purity)', 
      price: 6266.00, 
      weight: '20g', 
      type: 'Silver', 
      sku: 'AUG-SLV-20', 
      purity: '999 Fine', 
      isSilver: true,
      images: [
        'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400'
      ]
    },
    { 
      id: 13, 
      name: '50Gm Silver Bar (999 Purity)', 
      price: 15665.00, 
      weight: '50g', 
      type: 'Silver', 
      sku: 'AUG-SLV-50', 
      purity: '999 Fine', 
      isSilver: true,
      images: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400'
      ]
    },
    { 
      id: 14, 
      name: '100Gm Silver Bar (999 Purity)', 
      price: 31330.00, 
      weight: '100g', 
      type: 'Silver', 
      sku: 'AUG-SLV-100', 
      purity: '999 Fine', 
      isSilver: true,
      images: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400'
      ]
    },
    { 
      id: 9, 
      name: 'Kalyan Jewellers Voucher', 
      price: 5000.00, 
      weight: 'Voucher', 
      type: 'Gold', 
      sku: 'KLY-VCH-5K', 
      purity: 'Jewellery Value', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
        'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400'
      ]
    },
    { 
      id: 10, 
      name: 'Caratlane E-Gift Card', 
      price: 10000.00, 
      weight: 'Voucher', 
      type: 'Gold', 
      sku: 'CRT-VCH-10K', 
      purity: 'Jewellery Value', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400'
      ]
    },
    { 
      id: 11, 
      name: 'Kalyan Gold Bracelet', 
      price: 135000.00, 
      weight: '20g', 
      type: 'Gold', 
      sku: 'KLY-BRC-20', 
      purity: '22K (916)', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400'
      ]
    },
    { 
      id: 12, 
      name: 'Caratlane Gold Chain', 
      price: 70000.00, 
      weight: '10g', 
      type: 'Gold', 
      sku: 'CRT-CHN-10', 
      purity: '22K (916)', 
      isSilver: false,
      images: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
        'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400',
        'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400'
      ]
    }
  ]

  // Find current product or fallback
  const product = products.find(p => p.id === Number(id)) || products[0]
  const isSilver = product.isSilver
  const isBar = product.name.toLowerCase().includes('bar') || product.name.toLowerCase().includes('bracelet') || product.name.toLowerCase().includes('chain')

  const renderDetailIcon = (imgIndex) => {
    if (imgIndex === 2) {
      return isSilver ? <SilverBarIcon className="w-40 h-40" /> : <GoldBarIcon className="w-40 h-40" />
    }
    if (isSilver) {
      return isBar ? <SilverBarIcon className="w-40 h-40" /> : <SilverCoinIcon className="w-40 h-40" />
    } else {
      return isBar ? <GoldBarIcon className="w-40 h-40" /> : <GoldCoinIcon className="w-40 h-40" />
    }
  }

  // Delivery pincode check logic
  const handleCheckDelivery = (e) => {
    e.preventDefault()
    if (pincode.length < 6) {
      toast.error('Enter a valid 6-digit Pincode')
      setDeliveryStatus(null)
      return
    }
    setDeliveryStatus({
      available: true,
      message: '✓ Delivery is available. Estimated shipping: 10-14 days.'
    })
    toast.success('Pincode verified!')
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      desc: `${product.purity} Pure Certified ${product.type}`,
      category: isSilver ? 'silver' : 'gold',
      priceMultiplier: 1,
      unit: 'each',
      badge: 'Certified',
      img: isSilver ? '🪩' : '🥇',
      stock: 25,
      customPrice: product.price
    })
    toast.success('Added to Cart!')
  }

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      desc: `${product.purity} Pure Certified ${product.type}`,
      category: isSilver ? 'silver' : 'gold',
      priceMultiplier: 1,
      unit: 'each',
      badge: 'Certified',
      img: isSilver ? '🪩' : '🥇',
      stock: 25,
      customPrice: product.price
    })
    navigate('/checkout')
  }

  return (
    <div className="space-y-6 pb-28 font-sans text-white bg-[#0B0B0B] min-h-screen -m-4 p-4 max-w-[430px] mx-auto overflow-x-hidden relative">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-[#FFB800]/10 pb-4 mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/25 flex items-center justify-center text-[#FFB800] active:scale-95 transition-all"
        >
          ←
        </button>
        <h1 className="font-extrabold text-sm truncate max-w-[200px]">
          Product Details
        </h1>
        <button className="relative" onClick={() => navigate('/checkout')}>
          <span className="text-xl">🛒</span>
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#FFB800] text-black font-extrabold text-[8px] rounded-full w-4 h-4 flex items-center justify-center shadow-md">
              {cart.reduce((sum, item) => sum + item.qty, 0)}
            </span>
          )}
        </button>
      </div>

      {/* 3-Image Carousel */}
      <motion.div {...fadeUp(0)} className="w-full relative">
        <div className="h-64 bg-[#1A1A1A] rounded-[24px] border border-[#FFB800]/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeImg} 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full"
            >
              <ProductImage src={product.images ? product.images[activeImg] : 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400'} alt={`${product.name} view ${activeImg + 1}`} className="w-full h-full" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 right-4 bg-[#0B0B0B]/85 px-3 py-1 rounded-full border border-[#FFB800]/25 text-[9px] font-extrabold text-[#FFB800] z-10 uppercase tracking-widest">
            {product.purity}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-3.5">
          {[0, 1, 2].map(i => (
            <button 
              key={i} 
              onClick={() => setActiveImg(i)} 
              className={`w-2.5 h-2.5 rounded-full transition-all ${activeImg === i ? 'w-6 bg-[#FFB800]' : 'bg-gray-700'}`} 
            />
          ))}
        </div>
      </motion.div>

      {/* Info Header */}
      <motion.div {...fadeUp(0.1)} className="space-y-2">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          Powered by Augmont & Partner Brands
        </p>
        <h2 className="text-xl font-black text-white leading-tight">
          {product.name}
        </h2>
        <p className="text-xl font-black text-[#FFB800]">
          ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          <span className="text-[10px] text-gray-500 font-medium ml-1.5">(MRP inclusive of all taxes)</span>
        </p>
      </motion.div>

      {/* View Authenticity Certificate link */}
      <motion.div {...fadeUp(0.15)} className="text-left">
        <button 
          onClick={() => setModalOpen(true)} 
          className="text-[#FFB800] text-xs font-bold underline decoration-[#FFB800]/50 underline-offset-4 hover:text-white"
        >
          View Authenticity Certificate
        </button>
      </motion.div>

      {/* Properties Table */}
      <motion.div {...fadeUp(0.2)} className="space-y-3 bg-[#1A1A1A] p-4.5 rounded-2xl border border-[#FFB800]/10">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Product Properties</h3>
        <table className="w-full text-xs text-left border-collapse">
          <tbody>
            <tr className="border-b border-[#FFB800]/10">
              <td className="py-2.5 text-gray-500 font-semibold">SKU</td>
              <td className="py-2.5 text-right font-black text-white">{product.sku}</td>
            </tr>
            <tr className="border-b border-[#FFB800]/10">
              <td className="py-2.5 text-gray-500 font-semibold">Metal Type</td>
              <td className="py-2.5 text-right font-black text-white">{product.type}</td>
            </tr>
            <tr>
              <td className="py-2.5 text-gray-500 font-semibold">Metal Purity</td>
              <td className="py-2.5 text-right font-black text-[#FFB800]">{product.purity}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Delivery Section */}
      <motion.div {...fadeUp(0.25)} className="space-y-3 bg-[#1A1A1A] p-4.5 rounded-2xl border border-[#FFB800]/10">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Check Delivery Serviceability</h3>
        <form onSubmit={handleCheckDelivery} className="flex gap-2">
          <input 
            type="text" 
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter Delivery Pincode"
            className="flex-1 bg-[#0B0B0B] border border-[#FFB800]/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 outline-none focus:border-[#FFB800]"
          />
          <button 
            type="submit"
            className="bg-[#FFB800] hover:bg-[#D4A017] text-black font-extrabold text-xs px-4 rounded-xl active:scale-95 transition-transform"
          >
            Check
          </button>
        </form>
        {deliveryStatus && (
          <p className="text-[11px] font-semibold text-green-400">
            {deliveryStatus.message}
          </p>
        )}
      </motion.div>

      {/* Bottom Sticky Action Bar: Cart Icon + Buy Now Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0B0B0B]/95 border-t border-[#FFB800]/10 z-50 flex items-center gap-3 max-w-[430px] mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <button 
          onClick={handleAddToCart}
          className="w-[52px] h-[48px] bg-[#1A1A1A] border border-[#FFB800]/25 rounded-[12px] flex items-center justify-center text-lg active:scale-95 transition-transform text-white"
        >
          🛒
        </button>
        <button 
          onClick={handleBuyNow}
          className="flex-1 h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black rounded-[12px] font-bold text-sm shadow-md shadow-[#FFB800]/15 active:scale-95 transition-transform"
        >
          Buy Now
        </button>
      </div>

      {/* Authenticity Certificate Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/85 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-[#1A1A1A] w-full max-w-sm rounded-[24px] border border-[#FFB800] p-6 relative shadow-2xl"
          >
            <button 
              onClick={() => setModalOpen(false)} 
              className="absolute top-4 right-4 w-8 h-8 bg-[#0B0B0B] border border-[#FFB800]/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-[#FFB800] text-lg font-black tracking-wider uppercase">Augmont Gold</h2>
              <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Certificate of Authenticity</p>
            </div>
            
            <div className="space-y-4 text-xs bg-[#0B0B0B] border border-[#FFB800]/10 p-4 rounded-xl">
              <div className="flex justify-between border-b border-[#FFB800]/10 pb-2">
                <span className="text-gray-500">Metal Type:</span>
                <span className="font-bold text-[#FFB800]">{isSilver ? 'Silver = 999' : 'Gold = 24K'}</span>
              </div>
              <div className="flex justify-between border-b border-[#FFB800]/10 pb-2">
                <span className="text-gray-500">Metal Fineness:</span>
                <span className="font-bold text-white">999</span>
              </div>
              <div className="pt-2 text-center flex justify-around items-center">
                <div className="w-12 h-12 bg-[#1A1A1A] border border-[#FFB800]/10 rounded flex items-center justify-center text-[9px] font-black text-[#FFB800]">BIS</div>
                <div className="w-12 h-12 bg-[#1A1A1A] border border-[#FFB800]/10 rounded flex items-center justify-center text-[9px] font-black text-[#FFB800]">IGD</div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-[9px] text-gray-500 uppercase tracking-wider space-y-1">
              <p>✓ BIS Hallmarked Refinery</p>
              <p>✓ MMTC-PAMP & Augmont Sourced</p>
              <p>✓ IGD Certifications Standard</p>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  )
}
