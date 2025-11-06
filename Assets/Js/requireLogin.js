// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTIK0ulR0uSHoiPBoK4Fymutw81sM7H_8",
  authDomain: "behindthebar.firebaseapp.com",
  projectId: "behindthebar",
  storageBucket: "behindthebar.firebasestorage.app",
  messagingSenderId: "134727677191",
  appId: "1:134727677191:web:6c15d2e83196abd36b81a2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Require Login Check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html"; // redirect if not logged in
  }
});

// Auto logout after inactivity
let inactivityTimer;

// reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  }, 15 * 60 * 1000); // 15 minutes
}

// track activity
['click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
  window.addEventListener(evt, resetInactivityTimer);
});

// sign out on tab/window close
window.addEventListener('beforeunload', () => {
  signOut(auth);
});

// initialize inactivity timer on page load
resetInactivityTimer();
