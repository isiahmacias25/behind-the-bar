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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Require login check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirect to login page if not logged in
    window.location.href = "/";
    return;
  }

  // Store the roadName (capitalized) in sessionStorage if not already
  if (!sessionStorage.getItem("roadName")) {
    const email = user.email;                   // get user email
    const roadName = email.split("@")[0];       // take the part before @
    sessionStorage.setItem(
      "roadName",
      roadName.charAt(0).toUpperCase() + roadName.slice(1)
    );
  }

  // Update footer element with road name
  const footerNameElem = document.getElementById("currentUser");
  if (footerNameElem) {
    footerNameElem.textContent = sessionStorage.getItem("roadName");
  }
});

// Auto logout after inactivity
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    signOut(auth).then(() => {
      window.location.href = "/";
    });
  }, 15 * 60 * 1000); // 15 minutes
}

// Track activity
["click", "mousemove", "keydown", "scroll"].forEach((evt) => {
  window.addEventListener(evt, resetInactivityTimer);
});

// Logout on tab/window close
window.addEventListener("beforeunload", () => {
  signOut(auth);
});

// Start inactivity timer
resetInactivityTimer();
