// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTIK0ulR0uSHoiPBoK4Fymutw81sM7H_8",
  authDomain: "behindthebar.firebaseapp.com",
  projectId: "behindthebar",
  storageBucket: "behindthebar.firebasestorage.app",
  messagingSenderId: "134727677191",
  appId: "1:134727677191:web:6c15d2e83196abd36b81a2"
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Require login check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // redirect if not logged in
  }
});

// Auto logout after inactivity
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  }, 15 * 60 * 1000); // 15 minutes
}

// Track user activity
['click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
  window.addEventListener(evt, resetInactivityTimer);
});

// Logout on tab/window close
window.addEventListener('beforeunload', () => {
  signOut(auth);
});

// Start inactivity timer
resetInactivityTimer();
