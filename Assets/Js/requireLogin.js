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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase auth
const auth = getAuth(app);

// Require login check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirect to login page if not logged in
    window.location.href = "index.html";
  } else {
    // Update footer with logged-in user's name or email
    const footerSpan = document.getElementById('loggedInAs');
    if (footerSpan) {
      footerSpan.textContent = user.displayName || user.email;
    }
  }
});

// Auto logout after inactivity
let inactivityTimer;

// Reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    // Sign out user after 15 minutes of inactivity
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  }, 15 * 60 * 1000); // 15 minutes
}

// Track user activity to reset timer
['click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
  window.addEventListener(evt, resetInactivityTimer);
});

// Sign out user on tab/window close
window.addEventListener('beforeunload', () => {
  signOut(auth);
});

// Start inactivity timer on page load
resetInactivityTimer();
