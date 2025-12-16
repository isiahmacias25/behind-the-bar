// Import Firebase app initializer
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Import Firebase auth utilities
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase configuration
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

// Define max inactivity time (6 hours)
const INACTIVITY_LIMIT = 6 * 60 * 60 * 1000;

// Declare inactivity timer
let inactivityTimer;

// Function to reset inactivity timer
function resetInactivityTimer() {
  // Clear existing timer
  clearTimeout(inactivityTimer);

  // Start new inactivity timer
  inactivityTimer = setTimeout(() => {
    // Sign out user after inactivity limit
    signOut(auth).then(() => {
      // Redirect to login page after logout
      window.location.href = "/";
    });
  }, INACTIVITY_LIMIT);
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  // If no user is logged in
  if (!user) {
    // Redirect to login page
    window.location.href = "/";
    return;
  }

  // Reset inactivity timer on successful auth
  resetInactivityTimer();

  // Track user activity to keep session alive
  ['click', 'mousemove', 'keydown', 'scroll'].forEach(event => {
    window.addEventListener(event, resetInactivityTimer);
  });
});
