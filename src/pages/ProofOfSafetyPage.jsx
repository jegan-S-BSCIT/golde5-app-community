import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.3 } })

export default function ProofOfSafetyPage() {
  const navigate = useNavigate()

  const partners = [
    { title: 'Vault Partner', name: "Brink's / Sequel Logistics / Loomis", desc: 'Your gold is safely stored in secure vaults.', icon: '🏛️' },
    { title: 'Gold Partner', name: 'Augmont / MMTC-PAMP / SafeGold', desc: 'Sourced from leading gold refineries.', icon: '🥇' },
    { title: 'Insurance Partner', name: "New India Assurance / Lloyd's", desc: 'Your gold is fully insured and protected.', icon: '🔒' },
    { title: 'Tax Filing Partner', name: 'ClearTax / CA / Fintech', desc: 'Easily report capital gains during ITR filing.', icon: '📊' },
    { title: 'Jewellery Partner', name: 'Caratlane / Kalyan', desc: 'Turn your digital gold into jewellery anytime.', icon: '💍' },
  ]

  const docs = [
    'GST Invoice', 'Purity Certificate', 'Monthly Statement', 'Annual Reports & Tax Statements'
  ]

  return (
    <div className="space-y-6 pb-[100px] font-sora text-white bg-[#0A0A0A] min-h-screen -m-4 p-4">
      
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-xl active:scale-95 transition-transform">
          ←
        </button>
        <div className="flex-1 text-center mr-10">
          <h1 className="font-bold text-lg text-[#F5C842] flex items-center justify-center gap-2">
            🛡️ Proof of Safety
          </h1>
          <p className="text-[10px] text-gray-400 mt-0.5 tracking-widest uppercase">Storage Certificate</p>
        </div>
      </div>

      <motion.div {...fadeUp(0)} className="space-y-4">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Trusted Partners</h2>
        {partners.map((p, i) => (
          <div key={i} className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl flex gap-4 items-center hover:border-[#D4A017]/50 transition-colors">
            <div className="min-w-[48px] h-12 bg-[#111] border border-[#222] rounded-lg flex items-center justify-center text-2xl shadow-inner">
              {p.icon}
            </div>
            <div>
              <p className="text-[9px] text-[#F5C842] uppercase font-bold tracking-wider">{p.title}</p>
              <p className="font-bold text-[12px] my-1 leading-snug">{p.name}</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="pt-2">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Proof of Purchase & Ownership</h2>
        <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden divide-y divide-[#333]">
          {docs.map(d => (
            <div key={d} className="flex justify-between items-center px-4 py-4 active:bg-[#222] transition-colors cursor-pointer">
              <span className="text-[12px] font-bold text-gray-200">{d}</span>
              <span className="text-[#F5C842] text-lg hover:scale-110 transition-transform">⬇</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}
