import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth'
import { getFirestore, onSnapshot, doc, setDoc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { getDatabase, ref, onValue, set } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
}

const hasFirebaseConfig = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY'

let app, auth, db, realtimeDb

if (hasFirebaseConfig) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  realtimeDb = getDatabase(app)
  console.log('🔥 Firebase Initialized')
} else {
  console.warn('⚠️ Firebase Config missing! Using local simulated WebSocket/Mock Database for production demonstration.')
  
  // Simulated Production-Grade Mock Backend (Acts like Firestore/WebSocket)
  const mockState = {
    users: {},
    holdings: {},
    transactions: {},
    sips: {},
    goals: {}
  }
  const listeners = {}

  const notifyListeners = (path, data) => {
    if (listeners[path]) listeners[path].forEach(cb => cb(data))
  }

  // Simulated Firestore/Auth API
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb) => {
      const u = localStorage.getItem('mock_user')
      if (u) { auth.currentUser = JSON.parse(u); cb(auth.currentUser) }
      else { cb(null) }
    },
    signOut: async () => { localStorage.removeItem('mock_user'); auth.currentUser = null; notifyListeners('auth', null) }
  }

  db = {
    _mockState: mockState,
    _notify: notifyListeners,
    _subscribe: (path, cb) => {
      if (!listeners[path]) listeners[path] = []
      listeners[path].push(cb)
      cb(mockState[path] || null)
      return () => { listeners[path] = listeners[path].filter(l => l !== cb) }
    }
  }
  
  realtimeDb = db
}

export { app, auth, db, realtimeDb, hasFirebaseConfig }
