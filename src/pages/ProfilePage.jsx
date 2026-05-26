import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  // Fields
  const [name, setName] = useState('Rahul Sharma')
  const [email, setEmail] = useState('rahul.sharma@example.com')
  const [dob, setDob] = useState('1995-08-15')
  const [gender, setGender] = useState('Male')
  const [address, setAddress] = useState('123, Gold Heights, Financial District')
  const [city, setCity] = useState('Mumbai')
  const [state, setState] = useState('Maharashtra')
  const [pincode, setPincode] = useState('400001')
  const [avatar, setAvatar] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile')
    if (savedProfile) {
      try {
        const data = JSON.parse(savedProfile)
        if (data.name) setName(data.name)
        if (data.email) setEmail(data.email)
        if (data.dob) setDob(data.dob)
        if (data.gender) setGender(data.gender)
        if (data.address) setAddress(data.address)
        if (data.city) setCity(data.city)
        if (data.state) setState(data.state)
        if (data.pincode) setPincode(data.pincode)
      } catch (e) {
        console.error(e)
      }
    }

    const savedAvatar = localStorage.getItem('user_avatar')
    if (savedAvatar) {
      setAvatar(savedAvatar)
    }
  }, [])

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be under 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
        localStorage.setItem('user_avatar', reader.result)
        toast.success('Avatar updated!')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Full Name is required')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Valid Email Address is required')
      return
    }
    
    const profileData = {
      name,
      email,
      dob,
      gender,
      address,
      city,
      state,
      pincode
    }

    localStorage.setItem('user_profile', JSON.stringify(profileData))
    toast.success('Profile updated successfully ✓')
    setTimeout(() => navigate('/more'), 800)
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
          Edit Profile
        </h1>
      </div>

      {/* Avatar Changer */}
      <div className="flex flex-col items-center justify-center py-4">
        <div 
          onClick={handleAvatarClick}
          className="w-24 h-24 rounded-full bg-[#1A1A1A] border-2 border-[#FFB800]/30 overflow-hidden flex items-center justify-center cursor-pointer relative group shadow-lg shadow-[#FFB800]/5"
        >
          {avatar ? (
            <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-gray-500 font-black">{name.charAt(0).toUpperCase()}</span>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold text-[#FFB800] uppercase tracking-wider">
            Edit
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleAvatarChange} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={handleAvatarClick} 
          className="text-xs text-[#FFB800] mt-2 font-bold hover:underline"
        >
          Change Photo
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Rahul Sharma"
            className="w-full h-[48px] bg-[#111111] border border-[#FFB800]/15 rounded-xl px-4 text-xs text-white placeholder:text-gray-700 outline-none focus:border-[#FFB800] transition-colors"
          />
        </div>

        {/* Mobile Number - Masked & Read Only */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Mobile Number</label>
          <input 
            type="text" 
            value="+91 XXXXX X1234" 
            readOnly 
            className="w-full h-[48px] bg-[#141414] border border-[#FFB800]/5 rounded-xl px-4 text-xs text-gray-500 outline-none select-none cursor-not-allowed"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="rahul.sharma@example.com"
            className="w-full h-[48px] bg-[#111111] border border-[#FFB800]/15 rounded-xl px-4 text-xs text-white placeholder:text-gray-700 outline-none focus:border-[#FFB800] transition-colors"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Date of Birth</label>
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            className="w-full h-[48px] bg-[#111111] border border-[#FFB800]/15 rounded-xl px-4 text-xs text-white outline-none focus:border-[#FFB800] transition-colors"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Gender</label>
          <div className="flex gap-4 p-3 bg-[#111111] border border-[#FFB800]/15 rounded-xl">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g} className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-gray-300">
                <input 
                  type="radio" 
                  name="gender" 
                  value={g} 
                  checked={gender === g} 
                  onChange={() => setGender(g)} 
                  className="accent-[#FFB800] w-4 h-4"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Address</label>
          <textarea 
            rows="3" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Flat/House No., Building Name, Street"
            className="w-full bg-[#111111] border border-[#FFB800]/15 rounded-xl p-4 text-xs text-white placeholder:text-gray-700 outline-none focus:border-[#FFB800] transition-colors resize-none"
          />
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">City</label>
            <input 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              placeholder="Mumbai"
              className="w-full h-[48px] bg-[#111111] border border-[#FFB800]/15 rounded-xl px-4 text-xs text-white placeholder:text-gray-700 outline-none focus:border-[#FFB800] transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">Pincode</label>
            <input 
              type="text" 
              value={pincode} 
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
              placeholder="400001"
              className="w-full h-[48px] bg-[#111111] border border-[#FFB800]/15 rounded-xl px-4 text-xs text-white placeholder:text-gray-700 outline-none focus:border-[#FFB800] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">State</label>
          <input 
            type="text" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            placeholder="Maharashtra"
            className="w-full h-[48px] bg-[#111111] border border-[#FFB800]/15 rounded-xl px-4 text-xs text-white placeholder:text-gray-700 outline-none focus:border-[#FFB800] transition-colors"
          />
        </div>

        {/* Submit */}
        <button 
          type="submit" 
          className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-sm rounded-[12px] shadow-lg shadow-[#FFB800]/15 transition-transform active:scale-[0.98] mt-4 flex items-center justify-center"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  )
}
