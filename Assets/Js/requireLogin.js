// Import Firebase app initializer
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Import Firebase auth functions
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Require user to be logged in
onAuthStateChanged(auth, (user) => {
  // If no user, force back to login
  if (!user) {
    window.location.replace("/");
    return;
  }

  // Get footer username element
  const footerNameElem = document.getElementById("currentUser");

  // Only run if footer exists on page
  if (footerNameElem) {

    // Use cached name if available
    let roadName = sessionStorage.getItem("roadName");

    // If not cached, derive from user
    if (!roadName) {
      // Prefer display name
      roadName = user.displayName;

      // Fallback to email prefix
      if (!roadName && user.email) {
        roadName = user.email.split("@")[0];
      }

      // Capitalize name
      roadName = roadName.charAt(0).toUpperCase() + roadName.slice(1);

      // Cache for session
      sessionStorage.setItem("roadName", roadName);
    }

    // Update footer
    footerNameElem.textContent = roadName;
  }
});

// -------------------------
// Inactivity auto-logout
// -------------------------

let inactivityTimer;

// Reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  // 6 hours (bar-safe)
  inactivityTimer = setTimeout(() => {
    signOut(auth).then(() => {
      window.location.replace("/");
    });
  }, 6 * 60 * 60 * 1000);
}

// Track user activity
["click", "mousemove", "keydown", "scroll"].forEach(event => {
  window.addEventListener(event, resetInactivityTimer);
});

// Start timer when page loads
resetInactivityTimer();
