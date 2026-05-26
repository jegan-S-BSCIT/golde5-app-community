import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show prompt after 5 seconds delay
      setTimeout(() => setShow(true), 5000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShow(false)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
    setShow(false)
  }

  if (isInstalled || !show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-20 lg:bottom-4 left-4 right-4 z-[100] max-w-md mx-auto"
      >
        <div className="bg-bg-card border border-border-default rounded-2xl p-4 shadow-2xl shadow-black/50">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-white font-extrabold text-xs">G5</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-primary mb-0.5">Install GOLDe5</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Add to your home screen for a faster, app-like experience with offline access.
              </p>
            </div>
            <button onClick={() => setShow(false)} className="text-text-muted hover:text-text-secondary transition-colors p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setShow(false)}
              className="flex-1 py-2.5 rounded-xl border border-border-default text-text-secondary text-xs font-semibold hover:bg-white/[0.03] transition-colors"
            >
              Not now
            </button>
            <button onClick={handleInstall}
              className="flex-1 py-2.5 rounded-xl bg-primary text-bg-primary text-xs font-bold hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
            >
              Install App
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
