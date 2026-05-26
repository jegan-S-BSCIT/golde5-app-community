import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function NomineePage() {
  const navigate = useNavigate()

  // Form Fields State
  const [fullName, setFullName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [dob, setDob] = useState('')
  const [mobile, setMobile] = useState('')
  const [aadhaar, setAadhaar] = useState('')

  // Load from localStorage
  useEffect(() => {
    const savedNominee = localStorage.getItem('user_nominee')
    if (savedNominee) {
      try {
        const data = JSON.parse(savedNominee)
        if (data.fullName) setFullName(data.fullName)
        if (data.relationship) setRelationship(data.relationship)
        if (data.dob) setDob(data.dob)
        if (data.mobile) setMobile(data.mobile)
        if (data.aadhaar) setAadhaar(data.aadhaar)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()

    if (!fullName.trim()) {
      toast.error('Nominee Full Name is required')
      return
    }
    if (!relationship) {
      toast.error('Please select relationship')
      return
    }
    if (!dob) {
      toast.error('Nominee Date of Birth is required')
      return
    }
    if (!mobile.match(/^[0-9]{10}$/)) {
      toast.error('Enter a valid 10-digit mobile number')
      return
    }
    if (!aadhaar.match(/^[0-9]{12}$/)) {
      toast.error('Enter a valid 12-digit Aadhaar number')
      return
    }

    const nomineeData = {
      fullName,
      relationship,
      dob,
      mobile,
      aadhaar
    }

    localStorage.setItem('user_nominee', JSON.stringify(nomineeData))
    toast.success('Nominee details updated successfully ✓')
    setTimeout(() => navigate('/more'), 800)
  }

  // Format Aadhaar visually while typing (or input masking)
  const handleAadhaarChange = (val) => {
    // Only allow digits up to 12 length
    const clean = val.replace(/\D/g, '').slice(0, 12)
    setAadhaar(clean)
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
          Nominee Details
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Nominee Full Name</label>
          <input 
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Nominee's legal name"
            className="w-full h-[50px] px-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors"
          />
        </div>

        {/* Relationship */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Relationship</label>
          <div className="relative">
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full h-[50px] px-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold focus:outline-none focus:border-[#FFB800]/40 appearance-none transition-colors"
            >
              <option value="" disabled className="bg-[#1A1A1A]">Select relationship</option>
              <option value="Spouse" className="bg-[#1A1A1A]">Spouse</option>
              <option value="Mother" className="bg-[#1A1A1A]">Mother</option>
              <option value="Father" className="bg-[#1A1A1A]">Father</option>
              <option value="Brother" className="bg-[#1A1A1A]">Brother</option>
              <option value="Sister" className="bg-[#1A1A1A]">Sister</option>
              <option value="Son" className="bg-[#1A1A1A]">Son</option>
              <option value="Daughter" className="bg-[#1A1A1A]">Daughter</option>
              <option value="Others" className="bg-[#1A1A1A]">Others</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Nominee Date of Birth</label>
          <input 
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full h-[50px] px-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold focus:outline-none focus:border-[#FFB800]/40 transition-colors"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Nominee Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">+91</span>
            <input 
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit number"
              className="w-full h-[50px] pl-14 pr-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors"
            />
          </div>
        </div>

        {/* Aadhaar Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Nominee Aadhaar Number</label>
          <input 
            type="text"
            value={aadhaar}
            onChange={(e) => handleAadhaarChange(e.target.value)}
            placeholder="12-digit Aadhaar number"
            className="w-full h-[50px] px-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors tracking-widest"
          />
          {aadhaar.length > 0 && (
            <p className="text-[10px] text-gray-400 font-mono tracking-wider pt-0.5">
              Visual mask: XXXX - XXXX - {aadhaar.slice(-4) || 'XXXX'}
            </p>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full h-[48px] mt-6 bg-[#FFB800] hover:bg-[#D4A017] active:scale-[0.98] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-[#FFB800]/10 flex items-center justify-center gap-2"
        >
          Save Nominee Details
        </button>
      </form>

      {/* Regulatory Info Box */}
      <div className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-2xl p-4.5 mt-4 flex gap-3">
        <span className="text-xl shrink-0">🛡</span>
        <div className="space-y-1 text-left">
          <h4 className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">Regulatory Security</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
            As per regulatory guidelines, adding a nominee secures your digital gold and silver investments. This ensures a seamless claim transfer process to your loved ones in case of unforeseen events.
          </p>
        </div>
      </div>

    </motion.div>
  )
}
