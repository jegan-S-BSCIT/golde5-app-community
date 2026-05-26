import { auth, hasFirebaseConfig } from './firebase'
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth'

// Singleton for recaptcha
let appVerifier = null

export const setupRecaptcha = (elementId) => {
  if (!hasFirebaseConfig) return // Mock doesn't need recaptcha
  if (!appVerifier) {
    appVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => { console.log('Recaptcha solved') }
    })
  }
}

export const sendOTP = async (phoneNumber) => {
  if (!hasFirebaseConfig) {
    // Mock OTP sending
    console.log(`Mock: Sent OTP 123456 to ${phoneNumber}`)
    return {
      confirm: async (code) => {
        if (code === '123456') {
          const user = { uid: 'user_' + Date.now(), phoneNumber, role: 'user' }
          localStorage.setItem('mock_user', JSON.stringify(user))
          return { user }
        } else {
          throw new Error('Invalid OTP')
        }
      }
    }
  }

  // Real Firebase OTP
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
    return confirmationResult
  } catch (error) {
    console.error('Error sending OTP', error)
    throw error
  }
}

export const logoutUser = async () => {
  if (!hasFirebaseConfig) {
    await auth.signOut()
    return
  }
  return signOut(auth)
}
