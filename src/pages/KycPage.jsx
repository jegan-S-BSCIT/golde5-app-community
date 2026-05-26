import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function KycPage() {
  const navigate = useNavigate()

  // KYC Overall Status
  const [currentStep, setCurrentStep] = useState(1) // 1, 2, 3, or 4 (Success)
  
  // Step 1: PAN State
  const [pan, setPan] = useState('')
  const [panVerifying, setPanVerifying] = useState(false)
  const [panVerified, setPanVerified] = useState(false)

  // Step 2: Aadhaar State
  const [aadhaar, setAadhaar] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpVerifying, setOtpVerifying] = useState(false)
  const [aadhaarVerified, setAadhaarVerified] = useState(false)

  // Step 3: Document Upload State
  const [panDoc, setPanDoc] = useState(null)
  const [aadhaarDoc, setAadhaarDoc] = useState(null)
  const [submittingKyc, setSubmittingKyc] = useState(false)

  // Load status from localStorage
  useEffect(() => {
    const savedKyc = localStorage.getItem('kyc_status')
    if (savedKyc === 'Verified') {
      setCurrentStep(4) // Already verified state
    }
  }, [])

  // Step 1: PAN Verification Handler
  const handleVerifyPan = (e) => {
    e.preventDefault()
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    const upperPan = pan.toUpperCase()
    
    if (!panRegex.test(upperPan)) {
      toast.error('Invalid PAN Format. Must be 5 letters, 4 digits, 1 letter.')
      return
    }

    setPanVerifying(true)
    setTimeout(() => {
      setPanVerifying(false)
      setPanVerified(true)
      setPan(upperPan)
      toast.success('PAN Details Verified ✓')
    }, 1500)
  }

  // Step 2: Aadhaar OTP Send Handler
  const handleSendOtp = (e) => {
    e.preventDefault()
    if (!aadhaar.match(/^[0-9]{12}$/)) {
      toast.error('Enter a valid 12-digit Aadhaar number')
      return
    }
    toast.success('OTP sent to registered mobile number')
    setOtpSent(true)
  }

  // Step 2: Aadhaar OTP Verify Handler
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error('Enter 6-digit OTP')
      return
    }
    setOtpVerifying(true)
    setTimeout(() => {
      setOtpVerifying(false)
      setAadhaarVerified(true)
      toast.success('Aadhaar Verified via OTP ✓')
    }, 1200)
  }

  // File Upload Handlers (Read as Data URLs for previews)
  const handleFileChange = (e, setDoc) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be under 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setDoc({
          name: file.name,
          preview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Step 3: Complete KYC Submission
  const handleSubmitKyc = () => {
    if (!panDoc || !aadhaarDoc) {
      toast.error('Please upload both PAN and Aadhaar files')
      return
    }
    setSubmittingKyc(true)
    setTimeout(() => {
      setSubmittingKyc(false)
      localStorage.setItem('kyc_status', 'Verified')
      setCurrentStep(4)
      toast.success('KYC Verification Completed Successfully! ✓')
    }, 2000)
  }

  const handleResetKyc = () => {
    localStorage.removeItem('kyc_status')
    setPan('')
    setPanVerified(false)
    setAadhaar('')
    setOtpSent(false)
    setOtp('')
    setAadhaarVerified(false)
    setPanDoc(null)
    setAadhaarDoc(null)
    setCurrentStep(1)
    toast.success('KYC reset for testing')
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
          KYC Verification
        </h1>
      </div>

      {/* Progress Bar Header */}
      {currentStep < 4 && (
        <div className="bg-[#1A1A1A] border border-[#FFB800]/10 p-4 rounded-2xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verification Steps</span>
            <span className="text-[10px] text-[#FFB800] font-black uppercase tracking-wider">Step {currentStep} of 3</span>
          </div>
          {/* Progress bar line */}
          <div className="w-full h-1.5 bg-[#0B0B0B] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FFB800] to-[#FFC72C] transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep - 1) * 50 + 8}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase mt-2">
            <span className={currentStep >= 1 ? 'text-[#FFB800]' : ''}>1. PAN Info</span>
            <span className={currentStep >= 2 ? 'text-[#FFB800]' : ''}>2. Aadhaar OTP</span>
            <span className={currentStep >= 3 ? 'text-[#FFB800]' : ''}>3. Documents</span>
          </div>
        </div>
      )}

      {/* Form Wizard Pages */}
      <AnimatePresence mode="wait">
        
        {/* STEP 1: PAN CARD */}
        {currentStep === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <h2 className="text-xs font-black text-white uppercase tracking-wider">Step 1: PAN Card Verification</h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                Enter your Permanent Account Number (PAN) to verify your Identity with the Income Tax Department database.
              </p>
            </div>

            <form onSubmit={handleVerifyPan} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">PAN Card Number</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
                    disabled={panVerified}
                    placeholder="ABCDE1234F"
                    className="w-full h-[50px] px-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors uppercase tracking-widest"
                  />
                  {panVerified && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 font-bold text-xs">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {!panVerified ? (
                <button
                  type="submit"
                  disabled={panVerifying}
                  className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] disabled:bg-gray-700 disabled:text-gray-400 active:scale-[0.98] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {panVerifying ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Verify PAN Card'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full h-[48px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 active:scale-[0.98] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Aadhaar →
                </button>
              )}
            </form>
          </motion.div>
        )}

        {/* STEP 2: AADHAAR CARD */}
        {currentStep === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <h2 className="text-xs font-black text-white uppercase tracking-wider">Step 2: Aadhaar verification (OTP)</h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                Verify your address details instantly. We will send a secure 6-digit OTP to the mobile number registered with your Aadhaar.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Aadhaar Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Aadhaar Card Number</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    disabled={otpSent || aadhaarVerified}
                    placeholder="12-digit Aadhaar number"
                    className="w-full h-[50px] px-4 rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-xs font-semibold placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors tracking-widest"
                  />
                  {aadhaarVerified && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 font-bold text-xs">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Send OTP Button */}
              {!otpSent && !aadhaarVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] active:scale-[0.98] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center"
                >
                  Send Verification OTP
                </button>
              )}

              {/* OTP Code Form */}
              {otpSent && !aadhaarVerified && (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleVerifyOtp} 
                  className="space-y-4 pt-2 border-t border-[#FFB800]/10"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Enter 6-Digit OTP</label>
                    <input 
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="123456"
                      className="w-full h-[50px] px-4 text-center rounded-xl bg-[#1A1A1A] border border-[#FFB800]/15 text-white text-sm font-bold tracking-[1em] placeholder:tracking-normal placeholder:text-gray-600 focus:outline-none focus:border-[#FFB800]/40 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={otpVerifying}
                    className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] disabled:bg-gray-700 disabled:text-gray-400 active:scale-[0.98] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {otpVerifying ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Verify Aadhaar OTP'
                    )}
                  </button>

                  <div className="text-center">
                    <button 
                      type="button" 
                      onClick={() => { toast.success('New OTP sent'); setOtp('') }}
                      className="text-[10px] text-gray-400 font-bold hover:underline"
                    >
                      Resend OTP Code
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Next Step */}
              {aadhaarVerified && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full h-[48px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 active:scale-[0.98] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Uploads →
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 3: DOCUMENT UPLOAD */}
        {currentStep === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <h2 className="text-xs font-black text-white uppercase tracking-wider">Step 3: Document Upload</h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                Upload clear images of your physical documents to complete compliance checks. Max size 5MB.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              {/* PAN Document */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">PAN Card Photo</label>
                <div className="flex gap-3 items-center">
                  <label className="flex-1 h-[48px] rounded-xl border border-dashed border-[#FFB800]/30 hover:border-[#FFB800]/60 bg-[#1A1A1A] cursor-pointer flex items-center justify-center text-xs font-bold text-[#FFB800] transition-colors">
                    <span>Choose File</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setPanDoc)}
                      className="hidden" 
                    />
                  </label>
                  {panDoc && (
                    <img 
                      src={panDoc.preview} 
                      alt="PAN preview" 
                      className="w-[48px] h-[48px] rounded-xl object-cover border border-[#FFB800]/25 shadow-sm shadow-[#FFB800]/5"
                    />
                  )}
                </div>
                {panDoc && <p className="text-[9px] text-gray-500 font-mono truncate max-w-[200px]">{panDoc.name}</p>}
              </div>

              {/* Aadhaar Document */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#FFB800] uppercase tracking-wider block">Aadhaar Card Front / Address Proof</label>
                <div className="flex gap-3 items-center">
                  <label className="flex-1 h-[48px] rounded-xl border border-dashed border-[#FFB800]/30 hover:border-[#FFB800]/60 bg-[#1A1A1A] cursor-pointer flex items-center justify-center text-xs font-bold text-[#FFB800] transition-colors">
                    <span>Choose File</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setAadhaarDoc)}
                      className="hidden" 
                    />
                  </label>
                  {aadhaarDoc && (
                    <img 
                      src={aadhaarDoc.preview} 
                      alt="Aadhaar preview" 
                      className="w-[48px] h-[48px] rounded-xl object-cover border border-[#FFB800]/25 shadow-sm shadow-[#FFB800]/5"
                    />
                  )}
                </div>
                {aadhaarDoc && <p className="text-[9px] text-gray-500 font-mono truncate max-w-[200px]">{aadhaarDoc.name}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitKyc}
                disabled={submittingKyc || !panDoc || !aadhaarDoc}
                className="w-full h-[48px] mt-4 bg-gradient-to-r from-[#FFB800] to-[#FFC72C] disabled:bg-gray-700 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 active:scale-[0.98] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {submittingKyc ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Submit KYC Verification'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: SUCCESS / VERIFIED STATE */}
        {currentStep === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-6"
          >
            {/* Shield Check Badge */}
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.15)] animate-pulse">
              <span className="text-4xl text-green-400">✓</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-black text-white uppercase tracking-wider">KYC Verification Verified</h2>
              <p className="text-[11px] text-gray-400 leading-relaxed px-4 font-medium">
                Congratulations! Your identity has been successfully validated. Your account is fully active and compliant with regulatory guidelines.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#FFB800]/10 rounded-2xl p-4.5 text-left divide-y divide-[#FFB800]/10 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400">Verification Status:</span>
                <span className="font-bold text-green-400">VERIFIED ✓</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400">Compliance Code:</span>
                <span className="font-mono text-white">G5-IN-9812-OK</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-gray-400">Approval Date:</span>
                <span className="font-semibold text-white">Today</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => navigate('/more')}
                className="w-full h-[48px] bg-[#FFB800] hover:bg-[#D4A017] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Back to Settings
              </button>

              <button
                onClick={handleResetKyc}
                className="text-[10px] text-red-400 font-bold hover:underline"
              >
                Reset KYC (Developer Mode)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
