import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'

export default function OtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const phone = location.state?.phone || 'your number'
  const confirmationResult = useAppStore(s => s.confirmationResult)
  const login = useAppStore(s => s.login)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(59)
  const refs = useRef([])

  useEffect(() => {
    if (!confirmationResult) {
      toast.error('Session expired, please login again')
      navigate('/login')
      return
    }
    refs.current[0]?.focus()
    const timer = setInterval(() => {
      setSeconds(s => { if (s <= 1) { clearInterval(timer); return 0 } return s - 1 })
    }, 1000)
    return () => clearInterval(timer)
  }, [confirmationResult, navigate])

  const handleChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    setError('')
    if (val && idx < 5) refs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) refs.current[idx - 1]?.focus()
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 6) {
      setError('Please enter all 6 digits')
      return
    }
    
    setLoading(true)
    try {
      const result = await confirmationResult.confirm(code)
      // Login via Zustand to start realtime sync
      await login(result.user)
      toast.success('Successfully logged in!')
      navigate('/sms')
    } catch (err) {
      console.error(err)
      setError('Invalid verification code.')
      toast.error('Invalid OTP')
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
      refs.current[Math.min(data.length, 5)]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-5 sm:px-8 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-primary/3 blur-[80px]" />

      <div className="w-full max-w-md z-10">
        {/* Back */}
        <button onClick={() => navigate('/login')} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/[0.05] transition-colors text-text-secondary mb-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Icon */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Enter OTP</h1>
          <p className="text-sm text-text-muted">
            Code sent to <span className="text-text-primary font-semibold">+91 {phone}</span>
          </p>
        </motion.div>

        {/* OTP Inputs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
          <div className="flex justify-center gap-2.5 sm:gap-3 mb-4" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => refs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-bg-input border rounded-xl outline-none transition-all duration-200 text-text-primary ${
                  error ? 'border-error' : digit ? 'border-primary ring-1 ring-primary/30' : 'border-border-default focus:border-primary focus:ring-1 focus:ring-primary/30'
                }`}
              />
            ))}
          </div>
          {error && <p className="text-error text-xs text-center font-medium">{error}</p>}
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <span>Didn't receive code?</span>
            {seconds > 0 ? (
              <span className="text-text-muted">Resend in 0:{seconds.toString().padStart(2, '0')}</span>
            ) : (
              <button className="text-primary font-bold hover:underline">Resend OTP</button>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          disabled={loading}
          onClick={handleVerify}
          className="w-full bg-[#F5C842] hover:bg-[#D4A017] text-[#0A0A0A] font-bold text-base py-3.5 rounded-xl shadow-lg shadow-[#F5C842]/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? 'Verifying...' : 'Login'}
        </motion.button>
      </div>
    </div>
  )
}
