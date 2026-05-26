import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from '../components/BottomNav'
import TopBar from '../components/TopBar'

const authRoutes = ['/', '/login', '/otp', '/sms', '/processing', '/success']

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export default function AppLayout() {
  const location = useLocation()
  const isAuthRoute = authRoutes.includes(location.pathname)

  if (isAuthRoute) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="min-h-dvh"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-dvh flex bg-bg-primary overflow-x-hidden selection:bg-primary/20">
      <div className="flex-1 flex flex-col min-h-dvh w-full max-w-md mx-auto relative shadow-2xl shadow-black/50">
        <TopBar />
        
        <main className="flex-1 w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full px-4 pt-4 pb-[100px]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        
        <BottomNav />
      </div>
    </div>
  )
}
