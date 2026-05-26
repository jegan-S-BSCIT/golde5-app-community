import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import AppLayout from './layouts/AppLayout'
import { PageLoader } from './components/SkeletonLoader'

import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import OtpPage from './pages/OtpPage'
import PortfolioPage from './pages/PortfolioPage'
import SipPage from './pages/SipPage'
import ShopPage from './pages/ShopPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentPage from './pages/PaymentPage'
import ProcessingPage from './pages/ProcessingPage'
import SuccessPage from './pages/SuccessPage'
import ProfilePage from './pages/ProfilePage'
import MorePage from './pages/MorePage'
import NomineePage from './pages/NomineePage'
import KycPage from './pages/KycPage'
import OrdersPage from './pages/OrdersPage'
import NotificationsPage from './pages/NotificationsPage'
import FaqsPage from './pages/FaqsPage'
import PoliciesPage from './pages/PoliciesPage'
import ContactPage from './pages/ContactPage'

import SmsPermissionPage from './pages/SmsPermissionPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProofOfSafetyPage from './pages/ProofOfSafetyPage'

import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const initPriceEngine = useAppStore(s => s.initPriceEngine)
  const initAuthListener = useAppStore(s => s.initAuthListener)

  // Start real-time price engine on mount
  useEffect(() => {
    initAuthListener()
    const stop = initPriceEngine()
    return () => stop()
  }, [initPriceEngine, initAuthListener])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />
          
          {/* Protected Routes */}
          <Route path="/sms" element={<ProtectedRoute><SmsPermissionPage /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
          <Route path="/sip" element={<ProtectedRoute><SipPage /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/processing" element={<ProtectedRoute><ProcessingPage /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/proof" element={<ProtectedRoute><ProofOfSafetyPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/more" element={<ProtectedRoute><MorePage /></ProtectedRoute>} />
          <Route path="/nominee" element={<ProtectedRoute><NomineePage /></ProtectedRoute>} />
          <Route path="/kyc" element={<ProtectedRoute><KycPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/faqs" element={<ProtectedRoute><FaqsPage /></ProtectedRoute>} />
          <Route path="/policies" element={<ProtectedRoute><PoliciesPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          
          {/* Admin Route */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
