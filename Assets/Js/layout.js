// Import Firebase app initializer
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Import Firebase auth and functions
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase configuration object
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

// Require login check on page load
onAuthStateChanged(auth, (user) => {
  // Redirect to login if no user is logged in
  if (!user) {
    window.location.href = "/";
  } else {
    // Save road name in sessionStorage if not already stored
    if (!sessionStorage.getItem('roadName')) {
      // Get email of logged-in user
      const email = user.email;
      // Extract part before "@" as road name
      const roadName = email.split('@')[0];
      // Capitalize first letter and store in sessionStorage
      sessionStorage.setItem('roadName', roadName.charAt(0).toUpperCase() + roadName.slice(1));
    }

    // Update footer element with road name
    const footerNameElem = document.getElementById('footerRoadName');
    if (footerNameElem) footerNameElem.textContent = sessionStorage.getItem('roadName');
  }
});

// Declare inactivity timer variable
let inactivityTimer;

// Function to reset inactivity timer
function resetInactivityTimer() {
  // Clear existing timer
  clearTimeout(inactivityTimer);
  // Set new timer to auto logout after 15 minutes
  inactivityTimer = setTimeout(() => {
    signOut(auth).then(() => {
      // Redirect to login page after logout
      window.location.href = "/";
    });
  }, 15 * 60 * 1000);
}

// Track user activity to reset timer
['click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
  window.addEventListener(evt, resetInactivityTimer);
});

// Logout user when tab or window is closed
window.addEventListener('beforeunload', () => {
  signOut(auth);
});

// Initialize inactivity timer on page load
resetInactivityTimer();

// Function to make favicon circular
function makeFaviconCircular(src) {
  // Create image object
  const img = new Image();
  // Set image source
  img.src = src;
  // Execute after image loads
  img.onload = () => {
    // Define canvas size
    const size = 64;
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    // Get 2D drawing context
    const ctx = canvas.getContext('2d');

    // Create circular clipping mask
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw image inside circular mask
    ctx.drawImage(img, 0, 0, size, size);

    // Replace existing favicon with circular image
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = canvas.toDataURL('image/png');
  };
}

// Call function to make favicon circular with logo path
makeFaviconCircular('Assets/Images/logo.png');
