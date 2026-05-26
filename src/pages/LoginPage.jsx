import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { sendOTP, setupRecaptcha } from '../services/authService'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [confirmationResult, setConfirmationResult] = useState(null)
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAppStore(s => s.login)
  const setStoreConfirmationResult = useAppStore(s => s.setConfirmationResult)

  const otpRefs = useRef([])

  useEffect(() => {
    setupRecaptcha('recaptcha-container')
  }, [])

  const handleGenerateOTP = async (e) => {
    e.preventDefault()
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit number')
      return
    }
    setError('')
    setLoading(true)
    
    try {
      const result = await sendOTP(phone)
      setConfirmationResult(result)
      setStoreConfirmationResult(result)
      setOtpSent(true)
      toast.success('OTP sent successfully! Enter 123456.')
      setTimeout(() => {
        otpRefs.current[0]?.focus()
      }, 100)
    } catch (err) {
      console.error(err)
      setError('Failed to send OTP. Please try again.')
      toast.error('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    setError('')
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus()
  }

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus()
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (!otpSent) {
      setError('Please generate OTP first')
      return
    }
    if (code.length < 6) {
      setError('Please enter all 6 digits of OTP')
      return
    }
    
    setLoading(true)
    try {
      const result = await confirmationResult.confirm(code)
      await login(result.user)
      toast.success('Welcome back to GOLDe5!')
      navigate('/sms')
    } catch (err) {
      console.error(err)
      setError('Invalid OTP code. Please try again.')
      toast.error('Invalid OTP code')
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (data) {
      const next = data.split('')
      while (next.length < 6) next.push('')
      setOtp(next)
      otpRefs.current[Math.min(data.length, 5)]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col font-sans max-w-[430px] mx-auto relative overflow-hidden px-5 py-6">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-[#FFB800]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[45%] rounded-full bg-[#FFB800]/3 blur-[100px] pointer-events-none" />

      {/* Logo & Branding */}
      <div className="flex flex-col items-center text-center mt-12 mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FFE082] to-[#FFB800] flex items-center justify-center shadow-lg shadow-[#FFB800]/25 mb-4 border border-[#FFB800]/30">
          <span className="text-black font-black text-3xl tracking-tighter">G5</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-[#FFB800] uppercase mb-1 drop-shadow-md">GOLDe5</h1>
        <p className="text-white text-[12px] font-bold tracking-wide uppercase drop-shadow">Your gold is FULLY PROTECTED!</p>
        <p className="text-[#FFB800] text-[9px] uppercase tracking-[0.2em] font-bold mt-1.5 opacity-80">From the house of SpixCapital</p>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        
        {/* Mobile Number Fields */}
        <form onSubmit={handleGenerateOTP} className="space-y-4">
          <div>
            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-[0.25em] mb-2 px-1">Secure Mobile Access</label>
            <div className={`flex items-center bg-[#111] border rounded-[12px] p-1.5 transition-all duration-300 ${error && !otpSent ? 'border-red-500' : 'border-[#FFB800]/20 focus-within:border-[#FFB800]'}`}>
              <div className="flex items-center px-4 border-r border-[#FFB800]/10 text-white font-semibold">
                <span className="mr-2 text-base">🇮🇳</span>
                <span className="text-sm">+91</span>
              </div>
              <input
                type="tel"
                value={phone}
                disabled={otpSent}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 10)
                  setPhone(v)
                  setError('')
                }}
                placeholder="00000 00000"
                className="w-full bg-transparent border-none outline-none py-3 px-3 text-white text-base placeholder:text-gray-600 tracking-[0.15em] font-medium"
              />
            </div>
            {error && !otpSent && <p className="text-red-500 text-xs mt-1.5 font-medium px-1">{error}</p>}
          </div>

          {!otpSent && (
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-sm rounded-[12px] shadow-lg shadow-[#FFB800]/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {loading ? 'Sending OTP...' : 'Generate OTP'}
              {!loading && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          )}
        </form>

        {/* ReCAPTCHA Hidden anchor */}
        <div id="recaptcha-container" className="my-2"></div>

        {/* Conditional OTP Input Box */}
        <AnimatePresence>
          {otpSent && (
            <motion.form 
              onSubmit={handleLoginSubmit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-5 overflow-hidden"
            >
              <div>
                <label className="block text-[9px] font-bold text-[#FFB800] uppercase tracking-[0.25em] mb-3 px-1 text-center">
                  Enter 6-Digit OTP
                </label>
                <div className="flex justify-center gap-2" onPaste={handlePaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => otpRefs.current[i] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-10 h-12 text-center text-lg font-bold bg-[#111] border rounded-[10px] outline-none transition-all duration-200 text-white ${
                        error ? 'border-red-500' : digit ? 'border-[#FFB800] ring-1 ring-[#FFB800]/30' : 'border-[#FFB800]/20 focus:border-[#FFB800]'
                      }`}
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-xs mt-2 font-medium text-center">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-bold text-sm rounded-[12px] shadow-lg shadow-[#FFB800]/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Login'}
              </button>

              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => { setOtpSent(false); setOtp(['','','','','','']) }} 
                  className="text-xs text-gray-500 hover:text-white underline underline-offset-4"
                >
                  Change Mobile Number
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>

      {/* Safety Footer info */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#FFB800]/10 px-5 py-2 rounded-full">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">🛡️ SECURE TRANSITIONS</span>
        </div>
        <p className="text-[10px] text-gray-500 text-center leading-relaxed max-w-[280px]">
          Your information is fully encrypted and secured by SpixCapital.
        </p>
      </div>

    </div>
  )
}
