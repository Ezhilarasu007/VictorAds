// Firebase Web SDK Setup for VictorADS
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDPeCIMJKn9j4yE31RyqvfNlbHydsvCAZc",
  authDomain: "victorads-45cdf.firebaseapp.com",
  projectId: "victorads-45cdf",
  storageBucket: "victorads-45cdf.firebasestorage.app",
  messagingSenderId: "257348761396",
  appId: "1:257348761396:web:d7ee65f373eaaa38fcd761",
  measurementId: "G-VHE5V0VJRB"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, analytics };
